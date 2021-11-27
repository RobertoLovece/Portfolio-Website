import React from 'react';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './contact.sass';
// import './contact-media.sass';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
    }

    onMouseEnter = function () {
        console.log('enter')
    }.bind(this);

    onMouseLeave = function () {
        console.log('leave')
    }.bind(this);

    render() {

        return (
            <div className='contact-grid'>
                <div className='contact-content'>
                    <div className='contact-text contact-title'>CONTACT</div>
                    <div className='contact-text contact-title contact-title-bottom'>INFORMATION</div>
                    <div className='contact-text contact-subtitle contact-tag-line'>If you're looking for a developer who is... </div>
                    <div className='contact-text contact-subtitle contact-descriptor'>CREATIVE</div>
                    <div className='contact-text contact-subtitle contact-descriptor'>DEDICATED</div>
                    <div className='contact-text contact-subtitle contact-descriptor'>FAST-LEARNING</div>
                    <div className='contact-detail-container'>
                        <div className='contact-text contact-subtitle contact-email'>
                            <a
                                className='contact-underline'
                                href='mailto: rlovece@hotmail.co.uk'
                                target='_blank'
                                rel='noreferrer'
                            >
                                rlovece@hotmail.co.uk
                            </a>
                        </div>
                        <div className='contact-text contact-subtitle contact-number'>
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
}