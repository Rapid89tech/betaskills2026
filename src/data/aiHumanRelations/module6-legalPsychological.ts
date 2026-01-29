
import type { Module } from '@/types/course';

export const module6LegalPsychological: Module = {
  id: 6,
  title: 'Legal and Psychological Implications',
  description: 'Examine the legal frameworks surrounding AI responsibility, trust dynamics in human-AI interaction, and the psychological effects of AI on human identity and behavior.',
  lessons: [
    {
      id: 21,
      title: 'Legal Responsibility and AI Behavior',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/z20lFR4BMws',
        textContent: `
# Legal Responsibility and AI Behavior

## 1. Introduction
**Context:** AI systems are increasingly autonomous, making decisions with real-world consequences.

**Key question:** Who is legally responsible when AI systems cause harm or behave unpredictably?

**Importance:** Understanding legal responsibility helps ensure accountability, safety, and public trust in AI technologies.

## 2. Defining AI Behavior
AI behavior refers to actions or decisions taken by an AI system based on its programming, learning, and inputs.

Can include autonomous vehicles navigating traffic, algorithms making financial trades, or AI chatbots interacting with users.

Challenges arise due to AI's ability to learn and evolve, making behavior less predictable than traditional software.

## 3. Legal Responsibility: Basic Concepts
- **Liability:** Legal obligation to compensate for harm caused.
- **Negligence:** Failure to exercise reasonable care leading to damage.
- **Strict Liability:** Liability without fault for inherently risky activities.
- **Product Liability:** Holding manufacturers accountable for defective products.
- **Vicarious Liability:** Holding one party responsible for another's actions (e.g., employer-employee).

## 4. Traditional Frameworks vs AI Challenges

| Traditional Legal Frameworks | Challenges with AI |
|----------------------------|-------------------|
| Human actors accountable for actions | AI may act autonomously, without direct human control |
| Clear causation and intent | AI decisions influenced by complex data and algorithms |
| Static software products | AI systems can learn and evolve unpredictably |
| Product defects are identifiable | AI errors may stem from training data or emergent behavior |

## 5. Potential Legal Actors in AI Responsibility
- **AI developers and programmers:** Responsible for design, coding, testing.
- **Manufacturers:** Providers of AI hardware and integrated systems.
- **Users/operators:** Those who deploy and manage AI systems.
- **Organizations/businesses:** Entities using AI in products or services.
- **AI itself:** Debated idea of granting AI some form of legal personhood or agency.

## 6. Key Legal Issues and Questions
- Who is liable for harm caused by AI? Developers, users, or others?
- Can AI be considered a legal "agent" with responsibilities? Current law generally rejects AI personhood.
- How to assess fault if AI behavior results from complex machine learning processes?
- What standards should apply for AI safety and compliance?
- How to manage liability when AI behavior is influenced by biased or incomplete data?

## 7. Emerging Legal Approaches
- **Strict liability models:** Holding manufacturers or users liable regardless of fault for AI-related harm.
- **Fault-based liability:** Assessing negligence or breach of duty by humans managing AI.
- **AI auditing and certification:** Mandatory testing and transparency to minimize risks.
- **Insurance schemes:** Creating AI liability insurance to cover potential damages.
- **Regulatory frameworks:** Governments introducing AI-specific regulations (e.g., EU AI Act).

## 8. Case Studies and Examples
- **Autonomous vehicles:** Who is liable in a crash — manufacturer, software developer, or driver?
- **Medical AI:** Responsibility for misdiagnosis or treatment errors.
- **Algorithmic decision-making:** Liability in financial losses caused by AI trading or loan approvals.

## 9. Ethical and Policy Considerations
- Balancing innovation with public safety.
- Ensuring transparency and explainability to determine accountability.
- Protecting consumer rights and privacy.
- Avoiding "accountability gaps" where no party is clearly responsible.
- International coordination on AI liability standards.

## 10. Future Directions
- Developing legal personhood frameworks for AI or robotic agents (controversial and nascent).
- Integrating AI ethics guidelines into legal standards.
- Creating multistakeholder oversight bodies for AI accountability.
- Expanding legal literacy and training for developers, users, and policymakers.

## 11. Summary
- Legal responsibility for AI behavior remains a complex, evolving area.
- Current laws struggle to keep pace with autonomous AI systems.
- Assigning liability involves multiple actors and depends on context.
- Proactive regulation, transparency, and ethical design are key to responsible AI deployment.

## 12. Discussion Questions
- Who should be held legally responsible when an AI system causes harm?
- Can AI ever be granted legal personhood or agency? Why or why not?
- How should laws adapt to address AI's unpredictable behavior?
- What role should transparency and explainability play in legal accountability?
- How can we prevent accountability gaps in AI deployment?
        `
      }
    },
    {
      id: 22,
      title: 'Trust and Over-Reliance on AI',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/eXdVDhOGqoE',
        textContent: `
# Trust and Over-Reliance on AI

## 1. Introduction
AI systems increasingly influence daily life, from healthcare and finance to transportation and social media.

Trust is essential for users to adopt AI technologies effectively.

However, excessive or misplaced trust can lead to over-reliance, causing risks and negative consequences.

This lecture explores the dynamics of trust in AI, factors influencing it, and the dangers of over-reliance.

## 2. Understanding Trust in AI
**Definition:** Trust is the belief that an AI system will perform as expected, reliably and safely.

Trust depends on perceptions of:
- **Competence:** How well AI performs its tasks.
- **Predictability:** Consistency in behavior.
- **Transparency:** Clarity of AI's decision-making processes.
- **Fairness:** Absence of bias and ethical conduct.
- **Security:** Protection against misuse or attack.

## 3. Why Trust AI?
- AI offers benefits such as efficiency, personalization, and handling complex data.
- Trust encourages adoption and integration in critical domains like medicine, autonomous vehicles, and finance.
- Users often assume AI is objective, rational, and less error-prone than humans.

## 4. Risks of Over-Reliance on AI
**Definition:** Over-reliance occurs when users depend too much on AI without sufficient critical evaluation or human oversight.

Common in contexts where AI decisions are complex or opaque.

Leads to automation bias, where users accept AI outputs even when incorrect.

## 5. Consequences of Over-Reliance

| Consequence | Description |
|-------------|-------------|
| Reduced Human Judgment | Users may stop critically assessing AI recommendations. |
| Complacency and Skill Degradation | Over time, humans lose expertise or vigilance. |
| Blind Trust in Errors | AI mistakes may go unnoticed, leading to harm. |
| Ethical and Safety Risks | E.g., medical misdiagnoses, financial losses, accidents. |
| Accountability Issues | Difficulty determining who is responsible for decisions. |

## 6. Factors Influencing Trust and Over-Reliance
- **System Design:** Clear explanations and transparency foster calibrated trust.
- **User Experience:** Prior successes or failures shape trust levels.
- **Context of Use:** High-stakes situations require more cautious trust.
- **Social Influence:** Recommendations by peers or experts affect trust.
- **Cognitive Biases:** Humans tend to over-trust automation due to perceived infallibility.

## 7. Strategies to Manage Trust and Prevent Over-Reliance
- **Calibration of Trust:** Align user trust with actual AI capabilities.
- **Explainable AI (XAI):** Provide understandable reasons behind AI decisions.
- **User Training:** Educate users about AI's limitations and proper use.
- **Human-in-the-Loop Systems:** Maintain human oversight and decision-making authority.
- **Fail-Safe Mechanisms:** Allow easy override and error detection.
- **Transparency and Disclosure:** Inform users about data sources, accuracy, and risks.

## 8. Case Studies
- **Healthcare:** Over-reliance on diagnostic AI may delay human second opinions, risking patient safety.
- **Autonomous Vehicles:** Drivers overly trusting autopilot systems may neglect attentive driving, leading to accidents.
- **Financial Trading Algorithms:** Blind trust in AI trading bots can cause massive losses during market anomalies.

## 9. Ethical Considerations
- Responsibility to ensure users are not misled about AI's reliability.
- Need for balancing trust to promote adoption while safeguarding against complacency.
- Avoiding harm due to misplaced trust is a key ethical imperative.
- Transparency obligations to prevent deception and build informed trust.

## 10. Future Directions
- Advances in AI explainability and interpretability.
- Development of adaptive trust models that adjust based on user behavior.
- Research on cognitive and social factors affecting trust in AI.
- Legal frameworks addressing accountability in cases of over-reliance.

## 11. Summary
- Trust is crucial for effective AI use but must be balanced to avoid over-reliance.
- Over-trust can lead to critical errors and safety risks.
- Calibrating trust involves transparency, education, and maintaining human oversight.
- Ethical and design considerations are key to fostering healthy human-AI relationships.

## 12. Discussion Questions
- How can designers ensure users trust AI appropriately without over-relying on it?
- What role should explainability play in building and calibrating trust?
- Can AI systems be designed to detect and warn about user over-reliance?
- How do cultural or individual differences affect trust in AI?
- Should there be legal consequences when over-reliance on AI leads to harm?
        `
      }
    },
    {
      id: 23,
      title: 'Human Identity and Psychological Impact of AI Interaction',
      duration: '50 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/Rcm9u9CdK10',
        textContent: `
# Human Identity and Psychological Impact of Interacting with AI

## 1. Introduction
As AI technologies become more prevalent—through chatbots, virtual assistants, social robots, and AI companions—they increasingly influence human identity and psychology.

This lecture explores how AI interaction shapes self-perception, emotional well-being, social behavior, and our understanding of what it means to be human.

## 2. Human Identity in the Age of AI
Identity involves our self-concept, beliefs, roles, and how we relate to others.

AI challenges traditional boundaries by:
- Blurring lines between human and machine interaction.
- Raising questions about uniqueness and agency.
- Introducing "digital selves" through avatars, AI profiles, and online personas.

Interaction with AI may impact:
- **Self-awareness:** How we see our intelligence and emotional capacities.
- **Social roles:** Redefining companionship, friendship, and care.

## 3. Psychological Effects of AI Interaction
**Positive Impacts:**
- AI companions can reduce loneliness and provide social support.
- AI tutors and assistants can boost confidence by providing personalized help.
- AI as a mirror can help users reflect on their thoughts and emotions.

**Negative Impacts:**
- Over-dependence on AI for social and emotional needs may reduce human-human interaction.
- Confusion or discomfort about forming emotional bonds with non-human entities.
- Potential loss of privacy and autonomy leading to anxiety.
- Risks of diminished self-esteem if AI is perceived as superior or judgmental.

## 4. Anthropomorphism and Emotional Attachment
Humans tend to attribute human-like qualities to AI (anthropomorphism).

This can lead to emotional attachment, empathy, and trust toward AI agents.

Emotional bonds may improve engagement but raise ethical concerns about deception.

Distinguishing genuine human relationships from AI interactions becomes challenging.

## 5. Impact on Social Behavior and Relationships
AI may alter social norms and communication patterns.

Possible effects include:
- Reduced face-to-face social skills due to reliance on AI intermediaries.
- Changes in empathy and compassion when interacting with AI versus humans.
- AI as social facilitators, e.g., encouraging shy individuals to open up.
- Concerns about social isolation versus AI as a bridge to human connection.

## 6. Identity and Self-Expression in AI-mediated Environments
AI-enabled platforms influence how people present themselves (e.g., virtual avatars, social media).

Potential for:
- Experimenting with identity fluidity and new personas.
- Challenges in authenticity and self-coherence.
- Increased creativity or confusion about personal identity.

## 7. Psychological Theories Relevant to AI Interaction
- **Social Presence Theory:** Sense of "being with" others affected by AI's responsiveness and realism.
- **Attachment Theory:** Humans seek emotional bonds; AI may fulfill or complicate attachment needs.
- **Self-Determination Theory:** Impact on autonomy, competence, and relatedness through AI interactions.
- **Computers as Social Actors (CASA) Paradigm:** People apply social rules to computers and AI.

## 8. Ethical and Social Considerations
- Is it ethical to design AI that elicits emotional attachment?
- Privacy concerns from AI's ability to learn and predict personal behavior.
- The importance of transparency about AI's non-human nature.
- Impact on vulnerable populations, such as children or elderly, who may anthropomorphize AI deeply.
- Responsibility of creators to consider psychological well-being.

## 9. Case Studies and Examples
- **Replika:** An AI chatbot designed to be a friend and emotional companion.
- **Paro:** A therapeutic robot seal used in elder care to provide comfort.
- **Virtual Influencers:** AI-generated personas influencing culture and identity online.
- **AI in Gaming:** Role-playing with AI characters influencing player identity and emotions.

## 10. Future Directions
- Developing AI that supports healthy psychological outcomes.
- Integrating emotional intelligence and ethical safeguards.
- Research on long-term psychological effects of AI companionship.
- Designing AI to enhance human identity and agency, not diminish it.
- Multidisciplinary collaboration: psychology, AI, ethics, and design.

## 11. Summary
- Interaction with AI significantly impacts human identity and psychology.
- AI offers both opportunities for connection and risks of emotional confusion or isolation.
- Balancing innovation with ethical care is essential to protect mental health and preserve authentic human experiences.
- Continued study is needed to understand and guide these evolving human-AI relationships.

## 12. Discussion Questions
- How might AI change our sense of self and what it means to be human?
- Can emotional attachment to AI be psychologically healthy or harmful?
- What ethical responsibilities do designers have in shaping human-AI emotional bonds?
- How can we foster AI that enhances rather than diminishes human identity?
- Should limits be set on AI's role in intimate and social aspects of life?
        `
      }
    },
    {
      id: 24,
      title: 'Module 6 Quiz: Legal and Psychological Implications',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the central legal question raised by the increasing autonomy of AI systems?',
            options: [
              'How to improve AI performance',
              'Who is legally responsible when AI causes harm or behaves unpredictably',
              'How to design AI user interfaces',
              'How AI systems store data'
            ],
            correct: 1,
            explanation: 'The central legal question is who bears legal responsibility when AI systems cause harm or behave unpredictably, as AI systems become more autonomous.'
          },
          {
            question: 'Which of the following best defines AI behavior?',
            options: [
              'Actions taken by a human programmer',
              'Actions or decisions made by AI based on programming, learning, and inputs',
              'Software bugs in AI systems',
              'Marketing strategies for AI products'
            ],
            correct: 1,
            explanation: 'AI behavior refers to actions or decisions taken by an AI system based on its programming, learning, and inputs.'
          },
          {
            question: 'What is "strict liability" in legal terms?',
            options: [
              'Liability that requires proving negligence',
              'Liability without fault for inherently risky activities',
              'Liability assigned to AI systems only',
              'Liability waived for manufacturers'
            ],
            correct: 1,
            explanation: 'Strict liability is liability without fault for inherently risky activities, where the responsible party is held liable regardless of whether they were negligent.'
          },
          {
            question: 'Why do traditional legal frameworks struggle with AI accountability?',
            options: [
              'AI systems always function predictably',
              'AI can act autonomously and learn, making causation and intent unclear',
              'Humans always control AI directly',
              'AI does not cause any harm'
            ],
            correct: 1,
            explanation: 'Traditional legal frameworks struggle because AI can act autonomously and learn, making causation and intent unclear compared to traditional human-controlled systems.'
          },
          {
            question: 'Which legal actor is generally NOT considered responsible for AI behavior under current laws?',
            options: [
              'AI developers',
              'AI users',
              'AI itself (legal personhood)',
              'Manufacturers'
            ],
            correct: 2,
            explanation: 'AI itself is generally not considered responsible under current laws, as AI systems are not granted legal personhood or agency.'
          },
          {
            question: 'What is a key challenge in assessing fault when AI causes harm?',
            options: [
              'Lack of AI in critical applications',
              'AI\'s complex machine learning processes that influence behavior unpredictably',
              'Clear human intent behind AI decisions',
              'AI systems never making errors'
            ],
            correct: 1,
            explanation: 'The key challenge is AI\'s complex machine learning processes that can influence behavior unpredictably, making it difficult to determine fault.'
          },
          {
            question: 'Which emerging legal approach holds manufacturers or users liable regardless of fault for AI-related harm?',
            options: [
              'Fault-based liability',
              'Strict liability',
              'No liability',
              'Vicarious liability'
            ],
            correct: 1,
            explanation: 'Strict liability holds manufacturers or users liable regardless of fault for AI-related harm.'
          },
          {
            question: 'In the context of autonomous vehicles, who could potentially be held liable in the event of a crash?',
            options: [
              'Only the driver',
              'Only the software developer',
              'The manufacturer, software developer, or driver depending on the case',
              'No one'
            ],
            correct: 2,
            explanation: 'Liability in autonomous vehicle crashes could potentially fall on the manufacturer, software developer, or driver, depending on the specific circumstances of the case.'
          },
          {
            question: 'What is an "accountability gap" in AI legal responsibility?',
            options: [
              'When AI systems are fully accountable',
              'When no party is clearly responsible for AI-caused harm',
              'When AI is transparent and explainable',
              'When AI developers are always liable'
            ],
            correct: 1,
            explanation: 'An accountability gap occurs when no party is clearly responsible for AI-caused harm, creating a situation where victims may have no recourse.'
          },
          {
            question: 'Why is transparency important in AI legal accountability?',
            options: [
              'To help AI learn faster',
              'To ensure public trust and determine who is responsible for decisions',
              'To increase AI speed',
              'To prevent AI from working autonomously'
            ],
            correct: 1,
            explanation: 'Transparency is important to ensure public trust and help determine who is responsible for AI decisions, which is crucial for legal accountability.'
          }
        ]
      }
    }
  ]
};
