import React, { createContext, useState } from 'react';

export const TimerServiceContext = createContext();

export const TimerService = ({children}) => {
  const [dropdown, setDropdown] = useState(false);
  const [timers, setTimers] = useState([]);

  const toggleDropdown = () => setDropdown((state) => !state);
  const addTimer = (timer) => setTimers((state) => [...state, timer]);

  return (
    <TimerServiceContext.Provider value={{
      dropdown,
      toggleDropdown,
      timers,
      addTimer,
    }}>
      {children}
    </TimerServiceContext.Provider>
  );
};