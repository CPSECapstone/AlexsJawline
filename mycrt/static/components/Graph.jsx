import React, { Component } from 'react'
// import LineChart from 'react-linechart'
import {LineChart, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

export default class Graph extends Component {
    constructor(props) {
        super(props)

        this.state = {
            xLabel: '',
            yLabel: '',
            // listOfAnalytics: this.props.selectedData,
            metric: this.props.nameOfMetric,
            selectedData: this.props.selectedData,
            // analytics: this.props.analytics,
            // value: this.props.value,
            title: '',
            color: '#fff'
        };
    };

    getTotalPoints() {
        let pointsValues = []
        let values = []
        let dataMin = 0
        let dataMax = 0
        let listOfAnalytics = this.state.selectedData;
        let listOfTotalPoints = []
        console.log('HERE SHOULD PRINT IF NO ERROR', listOfAnalytics[0][this.props.metric][0].Average)
        console.log('this is the metric being passed in: ', this.props.metric)

        // let totalPoints = this.state.pointsArray
        if(this.props.metric == 'CPUUtilization') {
            for (var outer = 0; outer < listOfAnalytics.length; outer++ ) {
                console.log('inside the loop, selectedData = ', listOfAnalytics[0])
                let pointsValues = []
                  for(let i = 0; i < listOfAnalytics[outer][this.props.metric].length; i++) {
                    let currPoint = {value: `${i}`, metric: listOfAnalytics[outer][this.props.metric][i].Average}
                    console.log('ADDING THIS VALUE TO VALUES []: ', listOfAnalytics[outer][this.props.metric][i].Average)
                    values.push(listOfAnalytics[outer][this.props.metric][i].Average)
                    console.log('ADDING THIS VALUE TO POINTS VALUES ARRAY: ', currPoint)
                    pointsValues.push(currPoint)
                  }
                  listOfTotalPoints.push(pointsValues)
                }
        }

        this.setState({totalValuesArray: values})
        // else if (this.props.metric == 'FreeableMemory') {
        //     for (var outer = 0; outer < listOfAnalytics.length; outer++ ) {
        //         console.log('inside the loop, selectedData = ', listOfAnalytics[0])
        //           for(let i = 0; i < listOfAnalytics[outer][this.props.metric].length; i++) {
        //             let currPoint = {name: `${i}`, freeableMemory: listOfAnalytics[outer][this.state.metric][i - 1].Average}
        //             values.push(listOfAnalytics[outer][this.state.metric][i - 1].Average)
        //             pointsValues.push(currPoint)
        //           }
        //         }
        // }
        // else if (this.props.metric == 'ReadIOPS') {
        //     for (var outer = 0; outer < listOfAnalytics.length; outer++ ) {
        //         console.log('inside the loop, selectedData = ', listOfAnalytics[0])
        //           for(let i = 0; i < listOfAnalytics[outer][this.props.metric].length; i++) {
        //             let currPoint = {name: `${i}`, readIOPS: listOfAnalytics[outer][this.state.metric][i - 1].Average}
        //             values.push(listOfAnalytics[outer][this.state.metric][i - 1].Average)
        //             pointsValues.push(currPoint)
        //           }
        //         }

        // }
        // else {
        //     for (var outer = 0; outer < listOfAnalytics.length; outer++ ) {
        //         console.log('inside the loop, selectedData = ', listOfAnalytics[0])
        //           for(let i = 0; i < listOfAnalytics[outer][this.props.metric].length; i++) {
        //             let currPoint = {name: `${i}`, writeIOPS: listOfAnalytics[outer][this.state.metric][i - 1].Average}
        //             values.push(listOfAnalytics[outer][this.state.metric][i - 1].Average)
        //             pointsValues.push(currPoint)
        //           }
        //         }

        // }

        return listOfTotalPoints;
    }

    render() {
        
            // let pointsValues = []
            // let values = []
            // let dataMin = 0
            // let dataMax = 0
            // let listOfAnalytics = this.state.selectedData;
            // console.log('HERE SHOULD PRINT IF NO ERROR', listOfAnalytics)
            // console.log('this is the metric being passed in: ', this.props.metric)

            // for (var outer = 0; outer < listOfAnalytics.length; outer++ ) {
            // console.log('inside the loop, selectedData = ', listOfAnalytics[0])
            //   for(let i = 0; i < listOfAnalytics[outer][this.props.metric].length; i++) {
            //     let currPoint = {name: `${i}`, metric: listOfAnalytics[outer][this.state.metric][i - 1].Average}
            //     values.push(listOfAnalytics[outer][this.state.metric][i - 1].Average)
            //     pointsValues.push(currPoint)
            //   }
            // }
            let pointsValues = []
            let values = []
            let dataMin = 0
            let dataMax = 0
            let listOfAnalytics = this.state.selectedData;
            let listOfTotalPoints = []
            console.log('HERE SHOULD PRINT IF NO ERROR', listOfAnalytics[0][this.props.metric][0].Average)
            console.log('this is the metric being passed in: ', this.props.metric)

            // let totalPoints = this.state.pointsArray
            if(this.props.metric == 'CPUUtilization') {
                for (var outer = 0; outer < listOfAnalytics.length; outer++ ) {
                    console.log('inside the loop, selectedData = ', listOfAnalytics[0])
                    let pointsValues = []
                    for(let i = 0; i < listOfAnalytics[outer][this.props.metric].length; i++) {
                        let currPoint = {value: `${i}`, metric: listOfAnalytics[outer][this.props.metric][i].Average}
                        console.log('ADDING THIS VALUE TO VALUES []: ', listOfAnalytics[outer][this.props.metric][i].Average)
                        values.push(listOfAnalytics[outer][this.props.metric][i].Average)
                        console.log('ADDING THIS VALUE TO POINTS VALUES ARRAY: ', currPoint)
                        pointsValues.push(currPoint)
                    }
                    listOfTotalPoints.push(pointsValues)
                    }
            }

            // let totalValues = this.getTotalPoints();
            console.log('this is the total values!!!!!', listOfTotalPoints)
            // console.log("PointsValue" + pointsValues);
            dataMin = values.reduce(function(a, b) {
                return Math.min(a, b);
            });

            dataMax = values.reduce(function(a, b) {
                return Math.max(a, b);
            });
            dataMin = Math.floor(dataMin)
            dataMax= Math.ceil(dataMax)
            console.log('min: ', Math.floor(dataMin))
            console.log('max: ', Math.ceil(dataMax))
            
            let linecharts = [];

            for(let i = 0; i < listOfTotalPoints.length; i++) {
                linecharts.push(listOfTotalPoints[i])
            }

            return(
            <div>
            <div>
                {linecharts.map(lineData => (
                    <div>
                    <h3 style={{marginLeft:'20px'}}>{this.props.metric}</h3>
                <LineChart width={730} height={250} data={lineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[dataMin, dataMax]} label={{ value: 'y label here', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey='metric' stroke="#82ca9d" />
                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
                </div>
                  ))}

{/* 
                <h3 style={{marginLeft:'20px'}}>{this.props.metric}</h3>
                <LineChart width={730} height={250} data={listOfTotalPoints[0]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[dataMin, dataMax]} label={{ value: 'y label here', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey='metric' stroke="#82ca9d" />
                </LineChart> */}
            </div>
            <hr/>
            </div>
            );
    }
}
