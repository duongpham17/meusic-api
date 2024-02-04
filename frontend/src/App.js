import 'styles/index.scss';
import React from 'react';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from 'redux/store';

import Alert from 'constant/alert';
import Pages from 'pages';
import Footer from 'constant/footer';

const App = () => 
(
    <Provider store={store}>
      <BrowserRouter>
        <Alert/>
        <Pages/>
        <Footer/>
      </BrowserRouter>
    </Provider>
)

export default App