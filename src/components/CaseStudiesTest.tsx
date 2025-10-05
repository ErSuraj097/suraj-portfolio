'use client';

import { useState, useEffect } from 'react';

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  category: string;
  overview: string;
}

const CaseStudiesTest = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      console.log('TEST: Fetching case studies...');
      const response = await fetch('/api/case-studies');
      console.log('TEST: Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('TEST: Case studies data:', data);
      console.log('TEST: Number of case studies:', data.length);
      
      setCaseStudies(data);
      setLoading(false);
    } catch (error) {
      console.error('TEST: Error fetching case studies:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-white">
        <h2 className="text-2xl mb-4">Case Studies Test - Loading...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-white">
        <h2 className="text-2xl mb-4">Case Studies Test - Error</h2>
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl mb-4">Case Studies Test</h2>
      <p className="mb-4">Found {caseStudies.length} case studies</p>
      
      {caseStudies.length === 0 ? (
        <p className="text-yellow-400">No case studies found</p>
      ) : (
        <div className="space-y-4">
          {caseStudies.map((study) => (
            <div key={study._id} className="border border-white/20 p-4 rounded">
              <h3 className="text-lg font-bold">{study.title}</h3>
              <p className="text-sm text-white/70">ID: {study._id}</p>
              <p className="text-sm text-white/70">Slug: {study.slug}</p>
              <p className="text-sm text-white/70">Category: {study.category}</p>
              <p className="text-white/80">{study.overview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseStudiesTest;