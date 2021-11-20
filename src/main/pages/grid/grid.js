import React from 'react';
import { Color } from 'three';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './grid.sass';
import './grid-media.sass';

import GridImg0 from './img/rope-grid-big.png';
import GridImg1 from './img/rope-grid-small.png';

import GitHub from '../../../utility/img/github.svg';
export default class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            left: '-100%',
            imgWidth: 0,
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

        window.addEventListener('resize', this.updateOffset);

    }

    updateOffset = () => {

        var containerWidth = document.getElementById('grid-img-container').clientWidth;
        var offset = ((this.state.imgWidth - containerWidth) / 2) * Number(containerWidth < this.state.imgWidth);
        this.setState({ left: '-' + offset + 'px' })

        if (containerWidth <= 900) {
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

        gsap.fromTo('.grid-github', { opacity: 0 }, {
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

        var test = false;

        if (!this.props.isLoading && test) {
            ScrollTrigger.create({
                trigger: document.getElementById('grid-content'),
                // markers: true,
                start: 'top +20%',

                onEnter: () => {
                    gsap.to(this.props.scene.background, new Color(0x403d39))
                    gsap.to(this.props.bloomPass, { threshold: 1 })
                },

                onLeaveBack: () => {
                    gsap.to(this.props.scene.background, new Color(0x000))
                    gsap.to(this.props.bloomPass, { threshold: 0 })
                },
            })
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

        return (
            <div className='grid-content' id='grid-content'>
                <div className='grid-text'>
                    An interactive Verlet integration rope-like grid created with JavaScript using WebGL. Drag the mouse/pointer across the screen to cut ropes. Click onto a point to toggle whether it's locked or not.
                </div>
                <div
                    className='grid-img-container'
                    id='grid-img-container'
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <a href='https://robertolovece.github.io/Rope-Grid/'
                        target='_blank'
                        rel='noreferrer'>
                        <img src={this.images[this.state.imgNumber]} id='grid-img' alt='Rope-Grid' style={imgStyle}
                            onLoad={this.onLoad}
                        />
                        <div className='grid-img-number'>
                            04
                        </div>
                    </a>
                    <a
                        className='github'
                        href='https://github.com/RobertoLovece/Rope-Grid'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <GitHub
                            className='grid-github'
                            onMouseEnter={this.onMouseLeave}
                            onMouseLeave={this.onMouseEnter}
                        />
                    </a>
                </div>
                <a href='https://robertolovece.github.io/Rope-Grid/'
                    target='_blank'
                    rel='noreferrer'>
                    <div className='grid-img-title'
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    >
                        ROPEGRID
                    </div>
                </a>
            </div>
        );
    }
}