
import React from 'react'
import PVComponent, { ConnectComponent } from '../PVComponent'
import PVCheckbox from './PVCheckbox'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

class PVTable extends PVComponent {

    ids = []

    constructor(props) {
        super(props)
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

    render() {
        const rows = this.ids.map((item, i) => {
            return (
                <TableRow key={item} style={{height: '12px'}}>
                    <TableCell style={{padding:0}}>
                        <Typography variant="h5" color="inherit">
                            { i + 1 }
                        </Typography>
                    </TableCell>
                    {item.map((element, j) => <TableCell style={{padding:0}} key={element}> <PVCheckbox pv={element} /></TableCell>)}
                </TableRow>
            );
        });
        return <Table>
            <TableBody>
                {rows}
            </TableBody>
        </Table>
    }
}

export default ConnectComponent(PVTable)