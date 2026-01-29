import type { Lesson } from '@/types/course';

export const lesson5ReinforcementLearning: Lesson = {
  id: 5,
  title: 'Reinforcement Learning',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=nIgIv4IfJ6s',
    textContent: `<div class="lesson-content">

<h1>Reinforcement Learning</h1>

<p><strong>Reinforcement Learning (RL) involves an agent learning optimal behaviors by interacting with an environment, receiving rewards or penalties based on its actions.</strong></p>

<h2>Features:</h2>
<ul>
  <li><strong>Agent-Environment Interaction</strong>: The agent takes actions, observes outcomes, and receives feedback (rewards).</li>
  <li><strong>Policy Learning</strong>: The agent learns a strategy (policy) to maximize cumulative rewards.</li>
  <li><strong>Exploration vs. Exploitation</strong>: Balances trying new actions (exploration) with using known rewarding actions (exploitation).</li>
</ul>

<h2>Key Components:</h2>
<ul>
  <li><strong>Agent</strong>: The learner or decision-maker (e.g., a game-playing AI).</li>
  <li><strong>Environment</strong>: The system the agent interacts with (e.g., a game board).</li>
  <li><strong>Actions</strong>: Choices the agent makes (e.g., moving a chess piece).</li>
  <li><strong>Rewards</strong>: Feedback signals (positive or negative) based on actions.</li>
  <li><strong>State</strong>: The current situation of the environment (e.g., board configuration).</li>
</ul>

<h2>Algorithms:</h2>
<ul>
  <li><strong>Q-Learning</strong>: Learns a value function for action-state pairs to guide decisions.</li>
  <li><strong>Deep Q-Networks (DQN)</strong>: Combines Q-learning with neural networks for complex environments.</li>
  <li><strong>Policy Gradients</strong>: Optimizes policies directly, used in continuous action spaces.</li>
  <li><strong>Proximal Policy Optimization (PPO)</strong>: A stable RL algorithm for tasks like robotics.</li>
</ul>

<h2>Example:</h2>
<p>A robot learning to navigate a maze:</p>
<ul>
  <li><strong>State</strong>: Robot's position in the maze.</li>
  <li><strong>Action</strong>: Move up, down, left, or right.</li>
  <li><strong>Reward</strong>: +100 for reaching the goal, -1 for hitting a wall.</li>
  <li>The agent learns to maximize rewards by finding the shortest path.</li>
</ul>

<h2>Use Cases:</h2>
<ul>
  <li><strong>Game Playing</strong>: AlphaGo defeating human champions in Go.</li>
  <li><strong>Robotics</strong>: Teaching robots to grasp objects or walk.</li>
  <li><strong>Autonomous Vehicles</strong>: Optimizing driving decisions in dynamic environments.</li>
  <li><strong>Resource Management</strong>: Scheduling tasks in data centers for efficiency.</li>
</ul>

</div>`
  }
};
