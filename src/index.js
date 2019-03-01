import React from 'react';
import ReactDOM from 'react-dom';

//import * as serviceWorker from './serviceWorker';
import { env } from './config';

import App from './App';

ReactDOM.render(<App env={env} />, document.getElementById('contactUsFormContainer'));

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

//serviceWorker.register();
