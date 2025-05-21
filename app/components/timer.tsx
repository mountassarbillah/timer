'use client'

import { useState, useEffect } from 'react';
import AlarmOnToggle from './alarm';

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const adjustTime = (type: 'hours' | 'minutes' | 'seconds', delta: number) => {
    if (isRunning) return;
    if (type === 'hours') setHours((prev) => Math.max(0, prev + delta));
    if (type === 'minutes') setMinutes((prev) => Math.max(0, prev + delta));
    if (type === 'seconds') setSeconds((prev) => Math.max(0, prev + delta));
  };

  const startTimer = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total <= 0) return;
    setRemainingTime(total);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setRemainingTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const format = (num: number) => String(num).padStart(2, '0');

  const displayTime = () => {
    const hrs = Math.floor(remainingTime / 3600);
    const mins = Math.floor((remainingTime % 3600) / 60);
    const secs = remainingTime % 60;
    return { hrs, mins, secs };
  };

  const { hrs, mins, secs } = displayTime();

  return (
    <div className='h-screen pt-[20vh] bg-black'>
    <div className="text-center font-sans space-y-6 w-full flex-col justify-center items-center">

      {!isRunning ? (
        <div className="flex justify-center gap-60 text-[20vh] mt-[5vh]">
          {['hours', 'minutes', 'seconds'].map((unit) => {
            const value =
              unit === 'hours' ? hours : unit === 'minutes' ? minutes : seconds;
            return (
              <div key={unit} className="flex flex-col items-center -translate-x-17">
                <button className="text-xl translate-x-17" onClick={() => adjustTime(unit as any, 1)}>▲</button>
                <span className="w-12">{format(value)}</span>
                <button className="text-xl text-center translate-x-17" onClick={() => adjustTime(unit as any, -1)}>▼</button>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex fixed justify-center left-[20vw] translate-y-80 text-[20vh] font-sans gap-4 tracking-widest">
          <p>{format(hrs)}</p>: <p>{format(mins)}</p>: <p>{format(secs)}</p>
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!isRunning && (
          <button
            className="px-10 py-3 bg-[#F06F71] text-[22px] text-white rounded-full mt-[5vh] hover:bg-red-500"
            onClick={startTimer}
          >
            Start
          </button>
        )}
      </div>
    </div>
     {isRunning && ( <video
  src="/INGENEER1.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="fixed top-[10vh] left-[40vw] h-[40vh] w-[40vh] mt-10"
/>) }

    <AlarmOnToggle isActive={isRunning}/>

    </div>
  );



};

export default CountdownTimer;
