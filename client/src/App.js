import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/loginComponent/login';
import Register from './components/registerComponent/register';
import Dashboard from './components/dashboard/dashboard';
import { PrivateRoute } from './privateRoute/privateRoute';
import { ToastContainer } from 'react-toastify';
import PageNotFound from './components/pageNotFound/pageNotFound';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to city cam</h1>
        <ToastContainer />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}
//https://www.sitepoint.com/react-router-v4-complete-guide/ Protected routes
export default App;