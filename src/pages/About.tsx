import React from 'react';
import { Shield, Cloud, Users, Heart, Camera, Code } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Cloud,
      title: 'Google Drive Storage',
      description: 'All photos and videos are securely stored in Google Drive with automatic backup and unlimited storage.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your memories are protected with enterprise-grade security. Only authorized users can access the content.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by and for our school community. Everyone can contribute to preserving our shared memories.'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Created with care to ensure every precious school moment is captured and preserved for generations.'
    }
  ];

  const techStack = [
    { name: 'Frontend', tech: 'React + TypeScript + Tailwind CSS' },
    { name: 'Backend', tech: 'Google Apps Script' },
    { name: 'Storage', tech: 'Google Drive API' },
    { name: 'Hosting', tech: 'GitHub Pages (Free)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About SchoolMemories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A modern, free platform designed to capture, store, and share the beautiful moments 
            that make our school community special. Built with love and powered by Google's reliable infrastructure.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              To provide a beautiful, secure, and completely free platform where our school community 
              can preserve and share the precious moments that define our educational journey together.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-16">
          <div className="text-center mb-8">
            <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Architecture</h2>
            <p className="text-gray-600">
              Built with modern web technologies and Google's robust infrastructure for reliability and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Free & Open */}
        <div className="bg-green-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-green-900 mb-4">100% Free Forever</h2>
          <p className="text-green-800 text-lg leading-relaxed">
            This platform is completely free to use and maintain. No hidden costs, no subscription fees, 
            no storage limits. Built with freely available technologies and hosted on free platforms 
            to ensure it remains accessible to all schools and communities.
          </p>
        </div>

        {/* Setup Instructions */}
        <div className="mt-16 bg-gray-900 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Setup Instructions</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-300">Google Apps Script Backend</h3>
              <ol className="space-y-2 text-gray-300">
                <li>1. Go to script.google.com</li>
                <li>2. Create a new project</li>
                <li>3. Enable Google Drive API</li>
                <li>4. Deploy as web app</li>
                <li>5. Update API endpoint in the frontend</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-300">GitHub Pages Hosting</h3>
              <ol className="space-y-2 text-gray-300">
                <li>1. Fork this repository</li>
                <li>2. Enable GitHub Pages in settings</li>
                <li>3. Build and deploy automatically</li>
                <li>4. Custom domain support available</li>
                <li>5. Free SSL certificate included</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;