





import React, { Component } from 'react';
import Select from 'react-select';

import socket from './websocket.js';


class Form extends Component {

    state = {
        
      }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //this.setState(this.state);
  }


  handleSubmit = (event) => {
    event.preventDefault();
    //this.setState({  });
    socket.emit("getCountries", "CALL sp_getCountries()");
  }

  


  render() {
    //const { selectedCountryOption, selectedYearOption } = this.state;

    return(
        <form className="show-form"  onSubmit={this.handleSubmit}>
            <input type="submit" id="show-form" value=" 🔍 NEW QUERY 🔎"/>
        </form>)
    }

}

export default Form;


//&#12826
//&#x1f50d





