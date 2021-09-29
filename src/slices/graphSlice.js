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
      nodes: [ { id: 0, name: '0', color: DEFAULT_NODE_COLOR } ],
      links: [],
      searchState: {
        startNode: 0,
        stack: [0],
        visited: [],
        adjacencyMap: null
      }
    },
    runningDFS: false,
    runningBFS: false
};

const getNodeToSource = (graphData, maxNeighbors) => {
  let graphDataObj = JSON.parse(JSON.stringify(graphData));
  const links = graphDataObj.links;
  const nodes = graphDataObj.nodes;
  const neighbors = {};

  nodes.map(node => neighbors[node.id] = [] );

  for (const link of links) {
    neighbors[link.source].push(link.target);
    neighbors[link.target].push(link.source);
  }
  let randomNodeSource = Math.floor(Math.random() * nodes.length);
  console.log(randomNodeSource);
  // while (neighbors[randomNodeSource].length > maxNeighbors) {
  //   randomNodeSource = Math.floor(Math.random() * nodes.length);
  // }

  return randomNodeSource;
};

const buildAdjacencyMap = (graphData) => {
  let graphDataObj = JSON.parse(JSON.stringify(graphData));
  const links = graphDataObj.links;
  const nodes = graphDataObj.nodes;
  const neighbors = {};

  nodes.map(node => neighbors[node.id] = []);

  for (const link of links) {
    neighbors[link.source].push(link.target);
    neighbors[link.target].push(link.source);
  }

  return neighbors;
};

const stepDFS = (dfsState) => {
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

  const neighbors = adjacencyMap[currNode];

  for (const neighbor of neighbors) {
    if (visited[neighbor]) continue;
    stack.unshift(neighbor);
  }

  return {
    ...dfsState,
    stack,
    visited
  };
};

const stepBFS = (dfsState) => {
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

  const neighbors = adjacencyMap[currNode];

  for (const neighbor of neighbors) {
    if (visited[neighbor]) continue;
    stack.push(neighbor);
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
        nodes: [ { id: 0, name: '0', color: DEFAULT_NODE_COLOR } ],
        links: []
      };
      console.log('initializing graph');
      return {
        ...state,
        graphData: defaultData,
        runningDFS: false,
        runningBFS: false
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
            name: newNodeId,
            color: DEFAULT_NODE_COLOR
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
    dfsGraph: (state) => {
      const startNode = 0;
      const adjacencyMap = buildAdjacencyMap(state.graphData);
      const stack = [0];
      const visited = [];

      return {
        ...state,
        runningDFS: true,
        graphData: {
          ...state.graphData,
          searchState: {
            startNode: startNode,
            adjacencyMap: adjacencyMap,
            stack: stack,
            visited: visited
          }
        }
      };
    },
    stepDFS: (state) => {
      const graphData = JSON.parse(JSON.stringify(state.graphData));
      const newDFSState = stepDFS(graphData.searchState);

      if (!newDFSState) {
        return {
          ...state,
          runningDFS: false
        }
      }

      const newNodes = graphData.nodes.map((node) => newDFSState.visited[node.id] ? { ...node, color: 'red' } : { ...node });
      const newEdges = graphData.links.map((link) => { 
        if (newDFSState.visited[link.source] && newDFSState.visited[link.target]) {
          return { ...link, color: 'black' }
        } else if (newDFSState.visited[link.source] || newDFSState.visited[link.target]) {
          return { ...link, color: 'orange' }
        } else {
          return { ...link }
        }
      });
      return {
        ...state,
        graphData: {
          ...state.graphData,
          nodes: newNodes,
          links: newEdges,
          searchState: newDFSState
        }
      };
    },
    bfsGraph: (state) => {
      const startNode = 0;
      const adjacencyMap = buildAdjacencyMap(state.graphData);
      const stack = [0];
      const visited = [];

      return {
        ...state,
        runningBFS: true,
        graphData: {
          ...state.graphData,
          searchState: {
            startNode: startNode,
            adjacencyMap: adjacencyMap,
            stack: stack,
            visited: visited
          }
        }
      };     
    },
    stepBFS: (state) => {
      const graphData = JSON.parse(JSON.stringify(state.graphData));
      const newBFSState = stepBFS(graphData.searchState);

      if (!newBFSState) {
        return {
          ...state,
          runningBFS: false
        }
      }

      const newNodes = graphData.nodes.map((node) => newBFSState.visited[node.id] ? { ...node, color: 'red' } : { ...node });
      const newEdges = graphData.links.map((link) => { 
        if (newBFSState.visited[link.source] && newBFSState.visited[link.target]) {
          return { ...link, color: 'black' }
        } else if (newBFSState.visited[link.source] || newBFSState.visited[link.target]) {
          return { ...link, color: 'orange' }
        } else {
          return { ...link }
        }
      });
      return {
        ...state,
        graphData: {
          ...state.graphData,
          nodes: newNodes,
          links: newEdges,
          searchState: newBFSState
        }
      };
    },
  }
});

export const { reducer: graphReducer, actions: graphActions } = slice;
export default graphReducer;