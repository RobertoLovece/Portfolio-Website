import React from 'react';

import './main.sass';

import { HomePage } from './homepage/homepage.js'
import Universe from './img/universe.png';

export function Main(props) {

    var styles = {
        left: '-0%'
    }

    return (
        <>
            <div className="main" id="main">
                <HomePage isLoading={props.isLoading} />
                <div className='scroll' id='scroll'>
                    <div className='scroll-content' id='scroll-content'>
                        <div className='scroll-text' />
                        <div className='scroll-img-container'>
                            <img src={Universe} alt='Universe' style={styles}/>
                        </div>
                    </div>
                </div>
                <div className='bottom'>

                </div>
            </div>
        </>

    );

}