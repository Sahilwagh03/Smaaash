'use client'
import React, { createContext, useState, ReactNode } from 'react';
import gsap from 'gsap';

// Define the shape of the context value
interface TimelineContextType {
    globalTimeline: gsap.core.Timeline;
    setGlobalTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline>>;
}

// Create the context with the defined type
export const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

// Define the props for the TimelineProvider
interface TimelineProviderProps {
    children: ReactNode;
}

export const TimelineProvider: React.FC<TimelineProviderProps> = ({ children }) => {
    const [globalTimeline, setGlobalTimeline] = useState<gsap.core.Timeline>(gsap.timeline({ paused: true }));

    return (
        <TimelineContext.Provider value={{ globalTimeline, setGlobalTimeline }}>
            {children}
        </TimelineContext.Provider>
    );
};