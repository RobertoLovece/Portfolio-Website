import React from 'react';
import { Color } from 'three';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './mountain.sass';
import './mountain-media.sass';
import MountainImg from '../img/mountain.png';
import GitHub from '../img/github.svg';
export default class Mountain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            left: '-100%',
            imgWidth: 0,
            hovered: false
        }
    }

    onLoad = () => {

        this.setState({ imgWidth: document.getElementById('mountain-img').clientWidth })

        window.addEventListener('resize', this.updateOffset);

        this.updateOffset();

    }

    updateOffset = () => {

        var containerWidth = document.getElementById('mountain-img-container').clientWidth;
        var offset = ((this.state.imgWidth - containerWidth) / 2) * Number(containerWidth < this.state.imgWidth);
        this.setState({ left: '-' + offset + 'px' })

    };

    componentDidMount() {

        this.initAnimations();

    }

    initAnimations() {

        gsap.timeline({
            scrollTrigger: {
                trigger: '.mountain-img-container',
                start: 'top 100%',
                end: 'center 50%',
                scrub: true
            }
        }).to('.mountain-img-container', { opacity: 1 }, 0)


        gsap.fromTo('.mountain-img-title', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.mountain-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }

        })

        gsap.fromTo('.mountain-img-number', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.mountain-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }
        })

        gsap.fromTo('.mountain-github', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.mountain-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }
        })

        gsap.fromTo('.mountain-text', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.mountain-img-container',
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
                trigger: document.getElementById('mountain-content'),
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
            <div className='mountain-content' id='mountain-content'>
                <div className='mountain-text'>
                A procedurally generated mountain made with Fractional Brownian motion. Has adjustable fog and snow. Due to high polygon count may struggle to run on lower-end devices. Created with JavaScript using WebGL.
                </div>
                <div
                    className='mountain-img-container'
                    id='mountain-img-container'
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <a href='https://robertolovece.github.io/Mountain/'
                        target='_blank'
                        rel='noreferrer'>
                        <img src={MountainImg} id='mountain-img' alt='Mountain' style={imgStyle}
                            onLoad={this.onLoad}
                        />
                        <div className='mountain-img-number'>
                            02
                        </div>
                    </a>
                    <a
                        className='github'
                        href='https://github.com/RobertoLovece/Mountain'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <GitHub 
                            className='mountain-github' 
                            onMouseEnter={this.onMouseLeave}
                            onMouseLeave={this.onMouseEnter}
                        />
                    </a>
                </div>
                <a href='https://robertolovece.github.io/Mountain/'
                    target='_blank'
                    rel='noreferrer'>
                    <div className='mountain-img-title'
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    >
                        MOUNTAIN
                    </div>
                </a>
            </div>
        );
    }
}