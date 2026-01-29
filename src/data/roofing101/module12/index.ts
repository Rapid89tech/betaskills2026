import type { Module } from "@/types/course";
import { lesson1WrittenAndPracticalExam } from "./lesson1-written-and-practical-exam";
import { lesson2FinalProjectOnSiteAssignment } from "./lesson2-final-project-onsite-assignment";
import { lesson3FeedbackAndCourseWrapUp } from "./lesson3-feedback-and-course-wrapup";
import { module12Quiz } from "./quiz";

export const module12: Module = {
  id: 12,
  title: "Review and Assessment",
  description: "Comprehensive evaluation of roofing knowledge and skills through exams, projects, and feedback.",
  learningObjectives: [
    "Demonstrate theoretical knowledge through written exams covering materials, codes, and safety protocols.",
    "Showcase practical skills through hands-on assessments and final roofing projects.",
    "Receive comprehensive feedback to identify strengths and areas for improvement.",
    "Complete the course with certification readiness and career guidance."
  ],
  lessons: [
    lesson1WrittenAndPracticalExam,
    lesson2FinalProjectOnSiteAssignment,
    lesson3FeedbackAndCourseWrapUp,
    module12Quiz
  ]
};

export default module12; 