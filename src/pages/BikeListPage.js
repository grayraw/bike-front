import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import BikeSmall from './../components/BikeSmall'
import { connect } from 'react-redux'
import store from './../store/store';
import Filters from './../components/Filters';
import BikeApi from './../services/BikeApi';
import BikeSmall from './../components/BikeSmall';
import Paginator from './../components/Paginator';

import { Grid, Row, Col } from 'react-bootstrap';
let prevSearchQuery;
class BikeListPage extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    BikeApi.getBikeList().then((res) => {
      if (res) store.dispatch({ type: 'LOAD_BIKES', payload: res.docs });
    })
  }

  render() {

    return (
      <Grid className="bike-list-container">
        <Row>
          <Col xs={4}>
            <Filters />
          </Col>
          <Col xs={8}>
            {
              this.props.bikeList.map((bike, i) => {
                var bikeLink = "bike/" + bike._id;
                return <Link key={bike._id} to={bikeLink} ><BikeSmall bike={bike} /> </Link>
              })
            }
          </Col>
          <Col xs={8}><Paginator /></Col>
        </Row>
      </Grid>
    );
  }
}


const mapStateToProps = state => {
  return {
    bikeList: state.bikes.bikeList
  }
}
export default connect(
  mapStateToProps
)(BikeListPage)

