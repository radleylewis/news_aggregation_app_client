
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './containers/App';
import store from './redux/store/';

let root = document.createElement('div');
root.id = "root";
document.body.appendChild(root);

// Now we can render our application into it
const AppContainer = ReactHotAppContainer;

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);
