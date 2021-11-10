import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './homepage.sass'

export function HomePage(props) {

    React.useEffect(() => {
        if (!props.isLoading) {

            var container = document.getElementById('homepage');
            var maxHeight = (container.clientHeight || container.offsetHeight) - window.innerHeight;

            gsap.to(props.camera.position, {
                y: -3.2,
                ease: 'none',
                scrollTrigger:
                {
                    trigger: container,
                    start: 'top top',
                    end: maxHeight,
                    pin: false,
                    scrub: true
                },
            })

            gsap.to(props.atmosphere.position, {
                y: 0.3,
                ease: 'none',
                scrollTrigger:
                {
                    trigger: container,
                    start: 'top top',
                    end: maxHeight,
                    pin: false,
                    scrub: true,
                },
            })



            // gsap.fromTo('.homepage-name', { opacity: 1 }, {
            //     opacity: 0,
            //     scrollTrigger: {
            //         markers: true,
            //         trigger: '.homepage-grid',
            //         start: 'center 40%',
            //         end: 'bottom 90%',
            //         scrub: true
            //     }
    
            // })
            
        }
    }, [props.isLoading]);

    return (
        <div className='homepage-grid' id="homepage">
            <CSSTransition
                in = { !props.isLoading }
                timeout = { 5000 }
                classNames = 'homepage-name'
                exit = { false }
            >
                <div className='homepage-name'>
                    ROBERTO LOVECE
                </div>
            </CSSTransition>
            <div className='homepage-bottom'></div>
        </div>
    );
}