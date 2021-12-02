import React from 'react';
import { Color } from 'three';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './universe.sass';
import './universe-media.sass';
import UniverseImg from '../img/universe.png';
import GitHub from '../img/github.svg';
export default class Universe extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            left: '-100%',
            imgWidth: 0,
            hovered: false
        }
    }

    onLoad = () => {

        this.setState({ imgWidth: document.getElementById('universe-img').clientWidth })

        window.addEventListener('resize', this.updateOffset);

        this.updateOffset();

    }

    updateOffset = () => {

        var containerWidth = document.getElementById('universe-img-container').clientWidth;
        var offset = ((this.state.imgWidth - containerWidth) / 2) * Number(containerWidth < this.state.imgWidth);
        this.setState({ left: '-' + offset + 'px' })

    };

    componentDidMount() {

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


        gsap.fromTo('.universe-img-title', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.universe-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }

        })

        gsap.fromTo('.universe-img-number', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.universe-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }
        })

        gsap.fromTo('.universe-github', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.universe-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }
        })

        gsap.fromTo('.universe-text', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.universe-img-container',
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
            <div className='universe-content' id='universe-content'>
                <div className='universe-text'>
                    My first main experiment with JavaScipt and WebGL. Takes advantage of the WebGL points feature for the outer particle ring.
                </div>
                <div
                    className='universe-img-container'
                    id='universe-img-container'
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <a href='https://robertolovece.github.io/Universe/'
                        target='_blank'
                        rel='noreferrer'>
                        <img src={UniverseImg} id='universe-img' alt='Universe' style={imgStyle}
                            onLoad={this.onLoad}
                        />
                        <div className='universe-img-number'>
                            01
                        </div>
                    </a>
                    <a
                        className='github'
                        href='https://github.com/RobertoLovece/Universe'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <GitHub 
                            className='universe-github' 
                            onMouseEnter={this.onMouseLeave}
                            onMouseLeave={this.onMouseEnter}
                        />
                    </a>
                </div>
                <a href='https://robertolovece.github.io/Universe/'
                    target='_blank'
                    rel='noreferrer'>
                    <div className='universe-img-title'
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    >
                        UNIVERSE
                    </div>
                </a>
            </div>
        );
    }
}