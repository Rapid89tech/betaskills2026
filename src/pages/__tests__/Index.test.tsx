import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '../Index';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { test } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { test } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { test } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { test } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { test } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { test } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { test } from 'vitest';
import { describe } from 'vitest';

// Mock router for testing
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Index (Home Page)', () => {
  test('renders hero section with correct title and styling', () => {
    renderWithRouter(<Index />);
    
    // Check for main title
    expect(screen.getByText('Master New Skills with')).toBeInTheDocument();
    expect(screen.getAllByText('Beta Skills')).toHaveLength(2); // One in hero, one in footer
    
    // Check for subtitle
    expect(screen.getByText(/Join thousands of learners worldwide/)).toBeInTheDocument();
  });

  test('renders CTA buttons with correct links', () => {
    renderWithRouter(<Index />);
    
    // Check for primary CTA buttons
    const exploreCourses = screen.getByRole('link', { name: /🚀 Explore Courses/ });
    const getStarted = screen.getByRole('link', { name: /📚 Get Started/ });
    
    expect(exploreCourses).toHaveAttribute('href', '/courses');
    expect(getStarted).toHaveAttribute('href', '/auth');
  });

  test('renders features section with all three features', () => {
    renderWithRouter(<Index />);
    
    // Check for features section title
    expect(screen.getByText('Why Choose Beta Skills?')).toBeInTheDocument();
    
    // Check for all three feature cards
    expect(screen.getByText('Expert-Led Courses')).toBeInTheDocument();
    expect(screen.getByText('Learn at Your Pace')).toBeInTheDocument();
    expect(screen.getByText('Certificates')).toBeInTheDocument();
  });

  test('renders CTA section with correct styling and link', () => {
    renderWithRouter(<Index />);
    
    // Check for CTA section
    expect(screen.getByText('Ready to Start Learning?')).toBeInTheDocument();
    expect(screen.getByText('Join thousands of successful learners today')).toBeInTheDocument();
    
    // Check for CTA button
    const browseCoursesBtn = screen.getByRole('link', { name: /🎯 Browse All Courses/ });
    expect(browseCoursesBtn).toHaveAttribute('href', '/courses');
  });

  test('renders footer with correct branding and links', () => {
    renderWithRouter(<Index />);
    
    // Check for footer branding (using getAllByText since "Beta Skills" appears twice)
    expect(screen.getAllByText('Beta Skills')).toHaveLength(2);
    expect(screen.getByText('Empowering learners worldwide with quality education')).toBeInTheDocument();
    
    // Check for footer links
    expect(screen.getByRole('link', { name: 'Courses' })).toHaveAttribute('href', '/courses');
    expect(screen.getByRole('link', { name: 'Sign Up' })).toHaveAttribute('href', '/auth');
    
    // Check for copyright
    expect(screen.getByText('© 2024 Beta Skills. All rights reserved.')).toBeInTheDocument();
  });

  test('has correct gradient backgrounds and styling classes', () => {
    const { container } = renderWithRouter(<Index />);
    
    // Check for main background gradient
    const mainDiv = container.querySelector('.bg-gradient-to-br.from-blue-50.via-white.to-purple-50');
    expect(mainDiv).toBeInTheDocument();
    
    // Check for features section background
    const featuresSection = container.querySelector('.bg-white');
    expect(featuresSection).toBeInTheDocument();
  });

  test('maintains responsive design classes', () => {
    const { container } = renderWithRouter(<Index />);
    
    // Check for responsive classes
    expect(container.querySelector('.md\\:text-6xl')).toBeInTheDocument();
    expect(container.querySelector('.md\\:grid-cols-3')).toBeInTheDocument();
    expect(container.querySelector('.sm\\:flex-row')).toBeInTheDocument();
  });
});