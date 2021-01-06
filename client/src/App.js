import React, { Component } from 'react';
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authentication';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from './store';


import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Coupon from "views/Forms/Coupon.js";

// import Navbar from './components/Navbar';
import Register from './views/Forms/Register';
import Login from './views/Forms/Login';
// import Home from './components/Home';
// import Protected from './components/Protected';

// import { useDispatch } from 'react-redux'
// import { createBrowserHistory } from "history";

// import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/css/material-dashboard-react.css?v=1.9.0";

// const hist = createBrowserHistory();

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

class App extends Component {

  // dispatch = useDispatch();

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(decoded));
      // dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        // dispatch(logoutUser());
        window.location.href = '/login';
      }
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
        <Switch>
          <ProtectedRoute
            path="/admin"
            component={Admin}
            isAuthenticated={isAuthenticated}
          />
          {/* <Route path="/admin" component={Admin} /> */}
          <ProtectedRoute
            path="/rtl"
            component={RTL}
            isAuthenticated={isAuthenticated}
          />
          <Route path="/coupon/:hashCode" component={Coupon} />
          {/* <Redirect from="/" to="/admin/dashboard" /> */}
          <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          </div>
        </Switch>
    );
  }
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(App);
// )(withRouter(App));

// export default withRouter(App);
// export default App;
