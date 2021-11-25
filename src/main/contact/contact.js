import React from 'react';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './contact.sass';
// import './contact-media.sass';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='contact-grid'>
                <div className='contact-content'>
                    <div className='contact-text contact-title'>CONTACT</div>
                    <div className='contact-text contact-title contact-title-bottom'>INFORMATION</div>
                    <div className='contact-text contact-tag-line'>Feel free to reach out if you're looking for a developer who is... </div>
                    <div className='contact-text contact-descriptor'></div>
                    <div className='contact-text contact-email'>rlovece@hotmail.co.uk</div>
                    <div className='contact-text'>07722 438346</div>
                </div>
            </div>
        );

    }
}