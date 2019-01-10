import React, { Component } from 'react';
import ReactTable from "react-table";

class Table extends Component {
   
    
    render() {

        //const customColumnStyle = { wi: "5px", backgroundColor: "green" };
    //style={customColumnStyle}

        return(
            <ReactTable 
                data={this.props.data}
                columns={this.props.columns}
            />)
    }

}

export default Table;