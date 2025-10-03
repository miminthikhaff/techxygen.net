-- TechXygen Portfolio Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT NOT NULL,
  linkedin_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- Full-time, Part-time, Contract, Remote
  experience VARCHAR(100) NOT NULL, -- 2+ years, 5+ years, etc.
  salary VARCHAR(100) NOT NULL, -- Competitive, $50K-$80K, etc.
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  experience VARCHAR(100) NOT NULL,
  cover_letter TEXT NOT NULL,
  resume_url TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewed, interviewed, rejected, hired
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_job_postings_active ON job_postings(is_active, posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_posting_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO services (title, description, icon, features) VALUES
('Web Development', 'Custom web applications built with modern technologies', 'Globe', ARRAY['React/Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimization']),
('Mobile Development', 'Native and cross-platform mobile applications', 'Smartphone', ARRAY['React Native', 'iOS/Android', 'App Store Deployment', 'Push Notifications']),
('UI/UX Design', 'User-centered design solutions that drive engagement', 'Palette', ARRAY['User Research', 'Wireframing', 'Prototyping', 'Design Systems']),
('Cloud Solutions', 'Scalable cloud infrastructure and deployment', 'Cloud', ARRAY['AWS/Azure', 'Docker', 'CI/CD', 'Monitoring']);

INSERT INTO team_members (name, role, bio, image_url, linkedin_url, github_url) VALUES
('Alex Johnson', 'CEO & Founder', 'Visionary leader with 10+ years in tech innovation', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces', 'https://linkedin.com/in/alexjohnson', 'https://github.com/alexjohnson'),
('Sarah Chen', 'CTO', 'Full-stack engineer passionate about scalable solutions', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces', 'https://linkedin.com/in/sarahchen', 'https://github.com/sarahchen'),
('Mike Rodriguez', 'Lead Designer', 'Creative director focused on user experience excellence', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces', 'https://linkedin.com/in/mikerodriguez', null);

INSERT INTO projects (title, description, image_url, technologies, live_url, github_url) VALUES
('E-Commerce Platform', 'Modern e-commerce solution with advanced analytics and inventory management', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'], 'https://example-ecommerce.com', 'https://github.com/techxygen/ecommerce'),
('SaaS Dashboard', 'Comprehensive analytics dashboard for business intelligence', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', ARRAY['React', 'D3.js', 'Node.js', 'MongoDB'], 'https://example-saas.com', 'https://github.com/techxygen/saas-dashboard'),
('Mobile Banking App', 'Secure mobile banking application with biometric authentication', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop', ARRAY['React Native', 'Firebase', 'Biometric Auth', 'Redux'], 'https://apps.apple.com/example', 'https://github.com/techxygen/banking-app');

-- Insert sample job postings
INSERT INTO job_postings (title, location, type, experience, salary, description, requirements, benefits, is_active) VALUES
('Senior Full-Stack Developer', 'Colombo, Sri Lanka / Remote', 'Full-time', '5+ years', 'Competitive', 'Lead development of enterprise-grade web applications using React, Node.js, and cloud technologies.', ARRAY['5+ years experience with React/Next.js and Node.js', 'Strong knowledge of TypeScript and modern JavaScript', 'Experience with cloud platforms (AWS, Azure, GCP)', 'Database design and optimization (PostgreSQL, MongoDB)', 'CI/CD pipeline implementation', 'Team leadership and mentoring experience'], ARRAY['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options'], true),
('DevOps Engineer', 'Colombo, Sri Lanka / Remote', 'Full-time', '3+ years', 'Competitive', 'Design and implement scalable cloud infrastructure and CI/CD pipelines for enterprise clients.', ARRAY['3+ years experience with AWS/Azure/GCP', 'Docker and Kubernetes expertise', 'Infrastructure as Code (Terraform, CloudFormation)', 'CI/CD tools (Jenkins, GitLab CI, GitHub Actions)', 'Monitoring and logging (Prometheus, Grafana, ELK)', 'Security best practices and compliance'], ARRAY['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options'], true),
('Frontend Developer', 'Colombo, Sri Lanka / Remote', 'Full-time', '2+ years', 'Competitive', 'Create beautiful, responsive user interfaces using modern frontend technologies and frameworks.', ARRAY['2+ years experience with React, Vue.js, or Angular', 'Strong CSS/SCSS and responsive design skills', 'Experience with state management (Redux, Zustand)', 'Testing frameworks (Jest, Cypress)', 'UI/UX design principles', 'Performance optimization techniques'], ARRAY['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options'], true),
('Backend Developer', 'Colombo, Sri Lanka / Remote', 'Full-time', '3+ years', 'Competitive', 'Build robust, scalable backend services and APIs using modern technologies and best practices.', ARRAY['3+ years experience with Node.js, Python, or Java', 'RESTful API and GraphQL development', 'Database design and optimization', 'Microservices architecture', 'Authentication and authorization (OAuth, JWT)', 'Performance monitoring and optimization'], ARRAY['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options'], true);

