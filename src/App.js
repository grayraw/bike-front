import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import store from './store/store';
import BikeApi from './services/BikeApi';
import BikeListPage from './pages/BikeListPage';
import SingleBikePage from './pages/SingleBikePage';
import Header from './modules/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super()
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="root">
        {/* <BikeListPage /> */}
        <Header />
        <Switch>
          <Route exact path="/" component={BikeListPage} />
          <Route path="/bike/:id" component={SingleBikePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
