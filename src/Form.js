import React, { Component } from 'react';
import Select from 'react-select';

import socket from './websocket.js';


class Form extends Component {

    

  constructor(props) {
    super(props);
    this.state = {
      selectedCountryOption: {value: "*"},
      selectedYearOption: {value: 0},
      macro: false,
      conflicts: false,
      value: "*",
    }
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMacroChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChange2 = this.handleChange2.bind(this)
  }

  componentDidMount() {
    this.setState(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    var query;

    if(this.state.macro) {
      query = "CALL sp_getMacro('" + this.state.selectedCountryOption.value + "', " + this.state.selectedYearOption.value + ")";
      socket.emit("updateTable", query)
      console.log(query);
    } else if(this.state.conflicts) {
      query = "CALL sp_getConflicts('" + this.state.selectedCountryOption.value + "', " + this.state.selectedYearOption.value + ", '" + this.state.value + "')";
      socket.emit("updateTable", query)
      console.log(query);
    } else if(this.state.value !== "") {
      query = "CALL sp_getActorCountry('" + this.state.selectedCountryOption.value + "', '" + this.state.value + "')";
      socket.emit("updateTable", query)
      console.log(query);
 
    } else {
      query = "CALL sp_getMacroSmall('" + this.state.selectedCountryOption.value + "', " + this.state.selectedYearOption.value + ")";
      socket.emit("updateTable", query)
      console.log(query);
    }
    
  }

  handleCountryChange = (selectedCountryOption) => {
    this.setState({selectedCountryOption});
  }

  handleYearChange = (selectedYearOption) => {
    this.setState({selectedYearOption});
  }

  handlePopulationChange = () => {
    this.setState({  });
  }

  
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChange2 = (event) => {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }


  render() {
    const { selectedCountryOption, selectedYearOption } = this.state;

    return(
      <form className='statisticsForm' onSubmit={this.handleSubmit}>
        
        <div className="groups">
          <div className="check">
            <input id="check" name="conflicts" type="checkbox" value={this.state.conflicts} onChange={this.handleChange}></input>
            <label for="check"></label>
          </div>
          <div className="element">
            <label className="labels">Conflicts</label>
          </div>
          
          <div className="check2">
            <input id="check2" name="macro" type="checkbox" checked={this.state.macro} onChange={this.handleChange}></input>
            <label for="check2"></label>
          </div>   
          <div className="element">
            <label className="labels">Macro</label>
          </div>
        </div>

        <div className="groups1">
            <Select
                value={selectedCountryOption}
                onChange={this.handleCountryChange}
                options={this.props.countries}
            />
            <div className="element">
                  <label className="labels">Country</label>
            </div>
            <Select
                  value={selectedYearOption}
                  onChange={this.handleYearChange}
                  options={this.props.years}
            />
             <div className="element">
              <label className="labels">Year</label>
            </div>
        </div>

        <div className="groups2">
            <input className="textField" autocomplete="off" type="text" name="actor" value={this.state.value} onChange={this.handleChange2}/>
            <div className="element"><label className="labels">Actor: </label></div>
        </div>
        <input className="button" id="submit-button" align="center" type="submit" value="SUBMIT" />
      </form>)
      

    }


}

export default Form;
