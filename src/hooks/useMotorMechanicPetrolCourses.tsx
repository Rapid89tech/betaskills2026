
import { useState, useEffect } from 'react';
import { motorMechanicPetrolCourse } from '@/data/motorMechanicPetrol/index';

export const useMotorMechanicPetrolCourses = () => {
  const [courses, setCourses] = useState([motorMechanicPetrolCourse]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setLoading(false);
  }, []);

  return { courses, loading };
};
