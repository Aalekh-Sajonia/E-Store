import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import {store,persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker';


//access to redux inside our app
ReactDOM.render(
    <Provider store = {store} >  
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.register();