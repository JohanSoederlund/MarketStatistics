import React, { Component } from 'react';
import './style/App.css';
import socket from './websocket.js';
import Table from './Table.js';
import Form from './Form.js';

var columns = [];
var cellData = [];
var countries = [{value: "ALL", label: "ALL"}];
var years = [{value: "ALL", label: "ALL"},
{value: 1997, label: "1997"},
{value: 1998, label: "1998"},
{value: 1999, label: "1999"},
{value: 2000, label: "2000"},
{value: 2001, label: "2001"},
{value: 2002, label: "2002"},
{value: 2003, label: "2003"},
{value: 2004, label: "2004"},
{value: 2005, label: "2005"},
{value: 2006, label: "2006"},
{value: 2007, label: "2007"},
{value: 2008, label: "2008"},
{value: 2009, label: "2009"},
{value: 2010, label: "2010"},
{value: 2011, label: "2011"},
{value: 2012, label: "2012"},
{value: 2013, label: "2013"},
{value: 2014, label: "2014"},
{value: 2015, label: "2015"},
{value: 2016, label: "2016"},
{value: 2017, label: "2017"}
];

class App extends Component {

  componentDidMount() {
    socket.on('updateTable', function(data){
      console.log(JSON.stringify(data));
      
      var keyNames = Object.keys(data[0][0]);

      keyNames.forEach(element => {
        columns.push({
          Header: element,
          accessor: element // String-based value accessors!
        });

      });
      cellData = data[0];
      
      this.setState({});
    }.bind(this));

    socket.on('getCountries', function(data){
      
      data[0].forEach(element => {
        countries.push({value: element.country_name, label: element.country_name});
      });

      this.setState(this.state);
    }.bind(this));

    //socket.emit("updateTable", "CALL sp_getCountryFatalities4('*', 2001)");
    socket.emit("getCountries", "CALL sp_getCountries()");
    this.setState(this.state);
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">

          
        <Form countries={countries} years={years}/>
        <Table data={cellData} columns = {columns}/>

        </header>
      </div>
    );

  }
}

export default App;

//<Table data={cellData} columns = {columns}/>

//<Form data={cellData} columns = {columns}/>
//<Form />