import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import store from './store/store';
import history from './history'



ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />

        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
