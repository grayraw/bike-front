import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from './store/store';
import BikeApi from './services/BikeApi';
import BikeListPage from './pages/BikeListPage';
import './App.css';

class App extends Component {
  constructor(props){
    super()
  }

  componentWillMount(){
    BikeApi.getBikeList().then((res)=>{
      if(res) store.dispatch({type: 'LOAD_BIKES', payload: res});
    })
  }

  render() {
    return (
      <div className="root">
        <BikeListPage />
      </div>
    );
  }
}

export default App;
