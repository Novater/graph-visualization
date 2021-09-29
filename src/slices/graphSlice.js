import { createSlice } from '@reduxjs/toolkit';
import { 
  DEFAULT_GRAPH_NODES,
  DEFAULT_BGC,
  DEFAULT_OPACITY,
  DEFAULT_NODE_COLOR,
  DEFAULT_EDGE_COLOR
} from '../config/index';

const initialState = {
    graphData: {
    nodes: [ { id: 0, name: '0' } ],
    links: [],
    runningDFS: false,
    dfsState: {}
  }
};

const getNodeToSource = (graphData, maxNeighbors) => {
  let graphDataObj = JSON.parse(JSON.stringify(graphData));
  const links = graphDataObj.links;
  const nodes = graphDataObj.nodes;
  const neighbors = new Map();

  nodes.map(node => neighbors.set(node.id, []));

  for (const link of links) {
    neighbors.get(link.source).push(link.target);
    neighbors.get(link.target).push(link.source);
  }
  let randomNodeSource = Math.floor(Math.random() * nodes.length);
  console.log('neighbors', neighbors)
  console.log(randomNodeSource)
  
  while (neighbors.get(randomNodeSource).length > maxNeighbors) {
    randomNodeSource = Math.floor(Math.random() * nodes.length);
  }

  return randomNodeSource;
};

const buildAdjacencyMap = (graphData) => {
  let graphDataObj = JSON.parse(JSON.stringify(graphData));
  const links = graphDataObj.links;
  const nodes = graphDataObj.nodes;
  const neighbors = new Map();

  nodes.map(node => neighbors.set(node.id, []));
  for (const link of links) {
    neighbors.get(link.source).push(link.target);
    neighbors.get(link.target).push(link.source);
  }
};

const stepDFS = (dfsState) => {
  console.log('dfsState', dfsState);
  const stack = dfsState.stack;
  const visited = dfsState.visited;
  const adjacencyMap = dfsState.adjacencyMap;

  if (stack.length === 0) {
    return;
  }

  const currNode = stack.shift();
  if (visited[currNode]) {
    return {
      ...dfsState,
      stack
    }
  }

  visited[currNode] = true;

  const neighbors = adjacencyMap.get(currNode);

  for (const neighbor of neighbors) {
    stack.unshift(neighbor);
  }

  return {
    ...dfsState,
    stack,
    visited
  };
};
const slice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    initializeGraph: (state) => {
      const defaultData = {
        nodes: [ { id: 0, name: '0' } ],
        links: []
      };
      console.log('initializing graph');
      return {
        ...state,
        graphData: defaultData,
        runningDFS: false
      }
    },
    addNode: (state) => {
      const newNodeId = state.graphData.nodes.length;
      const sourceNode = getNodeToSource(state.graphData, 5);
      return {
        ...state,
        graphData: {
          ...state.graphData,
          nodes: [...state.graphData.nodes, { 
            id: newNodeId,
            name: newNodeId
          }],
          links: [...state.graphData.links, 
            { 
              source: sourceNode,
              target: newNodeId,
              color: DEFAULT_EDGE_COLOR
            }
          ]
        }
      };
    },
    dfsGraph: (state, action) => {
      const startNode = 0;
      const adjacencyMap = buildAdjacencyMap(state.graphData);
      const stack = [0];
      const visited = [];

      return {
        ...state,
        runningDFS: true,
        dfsState: {
          startNode,
          adjacencyMap,
          stack,
          visited
        }
      };
    },
    stepDFS: (state, action) => {
      console.log('stepDFS');
      const graphData = JSON.parse(JSON.stringify(state.graphData));
      console.log('graphData', graphData);
      const newDFSState = stepDFS(graphData.dfsState);
      // console.log('newdfsstate', newDFSState);

      return {
        ...state
      };
    }
  }
});

export const { reducer: graphReducer, actions: graphActions } = slice;
export default graphReducer;