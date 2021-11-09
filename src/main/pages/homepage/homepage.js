import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './homepage.sass'

export function HomePage(props) {
    return (
        <div className='homepage-grid' id="homepage">
            <CSSTransition
                in = { !props.isLoading }
                timeout = {5000}
                classNames = 'homepage-name'
                exit = {false}
            >
            <div className='homepage-name'>
                ROBERTO LOVECE
            </div>
            </CSSTransition>
            <div className='homepage-bottom'></div>
        </div>
    );
}