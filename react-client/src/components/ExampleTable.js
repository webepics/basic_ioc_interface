import React, { Component } from 'react';

import PVTable from '../PVComponents/PVTable'

class ExampleTable extends Component {
  render() {
    return (
        <React.Fragment>
            <PVTable template='$(p)$(card)BFStatus:fpgaConfigured' prefix='ak' pCount={36} cardCount={12} />
        </React.Fragment>
    );
  }
}

export default ExampleTable;
