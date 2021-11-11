import React from 'react';
import { Color } from 'three';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './mountain.sass';
import './mountain-media.sass';
import MountainImg from './img/mountain.png';

export default class Mountain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            left: '-100%',
            imgWidth: 0,
            imgHeight: '0px',
            hovered: false
        }
    }

    onLoad = () => {

        this.setState({ imgWidth: document.getElementById('mountain-img').clientWidth })
        var height = document.getElementById('mountain-img').clientHeight;
        this.setState({ imgHeight: height + 'px' })

        window.addEventListener('resize', this.updateOffset);

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

        if (prevState.imgHeight !== this.state.imgHeight) {
            gsap.to('#mountain-img', { x: this.state.left, duration: 0.3, paused: true });
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
            <div className='mountain-content' id='mountain-content'>
                <div className='mountain-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur facilis quibusdam error magni eaque incidunt. Recusandae earum repudiandae ex ad.
                </div>
                <div className='mountain-img-container' id='mountain-img-container'>
                    <img src={ MountainImg } id='mountain-img' alt='Mountain' style={imgStyle}
                        onLoad={this.onLoad}
                    />
                </div>
                <a href='https://robertolovece.github.io/Three.js-Universe-Demo/'
                    target='_blank'
                    rel='noreferrer'
                    className='mountain-img-title-container'
                    id='mountain-img-title-container'
                    style={titleStyle}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <div className='mountain-img-title'>
                        MOUNTAIN    
                    </div>
                    <div className='mountain-img-number'>
                        02
                    </div>
                </a>
            </div>
        );
    }
}