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
            left: { left: '-100%' },
            imgWidth: 0,
            imgHeight: { height: '0px' },
        }
    }

    onLoad = () => {
        this.setState({ imgWidth: document.getElementById('universe-img').clientWidth })
        var height = document.getElementById('universe-img').clientHeight;
        console.log(height)
        this.setState({ imgHeight: { height: height + 'px' } })
    }

    updateOffset = () => {

        var containerWidth = document.getElementById('scroll-img').clientWidth;

        var offset = (this.state.imgWidth - containerWidth) / 2;
        this.setState({ left: { left: '-' + offset + 'px' } })

    };

    componentDidMount() {
        window.addEventListener('resize', this.updateOffset);
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

        if (prevState.imgWidth !== this.state.imgWidth) {
            this.updateOffset();
        }
    }

    render() {
        return (
            <div className='universe-content' id='universe-content'>
                <div className='universe-text'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor mollitia laborum dignissimos nisi porro ipsam consequuntur veritatis in tenetur ea.
                </div>
                <div className='scroll-img' id='scroll-img'>
                    <div className='img-container'>
                        <img src={UniverseImg} id='universe-img' alt='Universe' style={this.state.left}
                            onLoad={ this.onLoad }
                        />
                    </div>
                </div>
                <div className='scroll-img-title' style={this.state.imgHeight}>
                    <div className='img-title'>
                        Universe
                    </div>
                    <div className='img-number'>
                        01
                    </div>
                </div>
            </div>
        );
    }
}