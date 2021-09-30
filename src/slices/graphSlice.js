import { createSlice } from '@reduxjs/toolkit';
import { 
  DEFAULT_GRAPH_DIMENSION_X,
  DEFAULT_GRAPH_DIMENSION_Y,
  DEFAULT_BGC,
  DEFAULT_OPACITY,
  DEFAULT_NODE_COLOR,
  DEFAULT_EDGE_COLOR,
  DEFAULT_PRESET_GRAPH_NODES
} from '../config/index';

const initialState = {
    nodes: [...Array(DEFAULT_GRAPH_DIMENSION_Y)].map((row) => new Array(DEFAULT_GRAPH_DIMENSION_X).fill(0)),
    searchState: {
      startNode: '',
      stack: [],
      visited: []
    },
    runningDFS: false,
    runningBFS: false
};

// const generatePresetGraph = () => {
//   const nodes = DEFAULT_PRESET_GRAPH_NODES.nodes;
//   const links = [];
//   for (const node of nodes) {
//     const nodeXY = node.name.split(',');
//     const nx = Number(nodeXY[0]);
//     const ny = Number(nodeXY[1]);
    
//     const left = nx - 1;
//     const right = nx + 1;
//     const up = ny - 1;
//     const down = ny + 1;
    
//     if (left > 0) links.push({ source: node.id, target: `${left},${ny}`, color: DEFAULT_EDGE_COLOR });
//     if (right <= 14) links.push({ source: node.id, target: `${right},${ny}`, color: DEFAULT_EDGE_COLOR });
//     if (up > 0) links.push({ source: node.id, target: `${nx},${up}`, color: DEFAULT_EDGE_COLOR });
//     if (down <= 14) links.push({ source: node.id, target: `${nx},${down}`, color: DEFAULT_EDGE_COLOR });
//   }

//   return {
//     nodes,
//     links
//   }
// }

// const buildAdjacencyMap = (graphData) => {
//   let graphDataObj = JSON.parse(JSON.stringify(graphData));
//   const links = graphDataObj.links;
//   const nodes = graphDataObj.nodes;
//   const neighbors = {};

//   nodes.map(node => neighbors[node.id] = []);

//   for (const link of links) {
//     if (neighbors[link.source].indexOf(link.target) < 0) neighbors[link.source].push(link.target);
//     if (neighbors[link.target].indexOf(link.source) < 0) neighbors[link.target].push(link.source);
//   }

//   return neighbors;
// };

const stepDFS = (dfsState) => {
  // const stack = dfsState.stack;
  // const visited = dfsState.visited;
  // const adjacencyMap = dfsState.adjacencyMap;

  // if (stack.length === 0) {
  //   return;
  // }

  // const currNode = stack.shift();
  // const currNodeXY = currNode.split(',');
  // const nx = currNodeXY[0];
  // const ny = currNodeXY[1];

  // if (visited[nx][ny]) {
  //   return {
  //     ...dfsState,
  //     stack
  //   }
  // }

  // visited[nx][ny] = true;

  // const neighbors = adjacencyMap[currNode];
  // for (const neighbor of neighbors) {
  //   const neighborXY = neighbor.split(',');
  //   const neighborX = neighborXY[0];
  //   const neighborY = neighborXY[1];
  //   if (visited[neighborX][neighborY]) continue;
  //   stack.unshift(neighbor);
  // }

  // return {
  //   ...dfsState,
  //   stack,
  //   visited
  // };
};

const stepBFS = (dfsState) => {
  // const stack = dfsState.stack;
  // const visited = dfsState.visited;
  // const adjacencyMap = dfsState.adjacencyMap;

  // if (stack.length === 0) {
  //   return;
  // }

  // const currNode = stack.shift();
  // const currNodeXY = currNode.split(',');
  // const nx = currNodeXY[0];
  // const ny = currNodeXY[1];

  // if (visited[nx][ny]) {
  //   return {
  //     ...dfsState,
  //     stack
  //   }
  // }

  // visited[nx][ny] = true;

  // const neighbors = adjacencyMap[currNode];

  // for (const neighbor of neighbors) {
  //   const neighborXY = neighbor.split(',');
  //   const neighborX = neighborXY[0];
  //   const neighborY = neighborXY[1];
  //   if (visited[neighborX][neighborY]) continue;
  //   stack.push(neighbor);
  // }

  // return {
  //   ...dfsState,
  //   stack,
  //   visited
  // };
};

const slice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    initializeEmptyGraph: (state) => {
      const defaultData = [...Array(DEFAULT_GRAPH_DIMENSION_Y)].map((row) => new Array(DEFAULT_GRAPH_DIMENSION_X).fill(1));

      return {
        ...state,
        nodes: defaultData,
        runningDFS: false,
        runningBFS: false
      }
    },
    initializeRandomGraph: (state) => {
      return {
        ...state,
        nodes: [...Array(DEFAULT_GRAPH_DIMENSION_Y)].map((row) => {
            return [...Array(DEFAULT_GRAPH_DIMENSION_X)].map((cell) => Math.floor(Math.random() * 2))
        }),
        runningDFS: false,
        runningBFS: false
      }
    },
    selectStartNode: (state, action) => {
      const nodeXY = action.payload.split(',');
      const nodeX = nodeXY[0];
      const nodeY = nodeXY[1];
      const newNodes = JSON.parse(JSON.stringify(state.nodes));
      newNodes[nodeX][nodeY] = 1;

      return {
        ...state,
        nodes: newNodes
      }
    },
    dfsGraph: (state) => {
      // const startNode = '0,0';
      // const adjacencyMap = buildAdjacencyMap(state.graphData);
      // const stack = ['0,0'];
      // const visited = [...Array(15)].map((row => Array(15).fill(false)));

      // return {
      //   ...state,
      //   runningDFS: true,
      //   graphData: {
      //     ...state.graphData,
      //     searchState: {
      //       startNode: startNode,
      //       adjacencyMap: adjacencyMap,
      //       stack: stack,
      //       visited: visited
      //     }
      //   }
      // };
    },
    stepDFS: (state) => {
      // const graphData = JSON.parse(JSON.stringify(state.graphData));
      // const newDFSState = stepDFS(graphData.searchState);
      // if (!newDFSState) {
      //   return {
      //     ...state,
      //     runningDFS: false
      //   }
      // }

      // const newNodes = graphData.nodes.map((node) => {
      //   const nodeXY = node.id.split(',');
      //   const nx = nodeXY[0];
      //   const ny = nodeXY[1];
      //   return newDFSState.visited[nx][ny] ? { ...node, color: 'red' } : { ...node };
      // });

      // const newEdges = graphData.links.map((link) => { 
      //   if (newDFSState.visited[link.source] && newDFSState.visited[link.target]) {
      //     return { ...link, color: 'black' }
      //   } else if (newDFSState.visited[link.source] || newDFSState.visited[link.target]) {
      //     return { ...link, color: 'orange' }
      //   } else {
      //     return { ...link }
      //   }
      // });
      // return {
      //   ...state,
      //   graphData: {
      //     ...state.graphData,
      //     nodes: newNodes,
      //     links: newEdges,
      //     searchState: newDFSState
      //   }
      // };
    },
    bfsGraph: (state) => {
      // const startNode = '0,0';
      // const adjacencyMap = buildAdjacencyMap(state.graphData);
      // const stack = ['0,0'];
      // const visited = [...Array(15)].map((row => Array(15).fill(false)));

      // return {
      //   ...state,
      //   runningBFS: true,
      //   graphData: {
      //     ...state.graphData,
      //     searchState: {
      //       startNode: startNode,
      //       adjacencyMap: adjacencyMap,
      //       stack: stack,
      //       visited: visited
      //     }
      //   }
      // };     
    },
    stepBFS: (state) => {
      // const graphData = JSON.parse(JSON.stringify(state.graphData));
      // const newBFSState = stepBFS(graphData.searchState);

      // if (!newBFSState) {
      //   return {
      //     ...state,
      //     runningBFS: false
      //   }
      // }

      // const newNodes = graphData.nodes.map((node) => {
      //   const nodeXY = node.id.split(',');
      //   const nx = nodeXY[0];
      //   const ny = nodeXY[1];
      //   return newBFSState.visited[nx][ny] ? { ...node, color: 'red' } : { ...node };
      // });

      // // const newEdges = graphData.links.map((link) => { 
      // //   if (newBFSState.visited[link.source] && newBFSState.visited[link.target]) {
      // //     return { ...link, color: 'black' }
      // //   } else if (newBFSState.visited[link.source] || newBFSState.visited[link.target]) {
      // //     return { ...link, color: 'orange' }
      // //   } else {
      // //     return { ...link }
      // //   }
      // // });
      // return {
      //   ...state,
      //   graphData: {
      //     ...state.graphData,
      //     nodes: newNodes,
      //     searchState: newBFSState
      //   }
      // };
    },
  }
});

export const { reducer: graphReducer, actions: graphActions } = slice;
export default graphReducer;