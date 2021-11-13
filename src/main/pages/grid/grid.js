import React from 'react';
import { Color } from 'three';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './grid.sass';
import './grid-media.sass';
import GridImg0 from './img/grid.png';
import GridImg1 from '../universe/img/universe.png';

export default class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            left: '-100%',
            imgWidth: 0,
            imgHeight: '0px',
            hovered: false,
            imgNumber: 0
        }

        this.images = [
            GridImg0,
            GridImg1
        ]
    }

    onLoad = () => {

        this.setState({ imgWidth: document.getElementById('grid-img').clientWidth })
        var height = document.getElementById('grid-img').clientHeight;
        this.setState({ imgHeight: height + 'px' })

        window.addEventListener('resize', this.updateOffset);

    }

    updateOffset = () => {

        var containerWidth = document.getElementById('grid-img-container').clientWidth;
        var offset = ((this.state.imgWidth - containerWidth) / 2) * Number(containerWidth < this.state.imgWidth);
        this.setState({ left: '-' + offset + 'px' })

        if (containerWidth <= 850) {
            this.setState({ imgNumber: 1 })
        } else {
            this.setState({ imgNumber: 0 })
        }

    };

    componentDidMount() {

        this.initAnimations();

    }

    initAnimations() {

        gsap.timeline({
            scrollTrigger: {
                trigger: '.grid-img-container',
                start: 'top 100%',
                end: 'center 50%',
                scrub: true
            }
        }).to('.grid-img-container', { opacity: 1 }, 0)


        gsap.fromTo('.grid-img-title', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.grid-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }

        })

        gsap.fromTo('.grid-img-number', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.grid-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }
        })

        gsap.fromTo('.grid-text', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.grid-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }
        })

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateOffset);
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.imgHeight !== this.state.imgHeight) {
            gsap.to('#grid-img', { x: this.state.left, duration: 0.3, paused: true });
        }

        if (prevState.imgWidth !== this.state.imgWidth) {
            this.updateOffset();
        }
    }

    onMouseEnter = () => {
        this.setState({ hovered: true });
    };

    onMouseLeave = () => {
        this.setState({ hovered: false });
    };

    render() {

        const { hovered } = this.state;

        const left = this.state.left;
        const imgStyle = hovered ? { transition: 'transform 0.3s ease-out', transform: 'translateX(' + left + ') scale(1.05)' } :
            { transform: 'translateX(' + left + ')' };

        const height = this.state.imgHeight;
        const titleStyle = { height: height };

        return (
            <div className='grid-content' id='grid-content'>
                <div className='grid-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur facilis quibusdam error magni eaque incidunt. Recusandae earum repudiandae ex ad.
                </div>
                <div className='grid-img-container' id='grid-img-container'>
                    <img src={ this.images[this.state.imgNumber] } id='grid-img' alt='Grid' style={imgStyle}
                        onLoad={this.onLoad}
                    />
                </div>
                <a href='https://robertolovece.github.io/Three.js-Rope-Physics/'
                    target='_blank'
                    rel='noreferrer'
                    className='grid-img-title-container'
                    id='grid-img-title-container'
                    style={titleStyle}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <div className='grid-img-title'>
                        GRID    
                    </div>
                    <div className='grid-img-number'>
                        04
                    </div>
                </a>
            </div>
        );
    }
}