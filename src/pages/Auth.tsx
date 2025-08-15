import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthForm } from '@/components/Auth/AuthForm';

const Auth: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };

    checkUser();
  }, [navigate]);

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <title>Sign In - Phunnel</title>
      <meta name="description" content="Sign in to your Phunnel account to access your AI-powered business platform with CRM, website builder, and invoicing." />
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default Auth;