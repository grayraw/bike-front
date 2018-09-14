import React, { Component } from 'react'
import './BikeSmall.css'

class BikeSmall extends Component {
  //MAP STATE TO PROPS
  // let bike;
  // bike;
  constructor(props) {
    super()
  }

  componentWillMount() {

  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="small-bike-container">
        <div>
          <div className="bike-iteration-number"></div>
          <img src={require('../img/bike-thumb.png')} className="bike-thumb" />
          <div className="bike-title">{this.props.bike.brand} {this.props.bike.title}</div>
        </div>
        <div>
          <img src="" alt="" className="bike-brand" />
          <div className="bike-rrp">{this.props.bike.rrp || 'Not priced'}</div>
          <div className="bike-rrp">{this.props.bike.componentGrade || 'Shimano Deore'}</div>
        </div>
      </div>
    );
  }
}

export default BikeSmall;
