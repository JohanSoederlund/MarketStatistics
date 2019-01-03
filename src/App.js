import React, { Component } from 'react';
import './style/App.css';
import socket from './websocket.js';
import Table from './Table.js';

var columns = [];
var cellData = [];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {country_name: '', population: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  componentDidMount() {
    socket.on('query', function(data){
      var keyNames = Object.keys(data[0][0]);

      keyNames.forEach(element => {
        columns.push({
          Header: element,
          accessor: element // String-based value accessors!
        });

      });
      cellData = data[0];
      this.setState({country_name: ''});
    }.bind(this));
    socket.emit("query", "CALL sp_getCountries()");
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.country_name);
    //socket.emit("query", "CALL sp");
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({country_name: event.target.value});
  }

  handlePopulationChange(event) {
    this.setState({population: true});
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <form onSubmit={this.handleSubmit}>
        <label>
            Country:
            <input type="text" value={this.state.country_name} onChange={this.handleChange} />
          </label>
          <label>
            population:
            <input type="checkbox" value={this.state.population} />
          </label>
          <input type="submit" value="Submit" />
        </form>

          <p>
            Table with stats
          </p>
          
          <Table data={cellData} columns = {columns}/>

        </header>
      </div>
    );

  }
}

export default App;
