import React, { Component } from 'react';

/*
* Use this component as a launching-pad to build your functionality.
*
*/

var storeJSON = [
  {
    Name: "Red Barn Stores 3858-CUAJIMALPA", Address: "JOSE MA CASTORENA NO 84  COL SAN JOSE DE LOS CEDROS DELEGACION CUAJIMALPA MEXICO DFCP 05210", lat: 19.36408, lng: -99.28833600000002
  },
  { Name: "Red Barn Stores 2344-LOMAS", Address: "BOULEVARD MANUEL AVILA CAMACHO NO. 491 COL. PERIODISTAS C.P.11220", lat: 19.4497769, lng: -99.2176528 },
  { Name: "Red Barn Stores 3862-AZCAPOTZALCO", Address: "AV. NEXTENGO NO. 78 COL. SANTA CRUZ ACAYUCAN MEXICO D.F. C.P. 02770", lat: 19.472769, lng: -99.191032 },
  { Name: "Red Barn Stores 2466-CUITLAHUAC", Address: "AV. CUITLÁHUAC NO. 3651 COL. HOGAR Y SEGURIDAD DELEG. AZCAPOTZALCO C.P.02820", lat: 40.7127753, lng: -74.0059728 }
];


export default class YourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { favList: [] };
    this.markerClick = this.markerClick.bind(this);
    this.initMap = this.initMap.bind(this);
    this.deleteStore = this.deleteStore.bind(this);
  }
  componentDidMount() {
    console.log(this.state);
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A&callback=initMap')
  }
  initMap() {
    var self = this;
    console.log(this);
    console.log(this.state);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 19.36408, lng: -99.28833600000002 },
      zoom: 8
    });
    let storeData = storeJSON;
    console.log(this.state)

    for (var index = 0; index < storeData.length; index++) {

      var lat = Number(storeData[index].lat);
      var lng = Number(storeData[index].lng);
      var name = storeData[index].Name;
      var address = storeData[index].Address;


      console.log(lat + " " + lng + " " + name);
      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: name,
        address: address
      });

      marker.addListener('click', function (e, a, ab) {
        self.markerClick(this.title, this.address)
        console.log(this);


      });
    }

  }
  markerClick(name, address) {
    var self = this;
    
alert("this store has been added in your favorite Stores list.");
    var list = self.state.favList;
    var json = { name: name, address: address };
    list.push(json);
    self.setState({ favList: list })
  }
  deleteStore(item){
   var favList = this.state.favList;
   if(favList.length > 0){
      for(var index=0; index< favList.length; index++){
        if(item.name == favList[index].name && item.address == favList[index].address){
          favList.splice(index, 1);
        }
      }
      this.setState({favList:favList})
   }
  }

  render() {
   let self = this;
    return (
      <div style={divStyle}>
        <h1> Put your solution here!</h1>

        <h3>My Favorite Stores List</h3>
        <div className="table-responsive">
        <table style={tableStyle} className="table">
          <thead style={tableHeader}><tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr></thead>
          <tbody>
          {this.state.favList.length > 0 && this.state.favList != '' ?
            this.state.favList.map(function (item, i) {
              return <tr key={i}>
              <td>{i+1}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td><a onClick={self.deleteStore.bind(null,item)} style={deleteButton}>
              <i className="fa fa-trash-o fa-2x" aria-hidden="true"></i></a></td>

            </tr>
            }) : <tr><td colSpan={4}>Your favorite Stores list is empty </td></tr>
          }
            
          </tbody>
        </table>
        </div>
        {/* <ul>
          {this.state.favList.length > 0 && this.state.favList != '' ?
            this.state.favList.map(function (item, i) {
              return <li key={i}>{item.name + " - " + item.address}</li>
            }) : <li>Your favorate list is blank</li>
          }
        </ul> */}
        <div ref="map" id="map" style={mapStyle}></div>
      </div>
    );
  }
}

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

var mapStyle = {
  height: 1000,
  width: 1000
}
var deleteButton = {
cursor:'pointer',
height:30,
width:30

}

var tableHeader = {
  border: '1px solid #e0d9d9',
  background: '#e0d9d9'
}

var tableStyle={
  width: 1000,
  border:'1 solid #ccc'
}

var divStyle = {
  border: 'red',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 20
};