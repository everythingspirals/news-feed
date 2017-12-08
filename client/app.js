//Babel
import 'babel-polyfill';

//React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import Main from 'components/main/main';

class App extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route name="Main" path="/(:category)" component={Main} />
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;