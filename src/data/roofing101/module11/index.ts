import type { Module } from "@/types/course";
import lesson1OnSiteAndLabBasedProjects from "./lesson1-on-site-and-lab-based-projects";
import { lesson2SimulatedInstallations } from "./lesson2-simulated-installations";
import { lesson3SafetyDrillsAndToolHandling } from "./lesson3-safety-drills-and-tool-handling";
import { lesson4TeamBasedRepairChallenges } from "./lesson4-team-based-repair-challenges";
import { module11Quiz } from "./quiz";

export const module11: Module = {
  id: 11,
  title: "Hands-on Practicum",
  description: "Building practical roofing skills through real and simulated projects.",
  learningObjectives: [
    "Execute on-site and lab-based roofing projects to develop practical skills in material installation, safety protocols, and project management under real or controlled conditions.",
    "Perform simulated installations of various roof types to master techniques, troubleshoot issues, and ensure quality craftsmanship in a risk-free environment.",
    "Conduct safety drills and practice proper tool handling to enhance workplace safety, prevent accidents, and comply with OSHA standards.",
    "Engage in team-based repair challenges to build collaboration, problem-solving, and communication skills, preparing for efficient and safe real-world repairs."
  ],
  lessons: [
    lesson1OnSiteAndLabBasedProjects,
    lesson2SimulatedInstallations,
    lesson3SafetyDrillsAndToolHandling,
    lesson4TeamBasedRepairChallenges,
    module11Quiz
  ]
};

export default module11;
