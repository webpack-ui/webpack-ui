import React from 'react';
import { render } from 'react-dom';
import App from './client/components/App.jsx';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "mobx-react";
import Store from "./client/store";
const store = new Store();

render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('app'));
