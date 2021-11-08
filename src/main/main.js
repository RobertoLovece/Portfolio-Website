import React from 'react';

import './main.sass';

import { HomePage } from './homepage/homepage.js'
import Universe from './img/universe.png';

export default class Main extends React.Component {

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
        if (prevState.imgWidth !== this.state.imgWidth) {
            this.updateOffset();
        }
    }

    render() {
        return (
            <>

                <HomePage isLoading={this.props.isLoading} />
                <div className='scroll' id='scroll'>
                    <div className='scroll-content' id='scroll-content'>
                        <div className='scroll-text'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor mollitia laborum dignissimos nisi porro ipsam consequuntur veritatis in tenetur ea.
                        </div>
                        <div className='scroll-img' id='scroll-img'>
                            <div className='img-container'>
                                <img src={Universe} id='universe-img' alt='Universe' style={this.state.left}
                                    onLoad={this.onLoad}
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
                </div>
                <div className='bottom'>

                </div>

            </>

        );
    }

}