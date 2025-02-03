'use client'

import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  isHovering: boolean;
  setHovering: (isHovering: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHovering, setHovering] = useState(false);

  return (
    <CursorContext.Provider value={{ isHovering, setHovering }}>
      {children}
    </CursorContext.Provider>
  );
};