import React, { Component } from 'react';
import ReactTable from "react-table";

class Table extends Component {
/*
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        //this.state = { counter: 0 };
        //this.handleClick = this.handleClick.bind(this);
      }
      */

    render() {
        return(
        <ReactTable
            data={this.props.data}
            columns={this.props.columns}
        />)
    }

}

export default Table;