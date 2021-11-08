import React, { useState, useEffect, useRef, useCallback } from 'react';

import './app.sass';

import { Canvas } from './canvas/canvas.js'
import Main from './main/main.js'
import { useWindowSize } from './hooks/hooks.js'

require('normalize.css/normalize.css');

export function App() {

    const [isLoading, setLoading] = useState(true);

    const size = useWindowSize();
    const data = {
        ease: 0.0,
        curr: 0,
        prev: 0,
        rounded: 0,
    }

    const containerRef = useRef();

    // const setBodyHeight = () => {
    //     document.body.style.height = 
    //         containerRef.current.getBoundingClientRect().height + 'px';
    // }

    // useEffect(() => {
    //     setBodyHeight();
    // }, [size.height]);

    const smoothScroll = useCallback(() => {

        data.curr = window.scrollY;
        data.prev += (data.curr - data.prev) * data.ease;
        data.rounded = Math.round(data.prev * 100) / 100;

        containerRef.current.style.transform = 'translateY(' + -data.rounded + 'px)'
        requestAnimationFrame(() => smoothScroll());

    }, [data]);

    useEffect(() => {
        setLoading(false)
        requestAnimationFrame(() => smoothScroll());
    }, []);

    return (
        <>
            <Canvas />
            <div className='main' ref={containerRef}>
                <Main isLoading={isLoading} />
            </div>
            {/* <Nav/> */ }
        </>
    );
}