import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Search from '../components/Search';
import Breadcrumbs from '../components/Breadcrumbs';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Header extends Component {
    constructor() {
        super()
    }

    render() {
        return <Grid className="headerRoot">
            <Navigation />
            <Breadcrumbs />
            <Search />
        </Grid>
    }
}