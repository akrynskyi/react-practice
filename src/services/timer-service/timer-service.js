import React, { createContext, useState } from 'react';

export const TimerServiceContext = createContext();

export const TimerService = ({children}) => {
  const [form, setForm] = useState(false);

  const toggleForm = () => setForm(state => !state);

  return (
    <TimerServiceContext.Provider value={{
      form,
      toggleForm
    }}>
      {children}
    </TimerServiceContext.Provider>
  );
};