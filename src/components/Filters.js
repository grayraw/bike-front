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
      this.addFilter = this.addFilter.bind(this);
      // this.brandList = this.brandList.bind(this);
    }

    addFilter(filterValue, param){

      // let newFilterSet = {...this.props.selectedFilters};
      // newFilterSet[param] ? newFilterSet[param] = [...newFilterSet[param], val] : newFilterSet[param] = [val];
      // newFilterSet[param] = [...new Set(newFilterSet[param])];      


      filterValue.selected = !filterValue.selected;
      let updatedFilters = [...this.props.filters];
      
      store.dispatch({
        type: "LOAD_FILTERS",
        payload: updatedFilters
      })

      //this updates url for bikeListPage to work with
      //it's better to move it elsewhere per principle of separation of concern;
      let currentParams = qs.parse(window.location.search, {arrayFormat: "bracket"});
      currentParams[param] ? currentParams[param] = [...currentParams[param], filterValue.value] : currentParams[param] = [filterValue.value];
      currentParams[param] = [...new Set(currentParams[param])];
      let newURL = qs.stringify(currentParams, {arrayFormat: "bracket"});
      // window.location.search = newURL;
      window.history.pushState(null, null, "?" + newURL);
    }
  
    componentDidMount(){
      BikeApi.getFilters().then((res)=>{
        if(res) store.dispatch({type: 'LOAD_FILTERS', payload: res});
      })
    }
  
    render() {
      return (
        <div className="brand-list-container">
          {
            this.props.filters.map((filterObject, i)=>{
              return <div>
                <h1 key={i}>{filterObject.title}</h1>
                {filterObject.values.map((filter, i)=>{
                  return <div>
                          { filter.selected ? <span>true</span> : null }
                          <div key={i} to="/" onClick={()=> this.addFilter(filter, filterObject.title)}>{filter.value}</div>
                        </div>
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