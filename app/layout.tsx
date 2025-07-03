import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InGenium - Business Management & Funding Platform',
  description: 'Streamline your business with task management, grant discovery, and content creation tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <header>
            <div className="logo">
              <img src="/ingeniumlogo.png" alt="InGenium" className="logo-image" />
            </div>
            <nav>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/business-hub">Business Hub</a></li>
                <li><a href="/funding">Funding</a></li>
                <li><a href="/content-toolkit">Content Tools</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
              </ul>
            </nav>
            <a href="/dashboard" className="cta-button">Get Started</a>
          </header>
          
          <main>
            {children}
          </main>
          
          <footer className="site-footer">
            <div className="footer-main">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src="/ingeniumlogo.png" alt="InGenium" className="logo-image-small" />
                </div>
                <p className="brand-description">
                  Empowering entrepreneurs with comprehensive business management, funding discovery, and content creation tools.
                </p>
              </div>
              <div className="footer-nav-column">
                <h3>Platform</h3>
                <ul>
                  <li><a href="/business-hub">Business Hub</a></li>
                  <li><a href="/funding">Find Funding</a></li>
                  <li><a href="/content-toolkit">Content Tools</a></li>
                  <li><a href="/dashboard">Dashboard</a></li>
                </ul>
              </div>
              <div className="footer-nav-column">
                <h3>Company</h3>
                <ul>
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/pricing">Pricing</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 InGenium. All rights reserved.</p>
              <div className="social-links">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Support</a>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
