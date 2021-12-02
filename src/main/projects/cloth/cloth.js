import React from 'react';
import { Color } from 'three';

import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import './cloth.sass';
import './cloth-media.sass';
import ClothImg from '../img/cloth.png';
import GitHub from '../img/github.svg';
export default class Cloth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            left: '-100%',
            imgWidth: 0,
            hovered: false
        }
    }

    onLoad = () => {

        this.setState({ imgWidth: document.getElementById('cloth-img').clientWidth })
        window.addEventListener('resize', this.updateOffset);

        this.updateOffset();

    }

    updateOffset = () => {

        var containerWidth = document.getElementById('cloth-img-container').clientWidth;
        var offset = ((this.state.imgWidth - containerWidth) / 2) * Number(containerWidth < this.state.imgWidth);
        this.setState({ left: '-' + offset + 'px' })

    };

    componentDidMount() {

        this.initAnimations();

    }

    initAnimations() {

        gsap.timeline({
            scrollTrigger: {
                trigger: '.cloth-img-container',
                start: 'top 100%',
                end: 'center 50%',
                scrub: true
            }
        }).to('.cloth-img-container', { opacity: 1 }, 0)


        gsap.fromTo('.cloth-img-title', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.cloth-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }

        })

        gsap.fromTo('.cloth-img-number', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.cloth-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }
        })

        gsap.fromTo('.cloth-github', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.cloth-img-container',
                start: 'top 50%',
                end: 'center 60%',
                scrub: true
            }
        })

        gsap.fromTo('.cloth-text', { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '.cloth-img-container',
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
                trigger: document.getElementById('cloth-content'),
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
            <div className='cloth-content' id='cloth-content'>
                <div className='cloth-text'>
                A Verlet integration interactive cloth simulation created with JavaScript using WebGL. Click the screen to toggle gravity direction.
                </div>
                <div
                    className='cloth-img-container'
                    id='cloth-img-container'
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <a href='https://robertolovece.github.io/Cloth/'
                        target='_blank'
                        rel='noreferrer'>
                        <img src={ClothImg} id='cloth-img' alt='Cloth' style={imgStyle}
                            onLoad={this.onLoad}
                        />
                        <div className='cloth-img-number'>
                            03
                        </div>
                    </a>
                    <a
                        className='github'
                        href='https://github.com/RobertoLovece/Cloth'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <GitHub 
                            className='cloth-github' 
                            onMouseEnter={this.onMouseLeave}
                            onMouseLeave={this.onMouseEnter}
                        />
                    </a>
                </div>
                <a href='https://robertolovece.github.io/Cloth/'
                    target='_blank'
                    rel='noreferrer'>
                    <div className='cloth-img-title'
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    >
                        CLOTH
                    </div>
                </a>
            </div>
        );
    }
}