import React from 'react';
import {useBoundStore} from '../store';

const useCursor = (
  targetRef: React.MutableRefObject<HTMLElement | null>,
  validateFunc: (x: number, y: number) => boolean
) => {
  const {updateDisplayItem, updateCursorPosition} = useBoundStore();

  const handleMouseMove = (event: MouseEvent) => {
    if (!targetRef.current) {
      return;
    }
    const {clientX: cursorX, clientY: cursorY} = event;
    updateCursorPosition(cursorX, cursorY);

    const rect = targetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = cursorX - centerX;
    const mouseY = cursorY - centerY;
    const isValidate = validateFunc(mouseX, mouseY);

    updateDisplayItem(isValidate);
  };
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

export default useCursor;
