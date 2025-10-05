'use client';

import { useState, useEffect } from 'react';
import { Mail, Trash2, Search, Filter, Eye, Reply } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRead = !filterRead || 
                       (filterRead === 'read' && contact.read) ||
                       (filterRead === 'unread' && !contact.read);
    return matchesSearch && matchesRead;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {contacts.filter(c => !c.read).length} unread messages
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>

          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            {filteredContacts.length} of {contacts.length} messages
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr 
                  key={contact._id} 
                  className={`hover:bg-gray-50 ${!contact.read ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{contact.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      contact.read 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {contact.read ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, '_blank')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Reply className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(contact._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Contact Message</h2>
              <button
                onClick={() => {
                  setSelectedContact(null);
                  if (!selectedContact.read) {
                    markAsRead(selectedContact._id);
                  }
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <Eye className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.email}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <p className="mt-1 text-sm text-gray-900">{selectedContact.subject}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Received</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`, '_blank')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Contact"
          message="Are you sure you want to delete this contact message? This action cannot be undone."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}