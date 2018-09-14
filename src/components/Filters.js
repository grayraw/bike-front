//rename this to Filters
//Add other filters exept for brands
import React, { Component } from 'react';
import store from '../store/store';
import { connect } from 'react-redux'
import BikeApi from '../services/BikeApi';
import { Link, withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import InputRange from 'react-input-range';
import { Checkbox } from 'react-bootstrap';
import "react-input-range/lib/css/index.css";

// import './App.css';

class Filters extends Component {
  constructor(props) {
    super();
    this.addFilter = this.addFilter.bind(this);
    // this.brandList = this.brandList.bind(this);
  }

  addFilter(filterValue, param) {

    //this updates url for bikeListPage to work with
    //it's better to move it elsewhere per principle of separation of concern;
    let currentParams = qs.parse(window.location.search, { arrayFormat: "bracket" });
    let currentValues = currentParams[param];
    //if value is in url remove, otherwise add it to url

    currentValues ?
      currentValues.includes(filterValue) ?
        currentValues = currentValues.filter(item => item !== filterValue) :
        currentValues = [...currentValues, filterValue] :
      currentValues = [filterValue];
    currentValues = [...new Set(currentValues)];

    currentParams[param] = currentValues;
    let newURL = qs.stringify(currentParams, { arrayFormat: "bracket" });

    // window.location.search = newURL;
    window.history.pushState(null, null, "?" + newURL);
    BikeApi.getBikeList().then((res) => {
      if (res) store.dispatch({ type: 'LOAD_BIKES', payload: res });
    })
  }

  componentDidMount() {
    BikeApi.getFilters().then((res) => {
      if (res) store.dispatch({ type: 'LOAD_FILTERS', payload: res });
    })
  }

  render() {
    return (
      <div className="brand-list-container">
        {
          this.props.filters.map((filterObject, i) => {
            switch (filterObject.title) {
              case ("RRP"):
                return <InputRange key={i}
                  draggableTrack
                  maxValue={20}
                  minValue={0}
                  value={10}
                  onChange={value => this.setState({ value })} />;
                break;

              default:
                return <div key={i}>
                  <h1 >{filterObject.title}</h1>
                  {filterObject.values.map((filter, i) => {
                    return <div key={i} >
                      <Checkbox onClick={() => this.addFilter(filter + "" /* converting to string */, filterObject.title)}>{filter}</Checkbox>
                    </div>
                  })}
                </div>
            }
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.bikes.filters
  }
}
export default connect(
  mapStateToProps
)(withRouter(Filters))