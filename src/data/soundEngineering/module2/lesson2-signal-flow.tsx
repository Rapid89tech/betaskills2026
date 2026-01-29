import { Lesson } from '@/types/course';

export const lesson2SignalFlow: Lesson = {
  id: 'lesson2-signal-flow',
  title: '📊 Signal Flow Diagrams',
  description: 'Understanding signal flow diagrams and their importance in audio systems',
  duration: '50 minutes',
  type: 'lesson',
  content: `# 📊 Signal Flow Diagrams

## 1. Introduction to Signal Flow Diagrams (SFDs)

**YouTube Video**: [Basics of Audio Engineering Signal Flow](https://youtu.be/zDouGdDtGoI)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/zDouGdDtGoI" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Definition**: A Signal Flow Diagram is a graphical representation that shows the path an audio or electrical signal takes from the input source through various processing stages to the output destination.

**Purpose**: To visualize and understand how signals move through an audio system or electronic circuit.

**Applications**:
- Audio engineering (mixing consoles, recording setups)
- Electronics and control systems
- Telecommunications
- Software signal processing

## 2. Importance of Signal Flow Diagrams

Signal flow diagrams help:
- Troubleshoot audio and electrical problems
- Provide clear understanding of signal routing and processing
- Enable efficient setup and reconfiguration of equipment
- Assist in teaching and documentation of complex systems
- Essential for designing audio systems and electronic circuits

## 3. Basic Components in Signal Flow Diagrams

**YouTube Video**: [Signal Flow Components](https://youtu.be/q5aBt8M8ZR0)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/q5aBt8M8ZR0" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

- **Source**: The origin of the signal (microphone, instrument, line input)
- **Processor**: Any device or module that alters the signal (preamps, compressors, EQs)
- **Mixer**: Combines multiple signals and routes them to outputs
- **Output**: Final destination of the signal (speakers, recorders, headphones)
- **Paths/Lines**: Represent signal cables or signal routes
- **Nodes**: Points where signals split or join

## 4. Symbols and Conventions

**YouTube Video**: [Signal Flow Symbols](https://youtu.be/PWXydd85GRk)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/PWXydd85GRk" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

- **Lines**: Show direction of signal flow, usually left-to-right or top-to-bottom
- **Boxes**: Represent devices or processing units
- **Circles**: Often used for connection points or junctions
- **Arrows**: Indicate signal direction
- **Labels**: Annotate types of signals (mic level, line level), channel names, or function names

## 5. Types of Signal Flow Diagrams

**YouTube Video**: [Types of Signal Flow](https://www.youtube.com/watch?v=2yW2e4jzZ9g&pp=ygUddHlwZXMgb2Ygc2lnbmFsIGZsb3cgaW4gc291bmQ%3D)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/2yW2e4jzZ9g?pp=ygUddHlwZXMgb2Ygc2lnbmFsIGZsb3cgaW4gc291bmQ%3D" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

- **Block Diagrams**: Simplified, high-level diagrams showing major components and signal flow without detailed wiring
- **Detailed SFDs**: Include every connection, device, and signal path with precise routing and levels
- **Hybrid Diagrams**: Combine block and detailed elements to suit complexity and audience

## 6. Common Audio Signal Flow Example

**YouTube Video**: [Recording Studio Signal Flow](https://youtu.be/example)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/example" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

Typical signal flow in a recording setup:
- **Source**: Microphone
- **Preamp**: Amplifies mic signal to line level
- **EQ**: Adjusts tone and frequencies
- **Dynamics Processor**: Controls signal dynamics (compressor/limiter)
- **Mixer Channel**: Balances levels with other inputs
- **Bus**: Groups signals for submix or effects send
- **Master Bus**: Final mix output
- **Output**: PA system or recording device

## 7. Reading and Creating Signal Flow Diagrams

**YouTube Video**: [Creating Signal Flow Diagrams](https://youtu.be/PWXydd85GRk)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/PWXydd85GRk" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Step-by-step process**:
1. **Step 1**: Identify all input sources and outputs
2. **Step 2**: Map out all devices and processing units signal passes through
3. **Step 3**: Draw lines showing signal routes and directions
4. **Step 4**: Include signal types and levels (mic, line, insert points)
5. **Step 5**: Use standardized symbols and clear labels
6. **Step 6**: Verify flow matches actual system operation

## 8. Troubleshooting Using Signal Flow Diagrams

Signal flow diagrams are invaluable for troubleshooting:
- Follow the signal path step-by-step to isolate problems
- Check signal presence at key nodes with meters or monitors
- Identify misrouted cables or incorrect device settings
- Understand where signal loss or distortion might occur

## 9. Examples and Practice

**YouTube Video**: [Signal Flow Examples](https://youtu.be/example)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/example" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

Practice scenarios:
- Provide students with sample SFDs from common studio setups
- Ask students to draw signal flow for given scenarios (e.g., setting up a vocal mic chain)
- Analyze complex systems like digital audio workstations (DAWs) or broadcast chains

## 10. Summary

**YouTube Video**: [Summary of Signal Flow Diagrams](https://youtu.be/example)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/example" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

Signal Flow Diagrams are essential tools in audio and electronics. They clarify the path and transformation of signals. Mastery of SFDs improves system design, operation, and troubleshooting.

## Key Takeaways

1. **Signal flow diagrams** visualize how audio signals move through systems
2. **Basic components** include sources, processors, mixers, and outputs
3. **Standard symbols** help create clear and understandable diagrams
4. **Different types** of diagrams serve different purposes (block, detailed, hybrid)
5. **Troubleshooting** becomes easier with clear signal flow documentation
6. **Reading and creating** SFDs is a crucial skill for audio engineers
7. **Practice scenarios** help develop signal flow understanding
8. **Complex systems** like DAWs can be understood through signal flow analysis
9. **Documentation** of signal flow helps with system maintenance and training
10. **Design decisions** are informed by understanding signal flow requirements
  `
};

export default lesson2SignalFlow; 
