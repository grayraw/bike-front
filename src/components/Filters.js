//rename this to Filters
//Add other filters exept for brands
import React, { Component } from 'react';
import store from '../store/store';
import { connect } from 'react-redux'
import BikeApi from '../services/BikeApi';
import { Link, withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import InputRange from 'react-input-range';
import { Checkbox, Label } from 'react-bootstrap';
import "react-input-range/lib/css/index.css";
import './components.css';

// import './App.css';

let currentFilters;
class Filters extends Component {
  constructor(props) {
    super();
    this.addFilter = this.addFilter.bind(this);
    currentFilters = qs.parse(window.location.search, { arrayFormat: "bracket" });
  }

  addFilter(filterValue, filterName) {

    //this updates url for bikeListPage to work with
    //it's better to move it elsewhere per principle of separation of concern;
    currentFilters = qs.parse(window.location.search, { arrayFormat: "bracket" });
    let currentValues = currentFilters[filterName];

    //if value is in url remove, otherwise add it to url
    currentValues ?
      currentValues.includes(filterValue) ?
        currentValues = currentValues.filter(item => item !== filterValue) :
        currentValues = [...currentValues, filterValue] :
      currentValues = [filterValue];

    // removes duplicates, seems no longer needed
    // currentValues = [...new Set(currentValues)];

    currentFilters[filterName] = currentValues;
    let newURL = qs.stringify(currentFilters, { arrayFormat: "bracket" });

    window.history.pushState(null, null, "?" + newURL);
    BikeApi.getBikeList().then((res) => {
      if (res) store.dispatch({ type: 'LOAD_BIKES', payload: res });
    });

    this.forceUpdate();
  }

  componentDidMount() {
    BikeApi.getFilters().then((res) => {
      if (res) store.dispatch({ type: 'LOAD_FILTERS', payload: res });
    })
  }

  render() {

    let selectedTags = Object.entries(currentFilters);
    // debugger;
    return (
      <div className="brand-list-container">

        {selectedTags.map((tagObject) => {
          if (tagObject[1] && Array.isArray(tagObject[1])) {
            return tagObject[1].map((tagString, i) => {
              return <h4 key={tagString}><Label className="filter-tag" key={tagString} onClick={() => this.addFilter(tagString, tagObject[0])}>{tagString}</Label></h4>
            })
          }
        })}
        {

          this.props.filters.map((filterObject, i) => {

            let displayTitle = filterObject.title === "frameMaterial" ? "Frame Material" :
              filterObject.title === "wheelSize" ? "Wheel Size" :
                filterObject.title.charAt(0).toUpperCase() + filterObject.title.substr(1)
            switch (displayTitle) {
              case ("RRP"):
                return <div key={i}>
                  <h3>RRP</h3>
                  <InputRange
                    draggableTrack
                    maxValue={20}
                    minValue={0}
                    value={10}
                    onChange={value => this.setState({ value })} />
                </div>;
                break;

              default:
                return <div key={i}>
                  <h3>{displayTitle}</h3>
                  {filterObject.values.map((filter, i) => {
                    let checked = currentFilters[filterObject.title] && currentFilters[filterObject.title].includes(filter + "") ? true : false;
                    return <div key={i} >
                      <Checkbox checked={checked} onChange={() => this.addFilter(filter + "" /* converting to string */, filterObject.title)}>{filter}</Checkbox>
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