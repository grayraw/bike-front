import React, { Component } from 'react';
import store from '../store/store';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import BikeApi from '../services/BikeApi';
import history from './../history'
import settings from './../settings'

let currentPage, currentQueryParams;
export default class Paginator extends Component {
    constructor(props) {
        super();
        this.nextPage = this.nextPage.bind(this);

        currentQueryParams = qs.parse(window.location.search, { arrayFormat: "bracket" });
        currentPage = currentQueryParams.page ? parseInt(currentQueryParams.page) : 1;
    }

    nextPage() {
        currentQueryParams = qs.parse(window.location.search, { arrayFormat: "bracket" });
        currentPage = currentQueryParams.page ? parseInt(currentQueryParams.page) : 1;
        currentPage++;
        currentQueryParams.page = currentPage;

        let newURL = qs.stringify(currentQueryParams, { arrayFormat: "bracket" });
        history.push("?" + newURL);

        BikeApi.getBikeList().then((res) => {
            if (res) store.dispatch({ type: 'LOAD_BIKES', payload: res.docs });
        });

        this.forceUpdate();
    }

    render() {
        return <div onClick={this.nextPage}>hui</div>
    }
}