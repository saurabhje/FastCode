'use client';
import React, { useRef } from 'react';
import TypingGame from './typingGame';
import Hero
    from './hero';

type ScrollToTypingGameProps = {
    present: boolean;
};

const ScrollToTypingGame: React.FC<ScrollToTypingGameProps> = ({ present }) => {

    const typingGameRef = useRef<HTMLDivElement>(null);

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

    return (
        <div>
            {!present && <Hero onStartTypingClick={handleStartTypingClick} />}
            <div ref={typingGameRef}>
                <TypingGame present={present} />
            </div>
        </div>
    );
};


export default ScrollToTypingGame;
