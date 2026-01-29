import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/AuthContext';

// Simple, reliable home page that always works
const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Beta Skills</h2>
          <p className="text-gray-600">Loading your learning platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/lovable-uploads/c890d50b-9e2b-4f34-8958-e006a579ccea.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/85 to-black/90"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-full p-4 shadow-2xl">
                <img 
                  src="/lovable-uploads/c890d50b-9e2b-4f34-8958-e006a579ccea.png" 
                  alt="Beta Skill Logo" 
                  className="h-20 w-auto"
                />
              </div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">
              <span className="text-red-500">BETA</span>
              <span className="ml-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                SKILL TRAINING
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
              An Accredited Training Provider
            </h2>
            
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">
              FREE TRAINING TO START YOUR OWN BUSINESS
            </h3>
            
            <h3 className="text-lg md:text-xl font-bold text-white mb-8">
              Pay Just <span className="text-red-500">R290.00</span> – Registration fee!
            </h3>
            
            {/* Warning Messages */}
            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-3 rounded-full shadow-xl inline-block">
                <div className="text-lg font-bold">FEES MUST FALL!</div>
              </div>
              <div className="block">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full shadow-2xl inline-block">
                  <div className="text-xl font-black">JOBS ARE AT RISK!</div>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                  OUR COURSES
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                  APPLY NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">60+</div>
              <div className="text-lg text-gray-600">Professional Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
              <div className="text-lg text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-lg text-gray-600">Free Training</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses designed to help you start your own business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Cards */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Entrepreneurship</h3>
                <p className="text-gray-600 mb-4">Learn to create and manage your own business</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-600">R290</span>
                  <Link to="/courses">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Plumbing</h3>
                <p className="text-gray-600 mb-4">Master plumbing fundamentals and techniques</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-600">R290</span>
                  <Link to="/courses">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hair Dressing</h3>
                <p className="text-gray-600 mb-4">Professional hair styling and salon management</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-600">R290</span>
                  <Link to="/courses">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/c890d50b-9e2b-4f34-8958-e006a579ccea.png" 
                  alt="Beta Skill Logo" 
                  className="h-12 w-auto mr-3"
                />
                <div>
                  <h3 className="text-xl font-bold">BETA SKILL</h3>
                  <p className="text-sm text-gray-400">Training Solutions</p>
                </div>
              </div>
              <p className="text-gray-400">
                Empowering you with free, world-class skills training to start your own business.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
                <li><Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Apply Now</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>126 Plantation Rd.</p>
                <p>Blue Hills AH, Midrand</p>
                <p>Johannesburg</p>
                <p>Phone: 011 046 9483</p>
                <p>Email: registrar@betaskills.co.za</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Beta Skill Training Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;