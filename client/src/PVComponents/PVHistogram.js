import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from "d3";

import store from '../redux/store'

class PVHistogram extends Component {

    constructor(props) {
        super(props)
        console.table(props)
    }

    componentDidMount() {
        this.renderHistogram()
    }
    componentDidUpdate() {
        this.renderHistogram()
    }

    renderHistogram() {
        if (!this.props.history || !this.props.history[this.props.pvId]) return
        const svg = d3.select('svg')
        svg.selectAll('rect')
            .data(this.props.history[this.props.pvId])
            .enter()
            .append('rect')
                .attr('width', 10)
                .attr('height', d => Math.abs(d.value * 20))
                .attr('x', (d, i) => i * 15)
                .attr('y', d => 100 - Math.abs(d.value * 20))
                .attr('fill', 'white')
    }

    render() {
        return (
            <div>
                <p>{this.props.pvId}</p>
                <svg width={500} height={100}></svg>
            </div>
        )
    }
}

export default connect(state => state)(PVHistogram)