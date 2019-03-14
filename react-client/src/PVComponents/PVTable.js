
import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PVComponent, { ConnectComponent } from '../PVComponent'
import PVCheckbox from './PVCheckbox';
import PVLed from './PVLed';
import PVInput from './PVInput';

class PVTable extends PVComponent {
    ids = []
    constructor(props) {
        super(props)
        this.state = {
            displayType: 'checkbox'
        };
        this.toggleDisplay = this.toggleDisplay.bind(this)
        for (let card = 1; card <= props.cardCount; card++) {
            let row = Array(props.pCount).fill(0)
            row = row.map((_, p) => {
                const ps = ('' + (p + 1)).padStart(2, '0')
                const cards = ('' + card).padStart(2, '0')
                return this.props.template.replace('$(p)', `ak${ps}:`).replace('$(card)', `card${cards}:`)
            })
            this.ids.push(row)
        }
    }

    toggleDisplay() {
        this.setState({
            displayType: this.state.displayType === 'checkbox' ? 'led' : this.state.displayType === 'led' ? 'text' : 'checkbox',
        })
    }

    render() {
        const rows = this.ids.map((item, i) => {
            return (
                <TableRow key={item} style={{height: '12px'}}>
                    <TableCell style={{padding:0}}>
                        <Typography variant="h5" color="inherit">
                            { i + 1 }
                        </Typography>
                    </TableCell>
                    {item.map((element, j) =>
                        <TableCell style={{padding:0}} key={element}>
                            {this.state.displayType === 'checkbox' ?
                            <PVCheckbox pv={element} /> :
                            this.state.displayType === 'led' ?
                            <PVLed pv={element} /> :
                            <PVInput pv={element} />

                            }
                        </TableCell>)}
                </TableRow>
            );
        });
        return (
        <React.Fragment>
        <br/><br/>
        <Button variant="outlined" color="primary" onClick={this.toggleDisplay}>Toggle Checkbox / LED / TextFields</Button>
        <br/>
        <Table>
            <TableBody>
                {rows}
            </TableBody>
        </Table>
        </React.Fragment>
        )
    }
}

export default ConnectComponent(PVTable)