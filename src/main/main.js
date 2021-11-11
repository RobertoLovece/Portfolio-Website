import React from 'react';

import './main.sass';

import {HomePage} from './pages/homepage/homepage.js'
import Universe from './pages/universe/universe.js';
import Mountain from './pages/mountain/mountain.js';

export function Main(props) {
    return (
        <>
            <HomePage
                isLoading = { props.isLoading }
                camera = { props.camera }
                atmosphere = { props.atmosphere }
            />
            <div className='universe' id='universe'>
                <Universe 
                    isLoading = { props.isLoading }
                    scene = { props.scene }
                    bloomPass = { props.bloomPass }
                />
            </div>
            <div className='mountain' id='mountain'>
                <Mountain 
                    isLoading = { props.isLoading }
                    scene = { props.scene }
                    bloomPass = { props.bloomPass }
                />
            </div>
            <div className='bottom' />
        </>

    );
}