import { useCallback, useState } from 'react';
import api from '../utils/api';
import { useAlert } from './useAlert';
import { Coupon, CouponList } from '../models/coupon';

export const useActivity = () => {
  const { errorAlert } = useAlert();
  const [streakCache, setStreakCache] = useState<any>(null);

  const getPerks = useCallback(async () => {
    try {
      const response = await api.get<Coupon[]>('/api/v1/rewardPolicy');
      return response.data;
    } catch (error: any) {
      errorAlert(error.message);
      throw error;
    }
  }, [errorAlert]);

  const getCoupons = useCallback(async () => {
    try {
      const response = await api.get<Coupon[]>('/api/v1/rewardPolicies');
      return response.data;
    } catch (error: any) {
      errorAlert(error.message);
      throw error;
    }
  }, [errorAlert]);

  const getCouponList = useCallback(async (id: string) => {
    try {
      const response = await api.get<CouponList[]>('/api/v1/rewards', { 
        params: { query: id } 
      });
      return response.data;
    } catch (error: any) {
      errorAlert(error.message);
      throw error;
    }
  }, [errorAlert]);

  const getActivity = useCallback(async (payload: any, persist = false) => {
    const defaultValues = {
      srcChannelType: 'Web',
      loyaltyID: localStorage.getItem('loyaltyId')
    };

    const url = `/api/v1/activity?filter=data,error?persist=${persist}`;

    try {
      if (Array.isArray(payload)) {
        const promises = payload.map(item =>
          api.post(url, { ...item, ...defaultValues })
        );
        return await Promise.all(promises);
      } else {
        const response = await api.post(url, { ...payload, ...defaultValues });
        return response.data;
      }
    } catch (error: any) {
      errorAlert(error.message);
      throw error;
    }
  }, [errorAlert]);

  const getStreakPolicy = useCallback(async () => {
    if (!streakCache) {
      try {
        const response = await api.get('/api/v1/streakPolicies', {
          params: {
            select: 'name,description,goalPolicies,timeLimit,ext'
          }
        });
        setStreakCache(response.data);
        return response.data;
      } catch (error: any) {
        setStreakCache(null);
        errorAlert(error.message);
        throw error;
      }
    }
    return streakCache;
  }, [streakCache, errorAlert]);

  return {
    getPerks,
    getCoupons,
    getCouponList,
    getActivity,
    getStreakPolicy
  };
};