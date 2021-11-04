import React from 'react';

import './app.sass';

import { Canvas } from './canvas/canvas.js'
import { Main } from './main/main.js'

require('normalize.css/normalize.css');

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    componentDidMount() {
        this.setState({isLoading: false})
    }

    render() {
        return (
            <>
                <Canvas/>
                <Main isLoading = { this.state.isLoading }/>       
                {/* <Nav/> */}
            </>
        );
    };
}