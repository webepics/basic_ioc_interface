import React, { Component } from 'react';

import PVBarGraph from '../PVComponents/PVBarGraph'

class ExampleBarGraph extends Component {
  render() {
    return (
        <React.Fragment>
            <PVBarGraph template='$(p):paf:ctrl:adc1:pafAvTemp' macro="ak{01..36}"  width={800} height={120}/>
        </React.Fragment>
    );
  }
}

export default ExampleBarGraph;
