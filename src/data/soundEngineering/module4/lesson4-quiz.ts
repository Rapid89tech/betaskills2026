
import type { Lesson } from '@/types/course';

export const lesson4Quiz: Lesson = {
  id: 15,
  title: 'Module 4 Quiz: Digital Audio Workstations',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of a DAW (Digital Audio Workstation)?',
        options: [
          'Create visual effects',
          'Design websites',
          'Record, edit, and mix audio',
          'Stream music'
        ],
        correct: 2,
        explanation: 'A DAW is primarily designed to record, edit, mix, and produce audio content.'
      },
      {
        question: 'Which section of a DAW typically shows audio clips in a timeline format?',
        options: [
          'Mixer',
          'Transport Bar',
          'Track View / Arrangement Window',
          'Media Pool'
        ],
        correct: 2,
        explanation: 'The Track View or Arrangement Window displays audio clips in a timeline format for editing and arrangement.'
      },
      {
        question: 'What does the Mixer or Mixing Console allow you to do?',
        options: [
          'Play video clips',
          'Apply lighting effects',
          'Adjust levels, panning, and plug-ins for each track',
          'Upload tracks to streaming platforms'
        ],
        correct: 2,
        explanation: 'The Mixer provides controls for volume, panning, effects, and other audio processing for each track.'
      },
      {
        question: 'What feature in the DAW interface lets you control playback and recording?',
        options: [
          'Browser',
          'Transport Controls',
          'MIDI Editor',
          'Color Coding Panel'
        ],
        correct: 1,
        explanation: 'Transport Controls include play, pause, stop, record, and navigation buttons.'
      },
      {
        question: 'What is the purpose of the MIDI Editor (Piano Roll)?',
        options: [
          'To compress audio tracks',
          'To browse and import media',
          'To edit MIDI note data for virtual instruments',
          'To view system settings'
        ],
        correct: 2,
        explanation: 'The MIDI Editor or Piano Roll is used to edit MIDI note data, including timing, velocity, and note length.'
      },
      {
        question: 'Which DAW is known for its clip-launching Session View and linear Arrangement View?',
        options: [
          'Pro Tools',
          'Ableton Live',
          'Logic Pro',
          'Cubase'
        ],
        correct: 1,
        explanation: 'Ableton Live features both Session View for clip launching and Arrangement View for linear editing.'
      },
      {
        question: 'What tool helps users keep track of input/output volume and avoid clipping?',
        options: [
          'Media Pool',
          'Tool Selector',
          'Metering & Level Indicators',
          'Mixer Strip Color'
        ],
        correct: 2,
        explanation: 'Metering and Level Indicators provide visual feedback about audio levels to prevent clipping and maintain proper gain staging.'
      },
      {
        question: 'What is one benefit of customizing your DAW interface?',
        options: [
          'Unlocks more plug-ins',
          'Makes exporting faster',
          'Speeds up workflow by adapting layout to user needs',
          'Improves audio file quality'
        ],
        correct: 2,
        explanation: 'Customizing the DAW interface improves workflow efficiency by adapting the layout to individual user needs and preferences.'
      },
      {
        question: 'Which section of the DAW is used to access audio files, loops, and instruments?',
        options: [
          'Transport Bar',
          'File Browser / Media Pool',
          'MIDI Roll',
          'Track Header'
        ],
        correct: 1,
        explanation: 'The File Browser or Media Pool provides access to audio files, loops, samples, and instruments for importing into projects.'
      },
      {
        question: 'What is a key workflow tip for navigating any DAW efficiently?',
        options: [
          'Always turn off metering',
          'Only use factory presets',
          'Learn keyboard shortcuts and label your tracks',
          'Avoid using more than two tracks'
        ],
        correct: 2,
        explanation: 'Learning keyboard shortcuts and properly labeling tracks are essential for efficient DAW navigation and workflow.'
      }
    ]
  }
};
