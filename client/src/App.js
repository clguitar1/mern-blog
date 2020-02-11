import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import NavbarComponent from './components/layout/NavbarComponent';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth.actions';
import setAuthToken from './utils/setAuthToken';

// // check for token in localStorage
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Fragment>
            <NavbarComponent />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
