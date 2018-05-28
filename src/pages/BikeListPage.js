import React, { Component } from 'react'
// import BikeSmall from './../components/BikeSmall'
import { connect } from 'react-redux'
import store from './../store/store';
import Filters from './../components/Filters';
import BikeApi from './../services/BikeApi';

class BikeListPage extends Component {
  constructor(props){
    super();
    // this.bikeList = this.bikeList.bind(this);
    // this.bikeList = this.bikeList || [];
  }

  componentDidMount(){
    BikeApi.getBikeList().then((res)=>{
      if(res) store.dispatch({type: 'LOAD_BIKES', payload: res});
    })    
  }

  render() {
    return (
      <div className="bike-list-container">{
        this.props.bikeList.map((bike, i)=>{
          return <span key={i}>{bike.title}, {bike.brand} </span> 
        })
      }
        {/* this.props.heirloomsPublic.map((heirloom)=>{
            if (heirloom) {
                var styles = {
                    backgroundImage: 'url(' + heirloom.image + ')'
                }
                return (<li onClick={()=>{this.gotoHeirloom(heirloom)}} key={heirloom.id} className="heirlooms__item" >
                    <div style={styles}></div>
                </li>)
            }
        }) */}
      <Filters />
      </div>
    );
  }
} 

const mapStateToProps = state =>{
  return {
      bikeList: state.bikes.bikeList
  }
}
export default connect(
  mapStateToProps
)(BikeListPage)

  