
import React from 'react'
import PVComponent, { ConnectComponent } from '../PVComponent'
import PVCheckbox from './PVCheckbox'

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
                <tr key={item} style={{height: '12px'}}>
                    <td>{ i + 1 }</td>
                    {item.map((element, j) => <td key={element}> <PVCheckbox pv={element} /></td>)}
                </tr>
            );
        });
        return <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    }
}

export default ConnectComponent(PVTable)