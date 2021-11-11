import React from 'react';
import { Color } from 'three';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './universe.sass';
import UniverseImg from './img/universe.png';

export default class Universe extends React.Component {

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

        this.setState({ imgWidth: document.getElementById('universe-img').clientWidth })
        var height = document.getElementById('universe-img').clientHeight;
        this.setState({ imgHeight: height + 'px' })

    }

    updateOffset = () => {

        var containerWidth = document.getElementById('universe-img-container').clientWidth;

        var offset = (this.state.imgWidth - containerWidth) / 2;
        this.setState({ left: '-' + offset + 'px' })

    };

    componentDidMount() {

        window.addEventListener('resize', this.updateOffset);
        this.initAnimations();

    }

    initAnimations() {

        gsap.timeline({
            scrollTrigger: {
                trigger: '.universe-img-container',
                start: 'top 100%',
                end: 'center 50%',
                scrub: true
            }
        }).to('.universe-img-container', { opacity: 1 }, 0)

        // start: 'top 50%',
        // end: 'center 60%',

        gsap.fromTo('.img-title', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.universe-img-container',
                start: 'top 40%',
                end: 'bottom 90%',
                scrub: true
            }

        })

        gsap.fromTo('.img-number', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.universe-img-container',
                start: 'top 40%',
                end: 'bottom 90%',
                scrub: true
            }
        })

        gsap.fromTo('.universe-text', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.universe-img-container',
                start: 'top 40%',
                end: 'bottom 90%',
                scrub: true
            }
        })

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateOffset);
    }

    componentDidUpdate(prevProps, prevState) {

        if (!this.props.isLoading) {
            ScrollTrigger.create({
                trigger: document.getElementById('universe-content'),
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
            gsap.to('#universe-img', { x: this.state.left, duration: 0.3, paused: true });
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
            <div className='universe-content' id='universe-content'>
                <div className='universe-text'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor mollitia laborum dignissimos nisi porro ipsam consequuntur veritatis in tenetur ea.
                </div>
                <div className='universe-img-container' id='universe-img-container'>
                    <img src={UniverseImg} id='universe-img' alt='Universe' style={imgStyle}
                        onLoad={this.onLoad}
                    />
                </div>
                <a href='https://robertolovece.github.io/Three.js-Universe-Demo/'
                    target='_blank'
                    rel='noreferrer'
                    className='universe-img-title'
                    style={titleStyle}
                    onMouseEnter={this.onMouseEnter} 
                    onMouseLeave={this.onMouseLeave}
                >
                    <div className='img-title'>
                        Universe
                    </div>
                    <div className='img-number'>
                        01
                    </div>
                </a>
            </div>
        );
    }
}