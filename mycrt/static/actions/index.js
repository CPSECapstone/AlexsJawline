//Redux stuff
//Ask Yeng if you have questions!

import {
  SET_PUBLIC_KEY,
  SET_PRIVATE_KEY,
  CHANGE_KEYS,
  SET_AUTH,
  START_CAPTURE,
  SET_CAPTURE_COUNT,
  SET_REPLAY_COUNT,
  STOP_CAPTURE,
  SET_REPLAY,
  START_NEW_REPLAY,
  STOP_REPLAY,
  SET_DATA_POINTS_FOR_GRAPH,
  SET_METRIC_FOR_GRAPH,
  SET_BOOLEANS_FOR_GRAPH,
  SET_ANALYTICS_FOR_GRAPH,
  SET_CAPTURE_NAME_FOR_GRAPH,
  SET_TOTAL_NAMES_FOR_GRAPH,
  CHANGE_STATE_FOR_COMPONENTS,
  SET_GRAPH_DATA_FROM_REPLAY,
  SET_SELECTED_REPLAY,
  SET_CAPTURE_ACTIVE_LIST,
  SET_CAPTURE_COMPLETED_LIST,
  SET_CAPTURE_SCHEDULED_LIST,
  SET_REPLAY_ACTIVE_LIST,
  SET_REPLAY_COMPLETED_LIST,
  SET_DATABASE_INSTANCES,
  SET_IS_CAPTURES_LOADED,
  SET_IS_REPLAYS_LOADED
} from './constants'

export function setBooleansForGraph(key) {
  return { type: SET_BOOLEANS_FOR_GRAPH, key }
}

export function changeStateForComponents(key) {
   return { type: CHANGE_STATE_FOR_COMPONENTS, key }
}

export function setPublicKey(key) {
  return { type: SET_PUBLIC_KEY, key }
}

export function setPrivateKey(key) {
  return { type: SET_PRIVATE_KEY, key }
}

export function changeKeys(formState) {
  return { type: CHANGE_KEYS, formState }
}

export function setAuth() {
  return { type: SET_AUTH }
}

export function startCapture() {
  return { type: START_CAPTURE }
}

export function setCaptureCount(count) {
  return { type: SET_CAPTURE_COUNT, count }
}

export function setReplayCount(count) {
  return { type: SET_REPLAY_COUNT, count }
}

export function stopCapture() {
  return { type: STOP_CAPTURE }
}
export function setReplay() {
  return { type: SET_REPLAY }
}

export function startNewReplay() {
  return { type: START_NEW_REPLAY }
}

export function stopReplay() {
  return { type: STOP_REPLAY }
}

// export function setDataPointsForGraph(booleans, totalNames, metric1, analytics1, dataPoints1, captureName1) {
//   return { type: SET_DATA_POINTS_FOR_GRAPH, booleanArray: booleans, totalNameArray: totalNames, metric: metric1, analytics: analytics1, dataPoints: dataPoints1, captureName: captureName1 }
// }

export function setDataPointsForGraph(key) {
  return { type: SET_DATA_POINTS_FOR_GRAPH, key }
}

export function setMetricForGraph(key) {
  return { type: SET_METRIC_FOR_GRAPH, key }
}

export function setAnalyticsForGraph(key) {
  return { type: SET_ANALYTICS_FOR_GRAPH, key }
}

export function setTotalNamesForGraph(key) {
  return { type: SET_TOTAL_NAMES_FOR_GRAPH, key }
}

export function setCaptureNameForGraph(key) {
  return {type: SET_CAPTURE_NAME_FOR_GRAPH, key}
}

export function setGraphDataFromReplay(bools, capture, metric, state, names, selReplay) {
  return {type: SET_GRAPH_DATA_FROM_REPLAY, booleans: bools, captureName: capture, metricName: metric, stateName: state, totNames: names, selectedReplay: selReplay}
}

export function setSelectedReplay(key) {
  return {type: SET_SELECTED_REPLAY, key}
}

export function setCaptureActiveList(key) {
  return {type: SET_CAPTURE_ACTIVE_LIST, key}
}

export function setCaptureScheduledList(key) {
  return {type: SET_CAPTURE_SCHEDULED_LIST, key}
}

export function setCaptureCompletedList(key) {
  return {type: SET_CAPTURE_COMPLETED_LIST, key}
}

export function setReplayActiveList(key) {
  return {type: SET_REPLAY_ACTIVE_LIST, key}
}

export function setReplayCompletedList(key) {
  return {type: SET_REPLAY_COMPLETED_LIST, key}
}

export function setDatabaseInstances(key) {
  return {type: SET_DATABASE_INSTANCES, key}
}

export function setIsCapturesLoaded(key) {
  return {type: SET_IS_CAPTURES_LOADED, key}
}

export function setIsReplaysLoaded(key) {
  return {type: SET_IS_REPLAYS_LOADED, key}
}