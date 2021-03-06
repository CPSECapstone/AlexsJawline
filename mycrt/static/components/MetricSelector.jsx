import React, { Component } from 'react';
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import Graph from './Graph';
import alasql from 'alasql';
require('../styles/graphstyles.css');
import { connect } from 'react-redux';
import { setMetricForGraph } from '../actions'

var selectedColor = "#ADD8E6";
var nonSelectedColor = "white";

class MetricSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metric: this.props.metricForGraph
        }

        this.handleMetricChange = this.handleMetricChange.bind(this)
    }

    handleMetricChange(event) {
        this.setState({ metric: event })
      }


    //helper function that sets the state's current metric to the one that
    //the user selected
    selectMetricForGraph(metric, e) {
        this.props.dispatch(setMetricForGraph(metric));
    }

    //this is a helper function to change the background color of the metric
    //that has been selected for the user to see
    getbackgroundColor(metricName) {
        if(this.props.metricForGraph == metricName) {
            return selectedColor;
        } else {
            return nonSelectedColor;
        }
    }


    render() {
        let defaultSelect;
        if(this.props.metricForGraph != false) {
            // if(this.props.metricForGraph == 'CPU')
            defaultSelect = this.props.metricForGraph
        } else {
            defaultSelect = ''
        }
        return(
        <div className='row' style={{textAlign: 'center'}}>
            <ToggleButtonGroup type="radio" name="options" value={defaultSelect} onChange={this.handleMetricChange} defaultValue={defaultSelect}>
                {/* <ToggleButton id="toggle" value={'cpuUtilization'} onClick={this.selectMetricForGraph.bind(this, "CPUUtilization")}> */}
                <ToggleButton id="toggle" value={'CPUUtilization'} onClick={this.selectMetricForGraph.bind(this, "CPUUtilization")}>
                <img src="https://cdn4.iconfinder.com/data/icons/computer-hardware-line-icons-1/48/08-512.png" id='icon' />
                    CPU Utilization
                </ToggleButton>
                {/* <ToggleButton id="toggle" value={'Freeable Memory'} onClick={this.selectMetricForGraph.bind(this, "FreeableMemory")}> */}
                <ToggleButton id="toggle" value={'FreeableMemory'} onClick={this.selectMetricForGraph.bind(this, "FreeableMemory")}>
                <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/134147-200.png" id='icon'/>
                    Freeable Memory
                </ToggleButton>
                {/* <ToggleButton id="toggle" value={'readIOPS'} onClick={this.selectMetricForGraph.bind(this, "ReadIOPS")}> */}
                <ToggleButton id="toggle" value={'ReadIOPS'} onClick={this.selectMetricForGraph.bind(this, "ReadIOPS")}>
                <img src="http://icons.iconarchive.com/icons/iconsmind/outline/512/Open-Book-icon.png" id='icon'/>
                    Read IOPS
                </ToggleButton>
                {/* <ToggleButton id="toggle" value={'writeIOPS'} onClick={this.selectMetricForGraph.bind(this, "WriteIOPS")}> */}
                <ToggleButton id="toggle" value={'WriteIOPS'} onClick={this.selectMetricForGraph.bind(this, "WriteIOPS")}>
                <img src="http://letterwriting.site/wp-content/uploads/2018/03/pencil-clipart-black-and-white-free-clip-art-images-freeclipart-pw-intended-for-pencil-clipart-black-and-white-png-hd.png" id='icon'/>
                    Write IOPS
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    metricForGraph: state.metricForGraph
})

  export default connect(mapStateToProps)(MetricSelector)
  
