import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './components/store.js';
import ContactForm from './components/contactForm';

import ReduxToastr from 'react-redux-toastr';

import * as serviceWorker from './serviceWorker';

class ContactFormApp extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <ContactForm />
      </Provider>
    );
  }
}

/* <Provider store={store}>
<div>
  <ReduxToastr
    timeOut={4000}
    newestOnTop={false}
    preventDuplicates
    position="top-left"
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    progressBar/>
</div>
</Provider> */

ReactDOM.render(<ContactFormApp />, document.getElementById('contactUsFormContainer'));

serviceWorker.register();
