
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';

const Signup = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the unified auth page
    navigate('/auth');
  }, [navigate]);

  return <Auth />;
};
