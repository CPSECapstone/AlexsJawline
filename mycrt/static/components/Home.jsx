import React, { Component } from 'react'
require('../styles/tabstyles.css')
import '../styles/homestyles.css'
import { Button, Glyphicon } from 'react-bootstrap';
import jquery from 'jquery';
import styles from '../styles/tabstyles.css.js'
import Analytics from './Analytics'
import Capture from './Capture'
import Replay from './Replay'
import {
  changeStateForComponents,
  getAnalyticsForGraph,
  setReplayCount,
  setCaptureCount,
  setDatabaseInstances,
  fetchCaptures,
  fetchReplays,
  fetchCapturesToReplay
} from '../actions/index';
import { connect } from 'react-redux'
import IssueModal from './issueModal'
import LogoutModal from './logoutModal'
import InfoAnalytics from './infoAnalytics'
import io from 'socket.io-client';


const uri = window.location.href;
const options = {};
const socket = io(uri, options);

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onCapture: true,
      onReplay: false,
      onAnalyze: false,
      captureTab: 'blue',
      replayTab: 'red',
      analyticsTab: 'orange',
      issueShow: false,
      logoutShow: false,
      analyticsInfoShow: false
    }

    this.setUpWebSocketReplayNumber = this.setUpWebSocketReplayNumber.bind(this);
    this.setUpWebSocketCaptureNumber = this.setUpWebSocketCaptureNumber.bind(this);
    this.setUpWebSocketAnalytics = this.setUpWebSocketAnalytics.bind(this);
    this.loadDatabaseInstances = this.loadDatabaseInstances.bind(this);

  }

  setUpWebSocketReplayNumber() {
    var that = this;
    socket.on('replayNumber', function (numReplays) {
      console.log('Replay Number update from backend: ', numReplays);
      that.props.dispatch(setReplayCount(numReplays))
      that.props.dispatch(fetchReplays());
    });
  }
  setUpWebSocketCaptureNumber() {
    var that = this;
    socket.on('captureNumber', function (numCaptures) {
      console.log('Capture Number update from backend: ', numCaptures);
      that.props.dispatch(setCaptureCount(numCaptures))
      that.props.dispatch(fetchCaptures());
      that.props.dispatch(fetchCapturesToReplay());

    });
  }
  setUpWebSocketAnalytics() {
    var that = this;
    socket.on('analytics', function (placeholder) {
      console.log('Analytics update from backend: ', placeholder);
      that.props.dispatch(getAnalyticsForGraph());
    });
  }

  loadDatabaseInstances() {
    let that = this;
    let returnList = []
    jquery.ajax({
      url: window.location.href + 'databaseInstances',
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json'
    }).done(function (data) {
      that.props.dispatch(setDatabaseInstances(data));
    })
  }

  componentWillMount() {
    this.setUpWebSocketCaptureNumber();
    this.setUpWebSocketReplayNumber();
    this.setUpWebSocketAnalytics();
    this.loadDatabaseInstances();
    this.props.dispatch(fetchCaptures());
    this.props.dispatch(fetchReplays());
    this.props.dispatch(fetchCapturesToReplay());
    socket.emit('get_capture_replay_number', 'Message from Home.jsx');
    setTimeout(this.props.dispatch(getAnalyticsForGraph()), 5000);
  }



  renderPage() {
    if (this.props.stateType === "onCapture") {
      return (
        <div className="tabcontent">
          <Capture />
        </div>
      )
    } else if (this.props.stateType == "onReplay") {
      return (
        <div className="tabcontent">
          <Replay />
        </div>
      )
    } else if (this.props.stateType == "onAnalyze") {
      return (
        <div className="tabcontent">
          <h3 style={{ marginLeft: '20px' }}>Analytics
          <Glyphicon style={{ paddingLeft: '20px', cursor: 'pointer' }} glyph="info-sign"
              onClick={() => this.setState({ analyticsInfoShow: true })} />
          </h3>
          <Analytics />
        </div>
      )
    }
  }

  currentAction(action) {
    if (action === 'capture') {
      if (this.props.activeCapturesNum > 1) {
        return (
          <div>{this.props.activeCapturesNum} Captures</div>
        )
      } else if (this.props.activeCapturesNum == 1) {
        return <div>1 Capture</div>
      } else {
        return <div>No Captures</div>
      }
    } else if (action === 'replay') {
      if (this.props.activeReplaysNum > 1) {
        return <div>{this.props.activeReplaysNum} Replays</div>
      } else if (this.props.activeReplaysNum == 1) {
        return <div>1 Replay</div>
      } else {
        return <div>No Replays</div>
      }
    }
  }

  render() {
    var captureActiveStyle =
      this.props.activeCapturesNum > 0 ? styles.active : styles.notActive
    var replayActiveStyle =
      this.props.activeReplaysNum > 0 ? styles.active : styles.notActive
    var tabActiveStyle = this.props.stateForComponents;
    var classNames = require('classnames');
    let issueClose = () => this.setState({ issueShow: false });
    let logoutClose = () => this.setState({ logoutShow: false });
    let analyticsInfoClose = () => this.setState({ analyticsInfoShow: false })

    return (
      <div>
        <div className="headerContainer">
          <div id="headerLeft">
            <div>
              <h4>In Progress:</h4>
            </div>
            <div id="captureProgress" className="progressBarContainer">
              <button style={captureActiveStyle} onClick={() => this.props.dispatch(changeStateForComponents("onCapture"))} className="progressButton">
                {this.currentAction('capture')}
              </button>
            </div>
            <div id="replayProgress" className="progressBarContainer">
              <button style={replayActiveStyle} onClick={() => this.props.dispatch(changeStateForComponents("onReplay"))} className="progressButton">
                {this.currentAction('replay')}
              </button>
            </div>
          </div>
          <div id="headerCenter">
            <h1>
              MyCRT
          </h1>
          </div>
          <div id="headerRight">

            <div id="userContainer">
              <div id="userLogoContainer">
                <span id="userLogo" className="glyphicon glyphicon-cog" onClick={() => this.setState({ logoutShow: true })}></span>
              </div>
            </div>
            <div id="issueContainer">
              <div>
                <Button
                  className='issueButton'
                  onClick={() => this.setState({ issueShow: true })}
                >Submit an Issue</Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="tab" >
            <button
              id="captureTabBtn"
              className={classNames({ 'tablinks': true, 'activeTab': this.props.stateType == 'onCapture' })}
              onClick={() => { console.log(this.props.stateType); this.props.dispatch(changeStateForComponents("onCapture")) }}
              type="button"
            >
              Capture
            </button>
            <button id="replayTabBtn" className={classNames({ 'tablinks': true, 'activeTab': this.props.stateType == 'onReplay' })}
              onClick={() => this.props.dispatch(changeStateForComponents("onReplay"))}>
              Replay
            </button>
            <button id="analyzeTabBtn" className={classNames({ 'tablinks': true, 'activeTab': this.props.stateType == 'onAnalyze' })}
              onClick={() => this.props.dispatch(changeStateForComponents("onAnalyze"))}>
              Analyze
            </button>
          </div>
          {this.renderPage()}
          <IssueModal show={this.state.issueShow} onHide={issueClose} />
          <LogoutModal show={this.state.logoutShow} onHide={logoutClose} store={this.props.data} />
          <InfoAnalytics show={this.state.analyticsInfoShow} onHide={analyticsInfoClose} />

        </div>
      </div >
    )
  }
}



const mapStateToProps = state => ({
  data: state,
  stateType: state.stateType,
  analyticsForGraph: state.analyticsForGraph,
  databaseInstances: state.databaseInstances,
  activeCapturesNum: state.activeCapturesNum,
  activeReplaysNum: state.activeReplaysNum
})

export default connect(mapStateToProps)(Home)
