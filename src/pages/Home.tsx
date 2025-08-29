import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, Heart, Users, Calendar, Award } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: 'Photo Gallery',
      description: 'Browse through our collection of school memories and special moments.',
    },
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Share your photos and videos with the school community effortlessly.',
    },
    {
      icon: Heart,
      title: 'Safe Storage',
      description: 'All memories are securely stored and backed up in Google Drive.',
    },
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Students' },
    { icon: Camera, value: '2,000+', label: 'Photos' },
    { icon: Calendar, value: '50+', label: 'Events' },
    { icon: Award, value: '10+', label: 'Years' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Capturing School
              <span className="block text-blue-200">Memories Forever</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A beautiful digital gallery to preserve and share the precious moments of our school journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/gallery"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Gallery
              </Link>
              <Link
                to="/upload"
                className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 border-2 border-blue-400"
              >
                Share Memories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SchoolMemories?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make it simple to capture, store, and share the beautiful moments that make school life special.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-green-100 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Share Your Memories?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join our community and help preserve the beautiful moments that make our school special.
          </p>
          <Link
            to="/upload"
            className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Start Uploading</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;