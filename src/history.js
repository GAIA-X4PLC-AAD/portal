import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

ReactDOM.render(<Router history={customHistory} />, node);
