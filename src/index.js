import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BaseFormExample from './pages/BaseFormExample';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

ReactDOM.render(
  (
    <Router>
      <div>
        <Route exact path='/index' component={App}/>
        <Route path='/examples/base-form' component={BaseFormExample}/>
      </div>
    </Router>
  ), document.getElementById('root'));
registerServiceWorker();
