import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { useMember } from './useMember';
import { useAlert } from './useAlert';
import axios from 'axios';

export const useLogin = () => {
  const { login } = useAuth();
  const { addMember } = useMember();
  const { errorAlert } = useAlert();
  
  const getToken = useCallback(async () => {
    try {
      const response = await axios.post('/api/v1/login', {
        username: 'demo/vgunasekaran',
        password: 'Password1',
      });

      if (!response?.data?.token) {
        throw new Error('Login failed');
      }

      login(response.data.token);

      // Get member data
      const memberResponse = await axios.get('/api/v1/members/current');
      addMember(memberResponse.data);
      localStorage.setItem('loyaltyId', memberResponse.data.loyaltyId);

      return response.data.token;
    } catch (error: any) {
      errorAlert(error?.response?.data?.error || error?.message);
      throw error;
    }
  }, [login, addMember, errorAlert]);

  const ensureAuthenticated = useCallback(async () => {
    let token = AuthHelper.getToken();
    if (!token) {
      token = await getToken();
    }
    return token;
  }, [getToken]);

  return {
    getToken,
    ensureAuthenticated
  };
};