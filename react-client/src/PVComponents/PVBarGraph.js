import React from 'react';
import {BarChart, Bar, XAxis, Tooltip, Legend} from 'recharts';
import PVComponent, { ConnectComponent } from '../PVComponent'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import expand from "brace-expansion";

class PVBarGraph extends PVComponent {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            data : [],
        }
        this.defaultData = []
        this.template = this.props.template
    }

    tick() {
        let data = []
        expand(this.props.macro).forEach(function(p) {
            let bar = { label: this.props.template.replace(/\$\(p\)/, p),
                        name: p,
                        value : (100*Math.random()).toFixed(1)}
            data.push(bar)
        }, this);
        this.setState(prevState => ({
            data: data,
            seconds: prevState.seconds + 1
      }));
    }

    componentDidMount() {
      this.tick()
      this.interval = setInterval(() => this.tick(), 1000);
      this.state.data.forEach(function(p) {
        alert('adding ' + p);
        //this.props.WebSocketMEssage({type: 'addPV', name: p.name})
      }, this);  
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

	render () {
  	return (
        <div>
        <ContextMenuTrigger id='foo'>
            <BarChart onClick={() => this.render()} width={this.props.width} height={this.props.height} data={this.state.data}>
             <XAxis dataKey='name' height={50} interval={0} dx={8} dy={20} angle={75}/>
             <Bar dataKey='value' fill='#8c8700' background={{ fill: '#eee' }}/>
             <Tooltip/>
           </BarChart>
        </ContextMenuTrigger>
        <ContextMenu id='foo'>
            <MenuItem data={{foo: 'bar'}} onClick={ ()=>alert('NOT YET IMPLEMENTED')}>
                PV Probe
            </MenuItem>
        </ContextMenu>
        </div>
    );
  }
}

export default ConnectComponent(PVBarGraph)
