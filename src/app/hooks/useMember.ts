import { create } from 'zustand';
import { Member } from '../models/member';

interface MemberState {
  member: Member | null;
  addMember: (member: Member) => void;
  clearMember: () => void;
}

export const useMember = create<MemberState>((set) => ({
  member: null,
  addMember: (member) => set({ member }),
  clearMember: () => set({ member: null })
}));