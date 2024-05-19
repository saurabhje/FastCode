'use client';
import React, { useRef, useState } from 'react';
import TypingGame from './typingGame';
import Hero
    from './hero';
import { Button } from './ui/button';

type ScrollToTypingGameProps = {
    present: boolean;
};
const isMobile = /iPhone|iPad|iPod|Android/i.test(
    typeof window === "undefined" ? "" : window.navigator.userAgent
  )

const ScrollToTypingGame: React.FC<ScrollToTypingGameProps> = ({ present}) => {
    const typingGameRef = useRef<HTMLDivElement>(null);
    const [explore, setexplore] = useState(isMobile) 

    const handleStartTypingClick = () => {
        if (typingGameRef.current) {
            const navbarHeight = document.querySelector('nav')?.clientHeight || 0;
            window.scrollTo({
                top: typingGameRef.current.offsetTop - navbarHeight,
                behavior: 'smooth',
            });
            typingGameRef.current?.querySelector('input')?.focus();
        }
    };
    const closeTab = () => {
        window.opener = null;
        window.open("", "_self");
        window.close();
      };
    
    return (
        <>
        {explore? 
        <div className='flex flex-col justify-center items-center h-screen gap-4'>
            <p className='text-5xl'>Device not supported</p>
            <p className='text-muted-foreground'>This application is made for typing on computers, please use it on a PC.</p>
            <div className='flex items-center justify-center gap-3'>
                <Button onClick={() => setexplore(true)}>Explore</Button>
                <Button onClick={closeTab}>Close Tab</Button>
            </div>
        </div> 
        :
        <div>
            {!present && <Hero onStartTypingClick={handleStartTypingClick} />}
            <div ref={typingGameRef}>
                <TypingGame present={present} explore={explore}/>
            </div>
        </div>
}
        </>
    );
};


export default ScrollToTypingGame;
