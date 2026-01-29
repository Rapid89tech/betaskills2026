import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Inspecting and Replacing Air Filters</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Purpose of Air Filters</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/wfTtnTiRzEo?si=W_CajPdg566h27i4</p>
            </div>
            <p className="text-gray-700 mb-4">
              Air filters prevent contaminants like dust, dirt, and insects from entering the combustion chamber, ensuring clean air mixes with fuel for efficient combustion. They protect engine components like pistons and cylinders from abrasive wear, improve fuel economy, and reduce emissions. A clogged filter restricts airflow, reducing power, increasing fuel consumption, and potentially triggering a check engine light. For example, in dusty South African regions like the Karoo, filters may clog faster, requiring frequent checks.
            </p>
            <p className="text-gray-700">
              Learners will explore filter roles through virtual simulations, adjusting airflow to observe combustion effects. Mechanics mastering air filter maintenance can optimize engine performance, ensuring client vehicles run efficiently. The AI voice tutor can explain filter impacts on emissions or diagnose performance issues from clogged filters, providing actionable insights.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Checking Air Filter Condition</h3>
            <p className="text-gray-700 mb-4">
              Air filters should be inspected every 20,000–25,000 kilometres or more frequently in dusty conditions. By removing the filter from its housing and holding it to light, mechanics can assess clogs; if light is blocked, replacement is needed. Debris like leaves or oil stains indicates contamination, potentially from a breather system issue.
            </p>
            <p className="text-gray-700">
              Learners will practice inspections in virtual scenarios, identifying signs like heavy dirt buildup or structural damage. Regular checks prevent reduced airflow, which can cause sluggish acceleration or black exhaust smoke. This skill enables mechanics to diagnose performance issues early, maintaining engine efficiency. The AI voice tutor can guide learners through inspection techniques or spotting contamination signs, ensuring accurate maintenance decisions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Replacing Air Filters</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/2X9UNdHgZVk?si=4vi1T_xXuGEyKg-i</p>
            </div>
            <p className="text-gray-700 mb-4">
              Replacing an air filter involves removing the old filter, cleaning the housing to remove debris, and installing a new filter matching the vehicle's specifications. A snug fit and sealed housing prevent unfiltered air from bypassing the filter, which could damage engine components. The process is quick, typically taking 5–10 minutes, but critical for maintaining airflow.
            </p>
            <p className="text-gray-700">
              Learners will simulate replacements, ensuring proper orientation and housing seals. Incorrect installation can lead to dust ingestion, causing cylinder wear. Mechanics mastering this task can perform cost-effective services, enhancing vehicle performance and client satisfaction. The AI voice tutor can guide learners on selecting compatible filters or troubleshooting air leaks, ensuring reliable maintenance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Types of Air Filters</h3>
            <p className="text-gray-700 mb-4">
              Air filters include paper filters (disposable, common in most vehicles), cotton gauze filters (e.g., K&N, reusable, high-performance), and foam filters (used in off-road vehicles for enhanced dust filtration). Each type balances filtration efficiency and airflow; paper filters prioritize filtration, while cotton gauze enhances performance but requires regular cleaning.
            </p>
            <p className="text-gray-700">
              Learners will compare filter types in virtual simulations, assessing suitability for conditions like urban Johannesburg versus rural dirt roads. Choosing the wrong filter can compromise performance or engine protection. Mechanics mastering filter selection can tailor maintenance to vehicle needs, optimizing efficiency. The AI voice tutor can explain filter maintenance or suitability for specific driving conditions, enhancing decision-making.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Signs of a Failing Air Filter</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/imGuSsGg92E?si=jNE2o_Gl16EBZkA0</p>
            </div>
            <p className="text-gray-700 mb-4">
              A failing air filter causes reduced engine performance, poor fuel economy (e.g., 10–15% mileage drop), sluggish acceleration, black exhaust smoke, or a check engine light due to improper air-fuel ratios. In severe cases, contaminants can score cylinders, leading to costly repairs.
            </p>
            <p className="text-gray-700">
              Learners will diagnose these symptoms in virtual scenarios, linking issues like misfires to clogged filters. Regular checks, especially in dusty environments, prevent such problems. Mechanics mastering this can address client complaints like reduced power, ensuring engine health and compliance with emissions standards. The AI voice tutor can guide learners through diagnosing filter issues or interpreting related error codes, improving troubleshooting accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson4_2: Lesson = {
  id: '4.2',
  title: 'Inspecting and Replacing Air Filters',
  content: LessonContent,
  duration: 30,
  objectives: [
    "Understand the purpose and importance of air filters in engine operation",
    "Master air filter inspection techniques and condition assessment",
    "Execute proper air filter replacement procedures",
    "Identify different types of air filters and their applications",
    "Diagnose symptoms of failing air filters"
  ],
  keyTerms: [
    "Air filter housing",
    "Airflow restriction",
    "Paper filters",
    "Cotton gauze filters",
    "Foam filters",
    "Filter bypass",
    "Combustion efficiency",
    "Air-fuel ratio"
  ]
};