import './index.css';
import {css} from '@emotion/react';
import React from 'react';
import {useBoundStore} from '../../store';

const CLOCK_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

type ClockProps = {
  radius: number;
} & React.ComponentPropsWithoutRef<'div'>;

const Clock = ({radius, ...props}: ClockProps) => {
  const {second, minute, hour, updateTime} = useBoundStore();
  const secondAngle = (second / 60) * 360;
  const minuteAngle = (minute / 60) * 360;
  const hourAngle = (hour / 12) * 360;

  const clockRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const currentSeconds = now.getSeconds();
      const currentMinutes = now.getMinutes();
      const currentHours = now.getHours();

      updateTime(currentSeconds, currentMinutes, currentHours);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (clockRef.current) {
      clockRef.current.style.setProperty('--second-angle', `${secondAngle}deg`);
      clockRef.current.style.setProperty('--minute-angle', `${minuteAngle}deg`);
      clockRef.current.style.setProperty('--hour-angle', `${hourAngle}deg`);
    }
  }, [secondAngle, minuteAngle, hourAngle]);

  return (
    <div
      className="clock"
      ref={clockRef}
      data-clock-body="true"
      css={css`
        position: relative;
        height: ${`${radius * 2}px`};
        width: ${`${radius * 2}px`};
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid black;
        border-radius: 50%;
      `}
      {...props}>
      <div
        className="hour"
        css={css`
          position: absolute;
          width: ${`${radius * 2}px`};
          height: ${`${radius * 2}px`};
          ::before {
            content: '';
            position: absolute;
            width: 8px;
            height: 50px;
            background: black;
            left: 50%;
            z-index: 10;
            border-radius: 6px 6px 0 0;
            transform: translate(-50%, 50px);
          }
        `}
      />
      <div
        className="minute"
        css={css`
          position: absolute;
          width: ${`${radius * 2}px`};
          height: ${`${radius * 2}px`};
          ::before {
            content: '';
            position: absolute;
            width: 6px;
            height: 70px;
            background: gray;
            left: 50%;
            z-index: 20;
            border-radius: 6px 6px 0 0;
            transform: translate(-50%, 30px);
          }
        `}
      />
      <div
        className="second"
        css={css`
          position: absolute;
          width: ${`${radius * 2}px`};
          height: ${`${radius * 2}px`};
          ::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 80px;
            background: red;
            left: 50%;
            z-index: 30;
            border-radius: 6px 6px 0 0;
            transform: translate(-50%, 20px);
          }
        `}
      />
      {CLOCK_NUMBERS.map(number => {
        const angle = (number / 12) * 2 * Math.PI - Math.PI / 2;
        const distanceFromCenter = radius - 10;
        const numberPosX = distanceFromCenter * Math.cos(angle) + radius;
        const numberPosY = distanceFromCenter * Math.sin(angle) + radius;

        return (
          <div
            key={number}
            css={css`
              color: #b6b1a6;
              font-weight: bold;
              position: absolute;
              left: ${`${numberPosX}px`};
              top: ${`${numberPosY}px`};
              transform: translate(-50%, -50%);
            `}>
            {number}
          </div>
        );
      })}
    </div>
  );
};

export default Clock;
