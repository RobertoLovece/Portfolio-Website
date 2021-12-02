import React from 'react';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './contact.sass';
import './contact-media.sass';

export function Contact(props) {
    React.useEffect(() => {
        if (!props.isLoading) {

            var container = document.getElementById('contact');

            gsap.to(props.skull.position, {
                y: -3.4,
                ease: 'out',
                scrollTrigger:
                {
                    trigger: container,
                    start: 'top 80%',
                    end: 'center 50%',
                    scrub: true
                },
            });

            var timeline = gsap.timeline();
            timeline.fromTo('.contact-content', { opacity: 0 }, {
                ease: 'in',
                opacity: 1,
                scrollTrigger: {
                    trigger: container,
                    start: 'top 50%',
                    end: 'center 50%',
                    scrub: true
                }
    
            });
        }
    }, [props.isLoading]);

    return (
        <div className='contact-grid' id='contact'>
            <div className='contact-content'>
                <div className='contact-text contact-title'>CONTACT</div>
                <div className='contact-text contact-title contact-title-bottom'>INFORMATION</div>
                <div className='contact-text contact-subtitle contact-tag-line'>If you're looking for a <b>developer</b> who is... </div>
                <ul className='contact-descriptor-container'>
                    <li className='contact-text contact-subtitle contact-descriptor'>FAST-LEARNING</li>
                    <li className='contact-text contact-subtitle contact-descriptor'>DEDICATED</li>
                    <li className='contact-text contact-subtitle contact-descriptor'>CREATIVE</li>
                </ul>
                <div className='contact-detail-container'>
                    <div className='contact-text contact-title contact-email'>
                        <a
                            className='contact-underline'
                            href='mailto: rlovece@hotmail.co.uk'
                            target='_blank'
                            rel='noreferrer'
                        >
                            rlovece@hotmail.co.uk
                        </a>
                    </div>
                    <div className='contact-text contact-title contact-number'>
                        <a
                            className='contact-underline'
                            href='tel:+447722438346'
                            target='_blank'
                            rel='noreferrer'
                        >
                            +44 7722 438346
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );


}