import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  CheckCircle, 
  Circle,
  ArrowRight,
  ArrowLeft,
  Target,
  MapPin,
  Lightbulb,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GuidanceStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for element to highlight
  action?: () => void | Promise<void>;
  validation?: () => boolean | Promise<boolean>;
  helpText?: string;
  optional?: boolean;
}

interface GuidanceFlow {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  steps: GuidanceStep[];
  onComplete?: () => void;
  onSkip?: () => void;
}

interface UserGuidanceSystemProps {
  flows?: GuidanceFlow[];
  autoStart?: boolean;
  showOnFirstVisit?: boolean;
  context?: string;
}

// Predefined guidance flows for common tasks
const DEFAULT_GUIDANCE_FLOWS: GuidanceFlow[] = [
  {
    id: 'first-enrollment',
    title: 'Enroll in Your First Course',
    description: 'Learn how to browse courses and complete your first enrollment',
    category: 'Getting Started',
    estimatedTime: '3 minutes',
    steps: [
      {
        id: 'browse-courses',
        title: 'Browse Available Courses',
        description: 'Start by exploring the courses available to you',
        target: '[data-testid="courses-grid"], .courses-container',
        helpText: 'Look for courses that match your interests and career goals'
      },
      {
        id: 'select-course',
        title: 'Select a Course',
        description: 'Click on a course card to view more details',
        target: '.course-card, [data-testid="course-card"]',
        helpText: 'Each course shows the duration, difficulty level, and what you\'ll learn'
      },
      {
        id: 'review-details',
        title: 'Review Course Details',
        description: 'Check the course curriculum, requirements, and pricing',
        target: '.course-details, [data-testid="course-details"]',
        helpText: 'Make sure the course content aligns with your learning objectives'
      },
      {
        id: 'start-enrollment',
        title: 'Start Enrollment Process',
        description: 'Click the "Enroll Now" button to begin enrollment',
        target: '[data-testid="enroll-button"], .enroll-button',
        action: async () => {
          const button = document.querySelector('[data-testid="enroll-button"]') as HTMLElement;
          button?.click();
        },
        helpText: 'You\'ll need to provide your details and payment information'
      },
      {
        id: 'complete-enrollment',
        title: 'Complete Your Enrollment',
        description: 'Fill out the enrollment form and submit your application',
        target: '.enrollment-form, [data-testid="enrollment-form"]',
        validation: async () => {
          // Check if enrollment was successful
          return document.querySelector('.enrollment-success') !== null;
        },
        helpText: 'Double-check your information before submitting'
      }
    ]
  },
  {
    id: 'navigate-course',
    title: 'Navigate Your Course',
    description: 'Learn how to access lessons, track progress, and complete activities',
    category: 'Course Navigation',
    estimatedTime: '2 minutes',
    steps: [
      {
        id: 'access-course',
        title: 'Access Your Course',
        description: 'Go to your enrolled courses and select one to start learning',
        target: '.my-courses, [data-testid="my-courses"]',
        helpText: 'Your enrolled courses appear in your dashboard'
      },
      {
        id: 'view-curriculum',
        title: 'View Course Curriculum',
        description: 'Explore the course structure and available lessons',
        target: '.course-curriculum, .lesson-list',
        helpText: 'Lessons are organized in modules for structured learning'
      },
      {
        id: 'start-lesson',
        title: 'Start Your First Lesson',
        description: 'Click on a lesson to begin learning',
        target: '.lesson-item, [data-testid="lesson-item"]',
        helpText: 'Your progress is automatically saved as you complete lessons'
      },
      {
        id: 'track-progress',
        title: 'Track Your Progress',
        description: 'Monitor your completion status and learning achievements',
        target: '.progress-indicator, [data-testid="progress"]',
        helpText: 'The progress bar shows how much of the course you\'ve completed'
      }
    ]
  },
  {
    id: 'admin-enrollment-management',
    title: 'Manage Student Enrollments',
    description: 'Learn how to review, approve, and manage student enrollments as an admin',
    category: 'Administration',
    estimatedTime: '4 minutes',
    steps: [
      {
        id: 'access-admin-dashboard',
        title: 'Access Admin Dashboard',
        description: 'Navigate to the admin dashboard to manage enrollments',
        target: '.admin-dashboard, [data-testid="admin-dashboard"]',
        helpText: 'The admin dashboard gives you oversight of all student activities'
      },
      {
        id: 'view-enrollments',
        title: 'View Pending Enrollments',
        description: 'Review the list of students waiting for enrollment approval',
        target: '.enrollments-list, [data-testid="enrollments-list"]',
        helpText: 'Enrollments are organized by status: pending, approved, or rejected'
      },
      {
        id: 'review-student-details',
        title: 'Review Student Details',
        description: 'Click on an enrollment to view student information and course details',
        target: '.enrollment-item, [data-testid="enrollment-item"]',
        helpText: 'Check student qualifications and course requirements before approving'
      },
      {
        id: 'approve-enrollment',
        title: 'Approve or Reject Enrollment',
        description: 'Use the action buttons to approve or reject the enrollment',
        target: '.enrollment-actions, [data-testid="enrollment-actions"]',
        helpText: 'Approved students will receive access to their course materials'
      }
    ]
  }
];

const UserGuidanceSystem: React.FC<UserGuidanceSystemProps> = ({
  flows = [],
  autoStart = false,
  showOnFirstVisit = true,
  context = 'general'
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<GuidanceFlow | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null);
  const { toast } = useToast();

  const allFlows = [...flows, ...DEFAULT_GUIDANCE_FLOWS];

  // Check if this is the user's first visit
  useEffect(() => {
    if (showOnFirstVisit) {
      const hasVisited = localStorage.getItem(`guidance-visited-${context}`);
      if (!hasVisited && allFlows.length > 0) {
        setIsActive(true);
        if (autoStart) {
          startFlow(allFlows[0]);
        }
        localStorage.setItem(`guidance-visited-${context}`, 'true');
      }
    }
  }, [showOnFirstVisit, autoStart, context, allFlows]);

  // Highlight target element
  const highlightElement = useCallback((selector?: string) => {
    // Remove previous highlight
    if (highlightedElement) {
      highlightedElement.classList.remove('guidance-highlight');
    }

    if (!selector) {
      setHighlightedElement(null);
      return;
    }

    const element = document.querySelector(selector);
    if (element) {
      element.classList.add('guidance-highlight');
      setHighlightedElement(element);
      
      // Scroll element into view
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [highlightedElement]);

  // Start a guidance flow
  const startFlow = (flow: GuidanceFlow) => {
    setCurrentFlow(flow);
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setIsPlaying(true);
    setIsActive(true);
    
    toast({
      title: "Guidance Started",
      description: `Starting "${flow.title}" - ${flow.estimatedTime}`,
    });

    // Highlight first step
    if (flow.steps[0]?.target) {
      highlightElement(flow.steps[0].target);
    }
  };

  // Execute current step
  const executeCurrentStep = async () => {
    if (!currentFlow || currentStepIndex >= currentFlow.steps.length) return;

    const step = currentFlow.steps[currentStepIndex];
    
    try {
      // Execute step action if available
      if (step.action) {
        await step.action();
      }

      // Validate step completion if validation is provided
      if (step.validation) {
        const isValid = await step.validation();
        if (!isValid) {
          toast({
            title: "Step Not Complete",
            description: "Please complete the current step before proceeding",
            variant: "destructive",
          });
          return;
        }
      }

      // Mark step as completed
      setCompletedSteps(prev => new Set([...prev, step.id]));
      
      toast({
        title: "Step Completed",
        description: step.title,
      });

      // Move to next step
      setTimeout(() => {
        nextStep();
      }, 1000);

    } catch (error) {
      toast({
        title: "Step Failed",
        description: `Error executing step: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (!currentFlow) return;

    if (currentStepIndex < currentFlow.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      
      // Highlight next step target
      const nextStep = currentFlow.steps[nextIndex];
      if (nextStep.target) {
        highlightElement(nextStep.target);
      }
    } else {
      // Flow completed
      completeFlow();
    }
  };

  // Navigate to previous step
  const previousStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      
      // Remove current step from completed
      const currentStep = currentFlow?.steps[currentStepIndex];
      if (currentStep) {
        setCompletedSteps(prev => {
          const newSet = new Set(prev);
          newSet.delete(currentStep.id);
          return newSet;
        });
      }
      
      // Highlight previous step target
      const prevStep = currentFlow?.steps[prevIndex];
      if (prevStep?.target) {
        highlightElement(prevStep.target);
      }
    }
  };

  // Complete the current flow
  const completeFlow = () => {
    if (!currentFlow) return;

    toast({
      title: "Guidance Complete!",
      description: `You've completed "${currentFlow.title}"`,
    });

    currentFlow.onComplete?.();
    
    // Clean up
    highlightElement();
    setCurrentFlow(null);
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setIsPlaying(false);
  };

  // Skip current flow
  const skipFlow = () => {
    if (!currentFlow) return;

    currentFlow.onSkip?.();
    
    toast({
      title: "Guidance Skipped",
      description: `Skipped "${currentFlow.title}"`,
    });

    // Clean up
    highlightElement();
    setCurrentFlow(null);
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setIsPlaying(false);
  };

  // Close guidance system
  const closeGuidance = () => {
    highlightElement();
    setIsActive(false);
    setCurrentFlow(null);
    setIsPlaying(false);
  };

  const currentStep = currentFlow?.steps[currentStepIndex];
  const progress = currentFlow ? ((currentStepIndex + 1) / currentFlow.steps.length) * 100 : 0;

  // Add CSS for highlighting
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .guidance-highlight {
        position: relative;
        z-index: 1000;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.2) !important;
        border-radius: 8px;
        transition: box-shadow 0.3s ease;
      }
      
      .guidance-highlight::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 2px solid #3b82f6;
        border-radius: 8px;
        pointer-events: none;
        animation: guidance-pulse 2s infinite;
      }
      
      @keyframes guidance-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!isActive) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsActive(true)}
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        <Lightbulb className="h-4 w-4 mr-2" />
        Need Help?
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      {!currentFlow ? (
        // Flow selection
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Guided Help</CardTitle>
              <Button variant="ghost" size="sm" onClick={closeGuidance}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              Choose a guided tutorial to help you get started:
            </p>
            
            {allFlows.map((flow) => (
              <div
                key={flow.id}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => startFlow(flow)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{flow.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{flow.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {flow.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{flow.estimatedTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        // Active flow
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">{currentFlow.title}</CardTitle>
                <p className="text-xs text-gray-600">
                  Step {currentStepIndex + 1} of {currentFlow.steps.length}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={skipFlow}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-4">
            {currentStep && (
              <div>
                <div className="flex items-start gap-2">
                  {completedSteps.has(currentStep.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{currentStep.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{currentStep.description}</p>
                    {currentStep.helpText && (
                      <p className="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                        💡 {currentStep.helpText}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={previousStep}
                  disabled={currentStepIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex gap-2">
                {currentStep?.optional && (
                  <Button variant="outline" size="sm" onClick={nextStep}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                )}
                
                <Button size="sm" onClick={executeCurrentStep}>
                  {currentStepIndex === currentFlow.steps.length - 1 ? 'Complete' : 'Next'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserGuidanceSystem;
export type { GuidanceFlow, GuidanceStep };