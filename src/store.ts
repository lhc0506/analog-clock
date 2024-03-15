import {StateCreator, create} from 'zustand';

type PositionSlice = {
  cursorX: number;
  cursorY: number;
  shouldDisplayItem: boolean;
  updateCursorPosition: (cursorX: number, cursorY: number) => void;
  updateDisplayItem: (displayCursor: boolean) => void;
};

type TimeSlice = {
  second: number;
  minute: number;
  hour: number;
  updateTime: (second: number, minute: number, hour: number) => void;
};

type BoundSlice = PositionSlice & TimeSlice;

const createCursorSlice: StateCreator<BoundSlice, [], [], PositionSlice> = set => ({
  cursorX: 0,
  cursorY: 0,
  shouldDisplayItem: false,
  updateCursorPosition: (cursorX, cursorY) => set(() => ({cursorX, cursorY})),
  updateDisplayItem: shouldDisplayItem => set(() => ({shouldDisplayItem})),
});

const createTimeSlice: StateCreator<BoundSlice, [], [], TimeSlice> = set => {
  const now = new Date();

  return {
    second: now.getSeconds(),
    minute: now.getMinutes(),
    hour: now.getHours(),
    updateTime: (second, minute, hour) => set(() => ({second, minute, hour})),
  };
};

export const useBoundStore = create<BoundSlice>()((...a) => ({
  ...createCursorSlice(...a),
  ...createTimeSlice(...a),
}));
