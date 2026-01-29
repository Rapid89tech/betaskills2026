import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '../Index';

// Mock router for testing navigation
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Index Integration Tests', () => {
  test('home page renders without errors', () => {
    renderWithRouter(<Index />);
    
    // Verify the page loads successfully
    expect(screen.getByText('Master New Skills with')).toBeInTheDocument();
    expect(screen.getByText('Why Choose Beta Skills?')).toBeInTheDocument();
    expect(screen.getByText('Ready to Start Learning?')).toBeInTheDocument();
  });

  test('all navigation links are functional', () => {
    renderWithRouter(<Index />);
    
    // Test hero section CTA buttons
    const exploreCourses = screen.getByRole('link', { name: /🚀 Explore Courses/ });
    const getStarted = screen.getByRole('link', { name: /📚 Get Started/ });
    
    expect(exploreCourses).toHaveAttribute('href', '/courses');
    expect(getStarted).toHaveAttribute('href', '/auth');
    
    // Test CTA section button
    const browseAllCourses = screen.getByRole('link', { name: /🎯 Browse All Courses/ });
    expect(browseAllCourses).toHaveAttribute('href', '/courses');
    
    // Test footer links
    const footerCourses = screen.getByRole('link', { name: 'Courses' });
    const footerSignUp = screen.getByRole('link', { name: 'Sign Up' });
    const contactLink = screen.getByRole('link', { name: 'Contact' });
    
    expect(footerCourses).toHaveAttribute('href', '/courses');
    expect(footerSignUp).toHaveAttribute('href', '/auth');
    expect(contactLink).toHaveAttribute('href', 'mailto:support@betaskills.co.za');
  });

  test('responsive design elements are present', () => {
    const { container } = renderWithRouter(<Index />);
    
    // Check for responsive classes
    expect(container.querySelector('.md\\:text-6xl')).toBeInTheDocument();
    expect(container.querySelector('.md\\:grid-cols-3')).toBeInTheDocument();
    expect(container.querySelector('.sm\\:flex-row')).toBeInTheDocument();
    expect(container.querySelector('.sm\\:px-6')).toBeInTheDocument();
    expect(container.querySelector('.lg\\:px-8')).toBeInTheDocument();
  });

  test('all visual elements and styling are preserved', () => {
    const { container } = renderWithRouter(<Index />);
    
    // Check main background gradient
    expect(container.querySelector('.bg-gradient-to-br.from-blue-50.via-white.to-purple-50')).toBeInTheDocument();
    
    // Check features section background
    expect(container.querySelector('.bg-white')).toBeInTheDocument();
    
    // Check CTA section gradient
    expect(container.querySelector('.bg-gradient-to-r.from-blue-600.to-purple-600')).toBeInTheDocument();
    
    // Check footer background
    expect(container.querySelector('.bg-gray-900')).toBeInTheDocument();
    
    // Check feature card gradients
    expect(container.querySelector('.bg-gradient-to-br.from-blue-50.to-blue-100')).toBeInTheDocument();
    expect(container.querySelector('.bg-gradient-to-br.from-purple-50.to-purple-100')).toBeInTheDocument();
    expect(container.querySelector('.bg-gradient-to-br.from-green-50.to-green-100')).toBeInTheDocument();
  });

  test('hover effects and transitions are applied', () => {
    const { container } = renderWithRouter(<Index />);
    
    // Check for transition classes on buttons
    const buttons = container.querySelectorAll('.transition-all');
    expect(buttons.length).toBeGreaterThan(0);
    
    // Check for hover transform effects
    const transformElements = container.querySelectorAll('.hover\\:-translate-y-1');
    expect(transformElements.length).toBeGreaterThan(0);
    
    // Check for shadow effects
    const shadowElements = container.querySelectorAll('.shadow-lg');
    expect(shadowElements.length).toBeGreaterThan(0);
  });

  test('branding elements are correctly displayed', () => {
    renderWithRouter(<Index />);
    
    // Check for Beta Skills branding (appears in hero and footer)
    expect(screen.getAllByText('Beta Skills')).toHaveLength(2);
    
    // Check for logo elements
    expect(screen.getByText('BS')).toBeInTheDocument(); // Logo initials
    
    // Check for tagline
    expect(screen.getByText('Empowering learners worldwide with quality education')).toBeInTheDocument();
    
    // Check for copyright
    expect(screen.getByText('© 2024 Beta Skills. All rights reserved.')).toBeInTheDocument();
  });
});