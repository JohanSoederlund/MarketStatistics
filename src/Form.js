import React, { Component } from 'react';
import Select from 'react-select';

import socket from './websocket.js';


class Form extends Component {

    state = {
        selectedCountryOption: null,
        selectedYearOption: null,
      }

  constructor(props) {
    super(props);
    

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(this.state);
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.country_name);
    var query = 'CALL sp_getCountryFatalities4("' + this.state.selectedOption.value + '", 2001)';

    if (this.state.selectedOption === null) socket.emit("updateTable", "CALL sp_getCountryFatalities4('*', 2001)")
    else if (this.state.selectedOption === "ALL") socket.emit("updateTable", "CALL sp_getCountryFatalities4('*', 2001)")
    else socket.emit("updateTable", query)
    
    event.preventDefault();
  }

  handleCountryChange = (selectedCountryOption) => {
    this.setState({ selectedCountryOption });
  }

  handleYearChange = (selectedYearOption) => {
    this.setState({ selectedYearOption });
  }

  handlePopulationChange = () => {
    this.setState({  });
  }

  handleGDPChange = () => {
    this.setState({  });
  }


  render() {
    const { selectedCountryOption, selectedYearOption } = this.state;

    return(
        

        <form onSubmit={this.handleSubmit}>
            <Select
                value={selectedCountryOption}
                onChange={this.handleCountryChange}
                options={this.props.countries}
            />

            <Select
                value={selectedYearOption}
                onChange={this.handleYearChange}
                options={this.props.years}
            />
           
            <input type="checkbox" value="Population" onChange={this.handlePopulationChange}></input>
            <input type="checkbox" value="GDP/Capita" onChange={this.handleGDPChange}></input>

            <input type="submit" value="SUBMIT" />
        </form>)
        

      }


}

export default Form;
