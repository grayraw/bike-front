import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
    constructor() {
        super()
    }

    render() {
        return <div className="navigationRoot">
            <Link to="/">Home</Link>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
        </div>
    }
}