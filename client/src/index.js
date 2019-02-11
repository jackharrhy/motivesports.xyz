import React from 'react';
import ReactDOM from 'react-dom';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import './styles/index.scss';
import App from './App';

const Root = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <App />
  </MuiPickersUtilsProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
