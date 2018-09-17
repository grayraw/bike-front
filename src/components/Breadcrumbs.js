import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Breadcrumbs extends Component {
    constructor() {
        super();
    }

    render() {
        let unfilteredArray = window.location.pathname.split('/');
        this.crumbArray = unfilteredArray.filter((elem, i) => {
            // filtering out last code in case it's a bike
            return unfilteredArray[i - 1] === "bike" ? false : true;
        });
        return <div className="breadcrumbsRoot">
            {this.crumbArray.map((elem, i, arr) => {
                return i === 0 ?
                    <span key={i}><Link to="/" >Home</Link> / </span> :
                    elem === "bike" && this.props.bike ?
                        <span>{this.props.bike.brand + " " + this.props.bike.title}</span> :
                        i < arr.length - i ?
                            <span><Link to="/" key={i}>{elem}</Link> / </span> :
                            <span key={i}>{elem}</span>;
            })}
        </div>
    }
}
export default connect(
    (state) => {
        return {
            bike: state.bikes.singleBike,
            location: state.router.location
        }
    }
)(Breadcrumbs)