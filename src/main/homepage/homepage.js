import React from 'react';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './homepage.sass'

export function HomePage(props) {

    React.useEffect(() => {
        if (!props.isLoading) {

            var container = document.getElementById('homepage');
            // var maxHeight = (container.clientHeight || container.offsetHeight) - window.innerHeight;
            // console.log(maxHeight)

            gsap.to(props.camera.position, {
                y: -3.2,
                ease: 'none',
                scrollTrigger:
                {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
            });

            gsap.to(props.atmosphere.position, {
                y: 0.3,
                ease: 'none',
                scrollTrigger:
                {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            var timeline = gsap.timeline();
            timeline.fromTo('.homepage-name', { opacity: 0 }, { opacity: 1, duration: 5, ease: 'power1.out' });
            timeline.fromTo('.homepage-name', { opacity: 1 }, {
                opacity: 0,
                scrollTrigger: {
                    trigger: '.homepage-grid',
                    start: 'center 50%',
                    end: 'bottom 70%',
                    scrub: true
                }
    
            });

        }
    }, [props.isLoading]);

    return (
        <div className='homepage-grid' id="homepage">
            <div className='homepage-name'>
                ROBERTO LOVECE
            </div>
            <div className='homepage-bottom'></div>
        </div>
    );
}