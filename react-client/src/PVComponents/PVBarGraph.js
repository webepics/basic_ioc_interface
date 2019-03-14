import React from 'react';
import {BarChart, Bar, XAxis, Tooltip, Legend} from 'recharts';
import PVComponent, { ConnectComponent } from '../PVComponent'
import { WebSocketMessage } from '../redux/actions'
import { connect } from 'react-redux'
//import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import expand from "brace-expansion";

class PVBarGraph extends PVComponent {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
        }
        expand(this.props.macro).forEach(function(p) {
            let bar = { name: this.props.template.replace(/\$\(p\)/, p),
                        label: p,
                        //value : (100*Math.random()).toFixed(1)}
                        value : 0 }
            this.state.data.push(bar)
        }, this);
    }

    componentDidMount() {
      this.state.data.forEach(function(p) {
        this.props.WebSocketMessage({type: 'addPV', name: p.name})
      }, this);  
    }

    componentWillUnmount() {
      this.state.data.forEach(function(p) {
        this.props.WebSocketMessage({type: 'removePV', name: p.name})
      }, this);  
    }

	render () {
    this.state.data.forEach(function(p) {
        if (this.props.pvs[p.name]) {
            p.value = this.props.pvs[p.name].value
        }
    }, this);  
  	return (
        <div>
          <BarChart onClick={() => this.render()} width={800} height={140} data={this.state.data}>
            <XAxis dataKey='label' height={50} interval={0} dx={8} dy={20} angle={75}/>
            <Bar dataKey='value' fill='#8c8700' background={{ fill: '#eee' }}/>
            <Tooltip/>
           </BarChart>
         </div>
    );
  }
}

export default ConnectComponent(PVBarGraph)
