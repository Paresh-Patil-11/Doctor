import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Mock Link component since react-router-dom is not available in this environment
const Link = ({ to, children, className, href, 'aria-label': ariaLabel }) => {
    const path = to || href || '#';
    return (
        <a 
            href={path} 
            className={className} 
            aria-label={ariaLabel}
            // Prevent actual navigation in the sandbox
            onClick={(e) => e.preventDefault()} 
        >
            {children}
        </a>
    );
};

const Footer = () => {
  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Doctors', href: '/doctors' },
      { name: 'Book Appointment', href: '/appointment' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Cardiology', href: '/services#cardiology' },
      { name: 'Neurology', href: '/services#neurology' },
      { name: 'Pediatrics', href: '/services#pediatrics' },
      { name: 'Orthopedics', href: '/services#orthopedics' },
      { name: 'Emergency Care', href: '/services#emergency' },
      { name: 'Mental Health', href: '/services#mental-health' },
    ],
    contact: [
      { icon: Phone, text: '+1 (555) 123-4567' },
      { icon: Mail, text: 'info@medcare.com' },
      { icon: MapPin, text: '123 Medical Center Dr, City, State 12345' },
      { icon: Phone, text: 'Emergency: 911' },
    ],
    social: [
      { icon: Facebook, href: '#', label: 'Facebook' },
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Links & Info Section */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Hospital Info & Socials (Column 1) */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-hospital-secondary" />
              <span className="text-xl font-bold">MedCare Hospital</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Providing exceptional healthcare services with compassion, 
              innovation, and excellence for over 25 years.
            </p>
            <div className="flex space-x-4 pt-2">
              {footerLinks.social.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-hospital-secondary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links (Column 2) */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-hospital-secondary">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-hospital-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (Column 3) */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-hospital-secondary">Our Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-gray-300 hover:text-hospital-secondary transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Column 4) */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-hospital-secondary">Contact Info</h3>
            <div className="space-y-3">
              {footerLinks.contact.map((contact, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <contact.icon className="h-4 w-4 mt-0.5 text-hospital-secondary flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{contact.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-400 font-medium">
                <strong>24/7 Emergency Service Available</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal Links */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm order-2 md:order-1 mt-4 md:mt-0">
              © 2025 MedCare Hospital. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 order-1 md:order-2">
              <Link to="/privacy" className="text-gray-400 hover:text-hospital-secondary text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-hospital-secondary text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/hipaa" className="text-gray-400 hover:text-hospital-secondary text-sm transition-colors duration-200">
                HIPAA Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;