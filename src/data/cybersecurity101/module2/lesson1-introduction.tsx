import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Introduction',
  duration: '15 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/4V_LHDplu3U',
    textContent: `
# Introduction

Cyber threats are malicious acts that seek to damage data, steal information, or disrupt digital life. Understanding different threat types is essential for identifying and preventing attacks.
`
  }
};

export default lesson;

