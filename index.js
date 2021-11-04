import React from "react";
import ReactDOM from "react-dom";

import {App} from "./src/app.js";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

ReactDOM.render(<App />, document.getElementById("app"));