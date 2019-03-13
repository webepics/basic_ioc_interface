import React, { Component } from 'react';

import PVTable from '../PVComponents/PVTable'
import PVBarGraph from '../PVComponents/PVBarGraph'

class ExampleTable extends Component {
  render() {
    return (
        <React.Fragment>
            <PVBarGraph template='$(p):paf:ctrl:adc:pafAvTemp' macro="ak{01..36}"  />
        </React.Fragment>
    );
  }
}

export default ExampleTable;
