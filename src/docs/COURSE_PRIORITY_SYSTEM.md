# Course Priority Calculation System

## Overview

The Course Priority Calculation System determines the display order of courses based on user enrollment status. This system ensures that enrolled and pending courses are prominently displayed to users while maintaining a consistent and intuitive course browsing experience.

## Components

### 1. CoursePriorityCalculator Service

The core service that handles priority calculations and enrollment status mapping.

**Key Features:**
- Calculates course priorities based on enrollment status
- Normalizes different enrollment status formats
- Provides UI indicators for different enrollment states
- Groups courses by enrollment status
- Sorts courses by priority and display order

**Priority Levels:**
- **Priority 1**: Enrolled courses (highest priority)
- **Priority 2**: Pending courses (second priority)  
- **Priority 999**: Not enrolled courses (lowest priority)

### 2. useCoursePriorities Hook

A React hook that integrates the priority calculation system with course data and enrollment context.

**Provides:**
- Real-time priority calculations based on enrollment changes
- Sorted course IDs for display ordering
- Course grouping by enrollment status
- Status indicators for UI components
- Helper functions for enrollment status checks

### 3. Course Page Integration

The Courses page uses the priority system to:
- Display courses in priority order (enrolled → pending → available)
- Show section headers with enrollment counts
- Apply visual indicators for different enrollment states
- Maintain filtering functionality while preserving priority order

## Enrollment Status Mapping

The system normalizes various enrollment status formats:

| Input Status | Normalized Status | Priority | Display |
|-------------|------------------|----------|---------|
| `enrolled`, `approved`, `active` | `ENROLLED` | 1 | Green badge, "Enrolled" |
| `pending`, `waiting`, `review` | `PENDING` | 2 | Yellow badge, "Pending Approval" |
| `unenrolled`, `rejected`, `inactive`, `none` | `NOT_ENROLLED` | 999 | Gray badge, "Available" |

## Usage Examples

### Basic Priority Calculation

```typescript
import { CoursePriorityCalculator } from '@/services/CoursePriorityCalculator';

const courseIds = ['course-1', 'course-2', 'course-3'];
const enrollments = {
  'course-1': 'enrolled',
  'course-2': 'pending',
  'course-3': 'unenrolled'
};

const priorities = CoursePriorityCalculator.calculatePriorities(
  courseIds,
  enrollments
);

// Result: courses sorted by enrollment status
// [enrolled courses, pending courses, not enrolled courses]
```

### Using the Hook in Components

```typescript
import { useCoursePriorities } from '@/hooks/useCoursePriorities';

const MyComponent = () => {
  const courseIds = ['course-1', 'course-2', 'course-3'];
  const {
    sortedCourseIds,
    courseGroups,
    getStatusIndicator,
    isHighPriority
  } = useCoursePriorities(courseIds);

  return (
    <div>
      {courseGroups.hasEnrolled && (
        <h2>My Enrolled Courses ({courseGroups.totalEnrolled})</h2>
      )}
      {/* Render courses in priority order */}
      {sortedCourseIds.map(courseId => (
        <CourseCard 
          key={courseId}
          courseId={courseId}
          indicator={getStatusIndicator(courseId)}
          highlighted={isHighPriority(courseId)}
        />
      ))}
    </div>
  );
};
```

### Getting Status Indicators

```typescript
const indicator = CoursePriorityCalculator.getEnrollmentStatusIndicator('ENROLLED');
// Returns:
// {
//   label: 'Enrolled',
//   color: 'green',
//   bgClass: 'bg-green-500',
//   textClass: 'text-green-700',
//   priority: 1,
//   icon: 'CheckCircle'
// }
```

## Visual Indicators

The system provides consistent visual indicators across the application:

### Enrolled Courses
- **Color**: Green
- **Icon**: CheckCircle
- **Badge**: "Enrolled"
- **Ring**: Green ring around course cards
- **Animation**: Subtle pulse effect

### Pending Courses
- **Color**: Yellow
- **Icon**: Clock
- **Badge**: "Pending Approval"
- **Ring**: Yellow ring around course cards
- **Animation**: Subtle pulse effect

### Available Courses
- **Color**: Gray
- **Icon**: BookOpen
- **Badge**: "Available"
- **Ring**: No special ring
- **Animation**: Standard hover effects

## Integration Points

### 1. Courses Page
- Displays courses in priority order
- Shows section headers with counts
- Applies visual indicators to course cards

### 2. Course Grid Component
- Uses priority data for visual styling
- Shows enrollment status badges
- Applies highlighting for high-priority courses

### 3. Enrollment Context
- Provides real-time enrollment data
- Triggers priority recalculation on status changes
- Handles multiple enrollment data sources

## Testing

The system includes comprehensive tests covering:
- Priority calculation logic
- Enrollment status normalization
- Status indicator generation
- Course grouping functionality
- Edge cases and error handling

Run tests with:
```bash
npm test -- src/services/__tests__/CoursePriorityCalculator.test.ts --run
```

## Performance Considerations

- Priority calculations are memoized in the hook
- Course sorting is optimized for large course lists
- Status indicators are cached to prevent recalculation
- Real-time updates are debounced to prevent excessive recalculations

## Future Enhancements

Potential improvements to the system:
- Custom priority rules based on course categories
- User-defined course ordering preferences
- Advanced filtering with priority preservation
- Analytics tracking for course engagement by priority
- A/B testing for different priority algorithms