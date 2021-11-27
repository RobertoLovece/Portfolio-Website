import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/app.js';

require('normalize.css/normalize.css');

// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// }

ReactDOM.render(
    <App

    />,
    document.getElementById('app')
)
