import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from './../store/store'
import BikeApi from './../services/BikeApi'
import { Grid, Row, Col } from 'react-bootstrap';
import './SingleBikePage.css'

class SingleBikePage extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    BikeApi.getSingleBike().then((res) => {
      if (res && res[0]) store.dispatch({ type: 'LOAD_SINGLE_BIKE', payload: res[0] });
    })
  }

  render() {
    return (
      <div>
        {
          this.props.bike.title ?
            <Grid className="single-bike-container">
              <Row>
                <Col xs={6}>
                  <img src={require('../img/bike.png')} className="bike-image" />
                </Col>
                <Col xs={6} className="bike-features">
                  <h1 className="bike-title">{this.props.bike.brand + ' ' + this.props.bike.title}</h1>
                  <p className="bike-description">Manufacturer says: {this.props.bike.description}</p>
                  <h3>Frame</h3>
                  <p className="bike-feature">{this.props.bike.frame}</p>
                  <h3>Fork</h3>
                  <p className="bike-feature">{this.props.bike.fork}</p>
                  <h3>Shock</h3>
                  <p className="bike-feature">{this.props.bike.shock}</p>
                  <h3>Rear Derailleur</h3>
                  <p className="bike-feature">{this.props.bike.rearDerailleur}</p>
                  <h3>Brakes</h3>
                  <p className="bike-feature">{this.props.bike.brakes}</p>
                  <h3>Seatpost</h3>
                  <p className="bike-feature">{this.props.bike.seatpost}</p>
                  <h3>Rims</h3>
                  <p className="bike-feature">{this.props.bike.rims}</p>
                  <h3>Tires</h3>
                  <p className="bike-feature">{this.props.bike.tires}</p>
                </Col>
              </Row>
            </Grid>
            : <div></div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bike: state.bikes.singleBike
  }
}
export default connect(
  mapStateToProps
)(SingleBikePage)

