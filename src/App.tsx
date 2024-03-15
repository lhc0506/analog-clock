import './App.css';
import React from 'react';
import Clock from './components/Clock';
import CursorTooltip from './components/CursorTooltip';
import {useBoundStore} from './store';
import useCursor from './hooks/useCursor';
import {isInsideCircle} from './utils/utils';

const CLOCK_RADIUS = 100;

function App() {
  const {hour, minute, second} = useBoundStore();

  const clockContainerRef = React.useRef<HTMLDivElement | null>(null);
  useCursor(clockContainerRef, (x: number, y: number) => isInsideCircle(x, y, CLOCK_RADIUS));

  return (
    <>
      <div ref={clockContainerRef}>
        <Clock radius={CLOCK_RADIUS} />
      </div>
      <CursorTooltip content={<div>{`currentTime: ${hour}: ${minute}: ${second}`}</div>} />
    </>
  );
}

export default App;
