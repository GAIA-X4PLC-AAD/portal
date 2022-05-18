import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

const customHistory = createBrowserHistory();

ReactDOM.render(<Router history={customHistory} />, node);
