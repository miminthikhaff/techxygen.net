# TechXygen - Premium Portfolio Website

A premium, minimal portfolio website for TechXygen built with Next.js, Tailwind CSS, Shadcn UI, and Supabase.

## 🚀 Features

- **Modern Design**: Clean, minimal, and premium aesthetic inspired by top-tier agencies
- **Responsive**: Fully responsive across desktop, tablet, and mobile devices
- **Performance**: Optimized for speed and SEO with Next.js App Router
- **Dynamic Content**: Supabase integration for managing projects, services, team, and blog content
- **Accessibility**: Built with accessibility best practices
- **TypeScript**: Full TypeScript support with strict mode

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Database**: Supabase
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── about.tsx         # About section
│   ├── footer.tsx        # Footer component
│   ├── hero.tsx          # Hero section
│   ├── navigation.tsx    # Navigation component
│   ├── portfolio.tsx     # Portfolio section
│   └── services.tsx      # Services section
└── lib/                  # Utilities and configurations
    ├── supabase.ts       # Supabase client and types
    └── utils.ts          # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - Copy your Supabase URL and anon key

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses the following Supabase tables:

- **projects**: Portfolio projects and case studies
- **services**: Company services and offerings
- **team_members**: Team member information
- **blog_posts**: Blog content management
- **contact_submissions**: Contact form submissions

## 🎨 Customization

### Content Management

All dynamic content is managed through Supabase:

1. **Projects**: Add/edit portfolio projects in the `projects` table
2. **Services**: Manage services in the `services` table
3. **Team**: Update team members in the `team_members` table
4. **Blog**: Create blog posts in the `blog_posts` table

### Styling

The design uses Tailwind CSS with Shadcn UI components. Key customization points:

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Typography**: Update font settings in `src/app/layout.tsx`
- **Components**: Customize Shadcn UI components in `src/components/ui/`

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

Built with accessibility in mind:

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions:

- Email: hello@techxygen.com
- Website: [techxygen.com](https://techxygen.com)

---

Built with ❤️ by TechXygen