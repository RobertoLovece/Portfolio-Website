import React from 'react';

import './main.sass';

import { HomePage } from './homepage/homepage.js'

export function Main(props) {

    return (
        <>
            <div className="main" id="main">
                <HomePage isLoading={props.isLoading} />
                <div className='scroll'>
                    <div className='scroll-content'>
                        <div className='image1' />
                        <div className='image2' />
                        <div className='image3' />
                    </div>
                </div>
                <div className='bottom'>

                </div>
            </div>
        </>

    );

}