# AI/ML & Backend Engineer Portfolio

A comprehensive full-stack portfolio website built with Next.js, TypeScript, MongoDB, and Tailwind CSS. Features a complete admin panel for content management including projects, blog posts, case studies, and success stories.

## Features

### Frontend
- **Modern Design**: Clean, responsive design with smooth animations using Framer Motion
- **Dynamic Sections**: Hero, About, Projects, Case Studies, Blog, Success Stories
- **Interactive Navigation**: Smooth scrolling navigation with mobile-friendly menu
- **SEO Optimized**: Proper meta tags, structured data, and performance optimization

### Admin Panel
- **Secure Authentication**: NextAuth.js with credential-based login
- **Content Management**: Full CRUD operations for all content types
- **Dashboard**: Overview statistics and quick actions
- **Responsive Design**: Works seamlessly on desktop and mobile

### Content Types
- **Projects**: Showcase your development work with categories, technologies, and links
- **Blog Posts**: Write and publish technical articles with tags and categories
- **Case Studies**: Detailed project breakdowns with challenges, solutions, and results
- **Success Stories**: Highlight measurable achievements and impact
- **Technologies**: Manage your tech stack with proficiency levels

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

4. **Initialize the database**
   ```bash
   npm run init-admin
   ```
   This will create the admin user and sample data.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/login
   - Login with: admin@example.com / admin123

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── admin/             # Admin panel pages
│   │   ├── api/               # API routes
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── admin/             # Admin-specific components
│   │   └── ...                # Public components
│   ├── lib/                   # Utility libraries
│   ├── models/                # MongoDB models
│   └── types/                 # TypeScript type definitions
├── scripts/                   # Utility scripts
└── public/                    # Static assets
```

## Admin Panel Features

### Dashboard
- Overview statistics for all content types
- Quick action buttons for creating new content
- Recent activity feed

### Content Management
- **Projects**: Add/edit projects with images, technologies, and links
- **Blog Posts**: Rich text editor for creating technical articles
- **Case Studies**: Structured format for project case studies
- **Success Stories**: Highlight achievements with metrics

### User Management
- Secure authentication system
- Role-based access control
- Session management

## Customization

### Styling
- Modify `tailwind.config.js` for custom colors and themes
- Update component styles in individual component files
- Global styles in `src/app/globals.css`

### Content
- Update personal information in components
- Modify social media links in `Footer.tsx` and `Hero.tsx`
- Customize navigation items in `Navbar.tsx`

### Database Schema
- Extend models in `src/models/` for additional fields
- Update API routes accordingly
- Modify admin forms to handle new fields

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- Ensure Node.js 18+ support
- Set up MongoDB connection
- Configure environment variables
- Build with `npm run build`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `ADMIN_EMAIL` | Admin user email | Yes |
| `ADMIN_PASSWORD` | Admin user password | Yes |

## API Endpoints

### Public Endpoints
- `GET /api/projects` - Fetch projects
- `GET /api/blogs` - Fetch blog posts
- `GET /api/case-studies` - Fetch case studies
- `GET /api/success-stories` - Fetch success stories

### Admin Endpoints (Authentication Required)
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- Similar CRUD operations for other content types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your.email@example.com or create an issue in the repository.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- MongoDB for the flexible database solution