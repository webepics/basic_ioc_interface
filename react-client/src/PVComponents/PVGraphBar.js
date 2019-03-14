
import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Checkbox from '@material-ui/core/Checkbox';

import PVComponent, { ConnectComponent } from '../PVComponent'

class PVGraphBar extends PVComponent {


    constructor(props) {
        super(props)
    }

    render() {
        const {pvs, ids} = this.props;

        const data2 = [];

        for(var i =0; i< ids.length; i++){
          for(var j=0; j< ids[i].length; j++){
            if(pvs[ids[i][j]] !== undefined){
              data2.push({
                  name: pvs[ids[i][j]].pv.substring(2, 4),
                  pvalue: pvs[ids[i][j]].value,
              })
            }
          }
        }

        return(
          <BarChart
            width={2000}
            height={500}
            data={data2}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide= {true}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pvalue" fill="#8884d8" />

          </BarChart>
        )
    }
}

export default ConnectComponent(PVGraphBar)
