//rename this to Filters
//Add other filters exept for brands
import React, { Component } from 'react';
import store from '../store/store';
import { connect } from 'react-redux'
import BikeApi from '../services/BikeApi';
import FilteringService from '../services/FilteringService';
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
  }


  updateFilters(val, param) {
    FilteringService.updateQueryString(val, param);
  }

  componentDidMount() {
    BikeApi.getFilters().then((res) => {
      if (res) store.dispatch({ type: 'LOAD_FILTERS', payload: res });
    })
  }

  render() {

    let selectedTags = Object.entries(qs.parse(this.props.searchQuery, { arrayFormat: "bracket" }));
    return (
      <div className="brand-list-container">
        {selectedTags}
        {selectedTags.map((tagObject) => {
          if (tagObject[1] && Array.isArray(tagObject[1])) {
            return tagObject[1].map((tagString, i) => {
              return <h4 key={tagString}><Label className="filter-tag" key={tagString} onClick={() => this.updateFilters(tagString, tagObject[0])}>{tagString}</Label></h4>
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
                    // let checked = currentFilters[filterObject.title] && currentFilters[filterObject.title].includes(filter + "") ? true : false;
                    let checked = false;
                    return <div key={i} >
                      {/* <Checkbox checked={checked} onChange={() => this.addFilter(filter + "" , filterObject.title)}>{filter}</Checkbox> */}
                      <Checkbox checked={checked} onChange={() => this.updateFilters(filter, filterObject.title)}>{filter}</Checkbox>
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
    filters: state.bikes.filters,
    searchQuery: state.router.location.search
  }
}
export default connect(
  mapStateToProps
)(withRouter(Filters))