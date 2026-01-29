
import React from 'react';
import type { VideoLesson } from '@/types/course';
import Lesson1Content from './lessons/Lesson1Content';
import Lesson2Content from './lessons/Lesson2Content';
import Lesson3Content from './lessons/Lesson3Content';
import Lesson4Content from './lessons/Lesson4Content';
import Lesson5Content from './lessons/Lesson5Content';
import Lesson6Content from './lessons/Lesson6Content';
import Lesson7Content from './lessons/Lesson7Content';
import DefaultLessonContent from './lessons/DefaultLessonContent';

interface VideoLessonContentProps {
  lesson: VideoLesson;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onNext: () => void;
}

const VideoLessonContent = ({ lesson }: VideoLessonContentProps) => {
  // Only show the dynamic lesson content
  switch (lesson.id) {
    case 1:
      return <Lesson1Content />;
    case 2:
      return <Lesson2Content />;
    case 3:
      return <Lesson3Content />;
    case 4:
      return <Lesson4Content />;
    case 5:
      return <Lesson5Content />;
    case 6:
      return <Lesson6Content />;
    case 7:
      return <Lesson7Content />;
    default:
      return <DefaultLessonContent />;
  }
};

export default VideoLessonContent;
