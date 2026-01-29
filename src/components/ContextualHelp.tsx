import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle,
  ExternalLink,
  Book,
  MessageCircle,
  RefreshCw
} from 'lucide-react';

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  category: 'error' | 'guidance' | 'tip' | 'warning';
  priority: 'high' | 'medium' | 'low';
  content: React.ReactNode;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'outline' | 'destructive';
  }>;
  relatedTopics?: string[];
}

interface ContextualHelpProps {
  context: string;
  error?: Error;
  userAction?: string;
  className?: string;
}

const ContextualHelp: React.FC<ContextualHelpProps> = ({
  context,
  error,
  userAction,
  className = ''
}) => {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [relevantTopics, setRelevantTopics] = useState<HelpTopic[]>([]);

  // Generate contextual help topics based on context and error
  useEffect(() => {
    const topics = generateHelpTopics(context, error, userAction);
    setRelevantTopics(topics);
    
    // Auto-expand high priority topics
    const highPriorityTopics = topics
      .filter(topic => topic.priority === 'high')
      .map(topic => topic.id);
    setExpandedTopics(new Set(highPriorityTopics));
  }, [context, error, userAction]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'guidance': return <Lightbulb className="h-4 w-4 text-blue-500" />;
      case 'tip': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'error': return 'bg-red-50 border-red-200';
      case 'guidance': return 'bg-blue-50 border-blue-200';
      case 'tip': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  if (relevantTopics.length === 0) {
    return null;
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-500" />
          Contextual Help
          <Badge variant="outline">{context}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {relevantTopics.map((topic) => (
          <Collapsible
            key={topic.id}
            open={expandedTopics.has(topic.id)}
            onOpenChange={() => toggleTopic(topic.id)}
          >
            <CollapsibleTrigger asChild>
              <div className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${getCategoryColor(topic.category)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(topic.category)}
                    <span className="font-medium">{topic.title}</span>
                    <Badge 
                      variant={topic.priority === 'high' ? 'destructive' : 'outline'}
                      className="text-xs"
                    >
                      {topic.priority}
                    </Badge>
                  </div>
                  {expandedTopics.has(topic.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-2">
              <div className="pl-6 pr-3 pb-3">
                <div className="prose prose-sm max-w-none">
                  {topic.content}
                </div>
                
                {topic.actions && topic.actions.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {topic.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant || 'outline'}
                        size="sm"
                        onClick={action.action}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
                
                {topic.relatedTopics && topic.relatedTopics.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">Related topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {topic.relatedTopics.map((relatedId) => {
                        const relatedTopic = relevantTopics.find(t => t.id === relatedId);
                        return relatedTopic ? (
                          <Button
                            key={relatedId}
                            variant="ghost"
                            size="sm"
                            className="text-xs h-6 px-2"
                            onClick={() => toggleTopic(relatedId)}
                          >
                            {relatedTopic.title}
                          </Button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Need more help?</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                <Book className="h-3 w-3 mr-1" />
                Documentation
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <MessageCircle className="h-3 w-3 mr-1" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate contextual help topics
function generateHelpTopics(
  context: string, 
  error?: Error, 
  userAction?: string
): HelpTopic[] {
  const topics: HelpTopic[] = [];

  // Error-specific help
  if (error) {
    const errorMessage = error.message.toLowerCase();
    
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      topics.push({
        id: 'network-error-help',
        title: 'Network Connection Issues',
        description: 'Troubleshoot connectivity problems',
        category: 'error',
        priority: 'high',
        content: (
          <div className="space-y-2">
            <p>Network errors can occur due to various reasons:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Unstable internet connection</li>
              <li>Server maintenance or downtime</li>
              <li>Firewall or proxy blocking requests</li>
              <li>DNS resolution issues</li>
            </ul>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Your data is automatically saved locally and will sync when connection is restored.
              </AlertDescription>
            </Alert>
          </div>
        ),
        actions: [
          {
            label: 'Check Connection',
            action: () => window.open('https://www.google.com', '_blank'),
            variant: 'outline'
          },
          {
            label: 'Retry Now',
            action: () => window.location.reload(),
            variant: 'default'
          }
        ],
        relatedTopics: ['offline-mode-help', 'data-sync-help']
      });
    }

    if (errorMessage.includes('loading chunk') || errorMessage.includes('chunk')) {
      topics.push({
        id: 'chunk-loading-error-help',
        title: 'Application Loading Issues',
        description: 'Fix problems with loading application resources',
        category: 'error',
        priority: 'high',
        content: (
          <div className="space-y-2">
            <p>This error typically occurs when:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>The application has been updated while you were using it</li>
              <li>Browser cache contains outdated files</li>
              <li>Network interrupted during resource loading</li>
            </ul>
            <p className="text-sm font-medium">Recommended solution: Clear cache and reload</p>
          </div>
        ),
        actions: [
          {
            label: 'Clear Cache & Reload',
            action: () => {
              if ('caches' in window) {
                caches.keys().then(names => {
                  names.forEach(name => caches.delete(name));
                  window.location.reload();
                });
              } else {
                window.location.reload();
              }
            },
            variant: 'default'
          }
        ]
      });
    }
  }

  // Context-specific help
  switch (context) {
    case 'enrollment':
      topics.push({
        id: 'enrollment-help',
        title: 'Course Enrollment Guide',
        description: 'Learn how to enroll in courses and manage your enrollments',
        category: 'guidance',
        priority: 'medium',
        content: (
          <div className="space-y-2">
            <p>To enroll in a course:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Browse available courses in the course catalog</li>
              <li>Click on a course to view details and requirements</li>
              <li>Click "Enroll Now" to submit your enrollment request</li>
              <li>Wait for approval from the course administrator</li>
              <li>Once approved, you can access course materials</li>
            </ol>
          </div>
        ),
        relatedTopics: ['course-progress-help', 'certificate-help']
      });

      topics.push({
        id: 'enrollment-status-help',
        title: 'Understanding Enrollment Status',
        description: 'Learn about different enrollment statuses',
        category: 'tip',
        priority: 'low',
        content: (
          <div className="space-y-2">
            <p>Enrollment statuses explained:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Pending:</strong> Your enrollment is awaiting approval</li>
              <li><strong>Approved:</strong> You can access the course materials</li>
              <li><strong>Rejected:</strong> Enrollment was not approved (contact support for details)</li>
            </ul>
          </div>
        )
      });
      break;

    case 'course-progress':
      topics.push({
        id: 'course-progress-help',
        title: 'Tracking Your Progress',
        description: 'Understand how course progress is calculated and saved',
        category: 'guidance',
        priority: 'medium',
        content: (
          <div className="space-y-2">
            <p>Your progress is automatically tracked as you:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Complete course modules and lessons</li>
              <li>Submit assignments and quizzes</li>
              <li>Participate in course activities</li>
            </ul>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Progress is saved automatically and synced across all your devices.
              </AlertDescription>
            </Alert>
          </div>
        ),
        relatedTopics: ['certificate-help', 'offline-mode-help']
      });
      break;

    case 'admin-dashboard':
      topics.push({
        id: 'admin-dashboard-help',
        title: 'Admin Dashboard Guide',
        description: 'Learn how to manage enrollments and monitor course activity',
        category: 'guidance',
        priority: 'medium',
        content: (
          <div className="space-y-2">
            <p>As an administrator, you can:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>View and manage all student enrollments</li>
              <li>Approve or reject enrollment requests</li>
              <li>Monitor course progress and completion rates</li>
              <li>Generate reports and analytics</li>
            </ul>
          </div>
        ),
        actions: [
          {
            label: 'View Admin Guide',
            action: () => console.log('Open admin guide'),
            variant: 'outline'
          }
        ]
      });
      break;
  }

  // General help topics
  topics.push({
    id: 'offline-mode-help',
    title: 'Working Offline',
    description: 'Continue learning even without internet connection',
    category: 'tip',
    priority: 'low',
    content: (
      <div className="space-y-2">
        <p>When offline, you can still:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Access previously loaded course content</li>
          <li>Continue with downloaded materials</li>
          <li>Take notes and complete activities</li>
        </ul>
        <p className="text-sm text-gray-600">
          Your progress will be saved locally and synced when you're back online.
        </p>
      </div>
    ),
    relatedTopics: ['data-sync-help']
  });

  topics.push({
    id: 'data-sync-help',
    title: 'Data Synchronization',
    description: 'How your data is kept in sync across devices',
    category: 'tip',
    priority: 'low',
    content: (
      <div className="space-y-2">
        <p>Your learning data is automatically synchronized:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Progress is saved after each completed activity</li>
          <li>Data syncs when internet connection is available</li>
          <li>Conflicts are resolved using the most recent data</li>
          <li>You'll see a sync indicator when data is being updated</li>
        </ul>
      </div>
    )
  });

  return topics;
}

export default ContextualHelp;
export type { HelpTopic };