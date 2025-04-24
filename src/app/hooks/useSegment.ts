import { useCallback } from 'react';
import api from '../utils/api';
import { useAlert } from './useAlert';
import { Segment } from '../models/segment';

export const useSegment = () => {
  const { errorAlert } = useAlert();

  const getAllSegments = useCallback(async (query: string = '', limit: number = 10) => {
    try {
      const response = await api.get<Segment[]>(`/api/v1/segments`, {
        params: { limit, query }
      });
      return response.data;
    } catch (error: any) {
      errorAlert(error.message);
      throw error;
    }
  }, [errorAlert]);

  const getMemberSegments = useCallback(async (limit: number = 10, query: string) => {
    try {
      const response = await api.get<Segment[]>(`/api/v1/membersegments`, {
        params: { limit, query }
      });
      return response.data;
    } catch (error: any) {
      errorAlert(error.message);
      throw error;
    }
  }, [errorAlert]);

  const addMemberSegment = useCallback(async (memberId: string, segmentId: string) => {
    try {
      const payload = {
        member: memberId,
        segment: segmentId,
        ext: {}
      };
      const response = await api.post('/api/v1/membersegments', payload);
      return response.data;
    } catch (error: any) {
      errorAlert(error.message);
      throw error;
    }
  }, [errorAlert]);

  const deleteMemberSegment = useCallback(async (id: string) => {
    try {
      const response = await api.delete(`/api/v1/membersegments/${id}`);
      return response.data;
    } catch (error: any) {
      errorAlert(error.message);
      throw error;
    }
  }, [errorAlert]);

  return {
    getAllSegments,
    getMemberSegments,
    addMemberSegment,
    deleteMemberSegment
  };
};