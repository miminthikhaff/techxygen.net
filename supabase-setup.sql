-- =====================================================
-- TechXygen Admin System Database Setup
-- =====================================================
-- Copy and paste this entire script into your Supabase SQL Editor
-- Run it to set up all required tables and security policies

-- =====================================================
-- 1. Create admin_profiles table
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'hr_admin', 'content_admin')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. Create job_postings table
-- =====================================================
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  experience TEXT NOT NULL,
  salary TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  benefits TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  posted_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. Create job_applications table
-- =====================================================
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  experience TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. Enable Row Level Security (RLS)
-- =====================================================
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. Create RLS Policies for admin_profiles
-- =====================================================

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON admin_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON admin_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Super admins can insert new profiles
CREATE POLICY "Super admins can insert profiles" ON admin_profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Policy: Super admins can delete profiles
CREATE POLICY "Super admins can delete profiles" ON admin_profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- =====================================================
-- 6. Create RLS Policies for job_postings
-- =====================================================

-- Policy: Only admins can manage job postings
CREATE POLICY "Admins can manage job postings" ON job_postings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'hr_admin')
    )
  );

-- Policy: Public can view active job postings
CREATE POLICY "Public can view active jobs" ON job_postings
  FOR SELECT USING (is_active = true);

-- =====================================================
-- 7. Create RLS Policies for job_applications
-- =====================================================

-- Policy: Only admins can view applications
CREATE POLICY "Admins can view applications" ON job_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'hr_admin')
    )
  );

-- Policy: Anyone can submit applications
CREATE POLICY "Anyone can submit applications" ON job_applications
  FOR INSERT WITH CHECK (true);

-- Policy: Only admins can update application status
CREATE POLICY "Admins can update applications" ON job_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'hr_admin')
    )
  );

-- =====================================================
-- 8. Create indexes for better performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_admin_profiles_user_id ON admin_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON admin_profiles(role);
CREATE INDEX IF NOT EXISTS idx_job_postings_active ON job_postings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_postings_posted_date ON job_postings(posted_date);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);

-- =====================================================
-- 9. Create updated_at trigger function
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- 10. Create triggers for updated_at
-- =====================================================
CREATE TRIGGER update_admin_profiles_updated_at 
    BEFORE UPDATE ON admin_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at 
    BEFORE UPDATE ON job_postings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at 
    BEFORE UPDATE ON job_applications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 11. Insert sample job postings (optional)
-- =====================================================
INSERT INTO job_postings (title, location, type, experience, salary, description, requirements, benefits, is_active) VALUES
(
  'Senior Full-Stack Developer',
  'Colombo, Sri Lanka / Remote',
  'Full-time',
  '5+ years',
  'Competitive',
  'Lead development of enterprise-grade web applications using React, Node.js, and cloud technologies. You will be responsible for architecting, developing, and deploying scalable solutions.',
  '5+ years experience with React/Next.js and Node.js, Strong knowledge of TypeScript and modern JavaScript, Experience with cloud platforms (AWS, Azure, GCP), Database design and optimization (PostgreSQL, MongoDB), CI/CD pipeline implementation, Team leadership and mentoring experience',
  'Health Insurance, Flexible Hours, Remote Work Options, Generous Learning Budget, Stock Options',
  true
),
(
  'DevOps Engineer',
  'Colombo, Sri Lanka / Remote',
  'Full-time',
  '3+ years',
  'Competitive',
  'Design and implement scalable cloud infrastructure and CI/CD pipelines for enterprise clients. Ensure high availability, performance, and security of our systems.',
  '3+ years experience with AWS/Azure/GCP, Docker and Kubernetes expertise, Infrastructure as Code (Terraform, CloudFormation), CI/CD tools (Jenkins, GitLab CI, GitHub Actions), Monitoring and logging (Prometheus, Grafana, ELK), Security best practices and compliance',
  'Health Insurance, Flexible Hours, Remote Work Options, Generous Learning Budget, Stock Options',
  true
),
(
  'Frontend Developer',
  'Colombo, Sri Lanka / Remote',
  'Full-time',
  '2+ years',
  'Competitive',
  'Create beautiful, responsive user interfaces using modern frontend technologies and frameworks. Collaborate with UI/UX designers to bring concepts to life.',
  '2+ years experience with React, Vue.js, or Angular, Strong CSS/SCSS and responsive design skills, Experience with state management (Redux, Zustand), Testing frameworks (Jest, Cypress), UI/UX design principles, Performance optimization techniques',
  'Health Insurance, Flexible Hours, Remote Work Options, Generous Learning Budget, Stock Options',
  true
);

-- =====================================================
-- Setup Complete!
-- =====================================================
-- Your database is now ready for the TechXygen admin system.
-- Next step: Create your admin user in the Authentication section.


