//rename this to Filters
//Add other filters exept for brands
import React, { Component } from 'react';
import store from '../store/store';
import { connect } from 'react-redux'
import BikeApi from '../services/BikeApi';
import { Link, withRouter } from 'react-router-dom';
import * as qs from 'query-string';

// import './App.css';

class Filters extends Component {
    constructor(props){
      super();
      this.addParamToQuery = this.addParamToQuery.bind(this);
      // this.brandList = this.brandList.bind(this);
    }

    addParamToQuery(val, param){
      let currentParams = qs.parse(window.location.search, {arrayFormat: "bracket"});
      let newParams = {};
      newParams = currentParams;
      newParams[param] ? newParams[param] = [...newParams[param], val] : newParams[param] = [val];
      newParams[param] = [...new Set(newParams[param])];
      let newURL = qs.stringify(newParams, {arrayFormat: "bracket"});
      // window.location.search = newURL;
      window.history.pushState(null, null, "?" + newURL);
    }
  
    componentWillMount(){
      BikeApi.getFilters().then((res)=>{
        if(res) store.dispatch({type: 'LOAD_FILTERS', payload: res});
      })
    }
  
    render() {
      return (
        <div className="brand-list-container">
          {
            this.props.filters.map((filter, i)=>{
              return <div>
                <h1 key={i}>{filter.title}</h1>
                {filter.values.map((val, i)=>{
                  return <div key={i} to="/" onClick={()=> this.addParamToQuery(val, filter.title)}>{val}</div>
                })}
              </div>
            })
          }
        </div>
      );
    }
  }
  
  const mapStateToProps = state =>{
    return {
        filters: state.bikes.filters
    }
  }
  export default connect(
    mapStateToProps
  )(withRouter(Filters))