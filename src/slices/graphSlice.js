import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { 
  DEFAULT_GRAPH_DIMENSION_X,
  DEFAULT_GRAPH_DIMENSION_Y,
  MANHATTAN_FACTOR
} from '../config/index';

const initialState = {
    nodes: [...Array(DEFAULT_GRAPH_DIMENSION_Y)].map((row) => new Array(DEFAULT_GRAPH_DIMENSION_X).fill(1)),
    startNode: '',
    startNodeSelected: false,
    endNode: '',
    endNodeSelected: false,
    stack: [],
    visited: [...Array(DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(DEFAULT_GRAPH_DIMENSION_X).fill(false))),
    runningDFS: false,
    runningBFS: false,
    runningDijkstra: false,
    runningManhattanDijkstra: false,
    pathExists: false,
    parent: [...Array(DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(DEFAULT_GRAPH_DIMENSION_X).fill(null))),
    distances: [...Array(DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(DEFAULT_GRAPH_DIMENSION_X).fill(Infinity))),
    shortestPath: [],
    buildingWall: false,
    startTime: null,
    endTime: null,
    numRows: DEFAULT_GRAPH_DIMENSION_Y,
    numCols: DEFAULT_GRAPH_DIMENSION_X
};

const oneDFSStep = (startNode, endNode, nodes, stack, visited) => {

  if (stack.length === 0) {
    return;
  }

  const currNode = stack.shift();

  if (currNode === endNode) {
    return {
      stack,
      visited,
      runningDFS: false,
      pathExists: true
    };
  };

  const currNodeRowCol = currNode.split(',');
  const currNodeRow = currNodeRowCol[0];
  const currNodeCol = currNodeRowCol[1];

  if (visited[currNodeRow][currNodeCol]) {
    return {
      stack,
      visited
    };
  }

  visited[currNodeRow][currNodeCol] = true;

  if (nodes[currNodeRow][currNodeCol] === 0)  {
    return {
      stack,
      visited
    };
  }
  const neighbors = [];

  const up = Number(currNodeRow) - 1;
  const down = Number(currNodeRow) + 1;
  const left = Number(currNodeCol) - 1;
  const right = Number(currNodeCol) + 1;

  if (up >= 0) neighbors.push(`${up},${currNodeCol}`);
  if (down < nodes.length) neighbors.push(`${down},${currNodeCol}`);
  if (left >= 0) neighbors.push(`${currNodeRow},${left}`);
  if (right < nodes[0].length) neighbors.push(`${currNodeRow},${right}`);

  for (const neighbor of neighbors) {
    const neighborRowCol = neighbor.split(',');
    const neighborRow = neighborRowCol[0];
    const neighborCol = neighborRowCol[1];

    if (stack.indexOf(neighbor) >= 0 || visited[neighborRow][neighborCol]) continue;
    if (nodes[neighborRow][neighborCol] === 0) continue;

    stack.unshift(neighbor);
  }

  return {
    stack,
    visited
  };
};

const oneBFSStep = (startNode, endNode, nodes, stack, visited) => {
  if (stack.length === 0) {
    return;
  }

  const currNode = stack.shift();

  if (currNode === endNode) {
    return {
      stack,
      visited,
      runningDFS: false,
      pathExists: true
    };
  };

  const currNodeRowCol = currNode.split(',');
  const currNodeRow = currNodeRowCol[0];
  const currNodeCol = currNodeRowCol[1];

  if (visited[currNodeRow][currNodeCol]) {
    return {
      stack,
      visited
    };
  }

  visited[currNodeRow][currNodeCol] = true;

  if (nodes[currNodeRow][currNodeCol] === 0)  {
    return {
      stack,
      visited
    };
  }

  const neighbors = [];

  const up = Number(currNodeRow) - 1;
  const down = Number(currNodeRow) + 1;
  const left = Number(currNodeCol) - 1;
  const right = Number(currNodeCol) + 1;

  if (up >= 0) neighbors.push(`${up},${currNodeCol}`);
  if (down < nodes.length) neighbors.push(`${down},${currNodeCol}`);
  if (left >= 0) neighbors.push(`${currNodeRow},${left}`);
  if (right < nodes[0].length) neighbors.push(`${currNodeRow},${right}`);

  for (const neighbor of neighbors) {
    const neighborRowCol = neighbor.split(',');
    const neighborRow = neighborRowCol[0];
    const neighborCol = neighborRowCol[1];

    if (stack.indexOf(neighbor) >= 0 || visited[neighborRow][neighborCol]) continue;
    if (nodes[neighborRow][neighborCol] === 0) continue;

    stack.push(neighbor);
  }

  return {
    stack,
    visited
  };
};

const oneDijkstraStep = (startNode, endNode, nodes, stack, visited, parent, distances, manhattan) => {
  if (stack.length === 0) {
    return;
  }

  stack.sort((node1, node2) => {
    const node1RowCol = node1.split(',');
    const node2RowCol = node2.split(',');
    
    const node1Row = node1RowCol[0];
    const node1Col = node1RowCol[1];
    const node2Row = node2RowCol[0];
    const node2Col = node2RowCol[1];

    const endNodeRowCol = endNode.split(',');
    const endNodeRow = endNodeRowCol[0];
    const endNodeCol = endNodeRowCol[1];

    const weightNode1 = manhattan ? distances[node1Row][node1Col] + MANHATTAN_FACTOR * (Math.abs(endNodeRow - node1Row) + Math.abs(endNodeCol - node1Col)) : distances[node1Row][node1Col];
    const weightNode2 = manhattan ? distances[node2Row][node2Col] + MANHATTAN_FACTOR * (Math.abs(endNodeRow - node2Row) + Math.abs(endNodeCol - node2Col)) : distances[node2Row][node2Col];
    return weightNode1 - weightNode2;
  });

  const currNode = stack.shift();
  const currNodeRowCol = currNode.split(',');
  const currNodeRow = currNodeRowCol[0];
  const currNodeCol = currNodeRowCol[1];
  let pathTraverseNode = parent[currNodeRow][currNodeCol];

  let shortestPath = [];
  shortestPath.push(currNode);

  while (pathTraverseNode) {
    shortestPath.push(pathTraverseNode);

    const pathTraverseNodeRowCol = pathTraverseNode.split(',');
    const pathTraverseNodeRow = pathTraverseNodeRowCol[0];
    const pathTraverseNodeCol = pathTraverseNodeRowCol[1];
    pathTraverseNode = parent[pathTraverseNodeRow][pathTraverseNodeCol];
  }

  if (currNode === endNode) {
    return {
      stack,
      visited,
      shortestPath,
      runningDijkstra: false,
      pathExists: true
    };
  };

  if (visited[currNodeRow][currNodeCol]) {
    return {
      stack,
      visited,
      parent,
      distances
    };
  }

  visited[currNodeRow][currNodeCol] = true;

  if (nodes[currNodeRow][currNodeCol] === 0)  {
    return {
      stack,
      visited,
      parent,
      distances
    };
  }

  const neighbors = [];

  const up = Number(currNodeRow) - 1;
  const down = Number(currNodeRow) + 1;
  const left = Number(currNodeCol) - 1;
  const right = Number(currNodeCol) + 1;

  if (up >= 0) neighbors.push(`${up},${currNodeCol}`);
  if (down < nodes.length) neighbors.push(`${down},${currNodeCol}`);
  if (left >= 0) neighbors.push(`${currNodeRow},${left}`);
  if (right < nodes[0].length) neighbors.push(`${currNodeRow},${right}`);

  for (const neighbor of neighbors) {
    const neighborRowCol = neighbor.split(',');
    const neighborRow = neighborRowCol[0];
    const neighborCol = neighborRowCol[1];

    if (nodes[neighborRow][neighborCol] === 0) continue;

    const distanceCurr = distances[currNodeRow][currNodeCol];
    const nextDist = distanceCurr + 1;

    if (nextDist < distances[neighborRow][neighborCol]) {
      distances[neighborRow][neighborCol] = distanceCurr + 1;
      parent[neighborRow][neighborCol] = currNode;
    }

    if (stack.indexOf(neighbor) >= 0 || visited[neighborRow][neighborCol]) continue;

    stack.push(neighbor);
  }

  return {
    stack,
    visited,
    parent,
    distances,
    shortestPath
  };
};

const slice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    initializeEmptyGraph: (state) => {
      const defaultData = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row) => new Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(1));

      return {
        ...state,
        startNode: '',
        startNodeSelected: false,
        endNode: '',
        endNodeSelected: false,
        stack: [],
        visited: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(false))),
        nodes: defaultData,
        runningDFS: false,
        runningBFS: false,
        runningDijkstra: false,
        runningManhattanDijkstra: false,
        pathExists: false,
        parent: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(null))),
        distances: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(Infinity))),
        shortestPath: [],
        buildingWall: false,
        startTime: null,
        endTime: null
      }
    },
    initializeRandomGraph: (state) => {
      return {
        ...state,
        nodes: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row) => {
            return [...Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X)].map((cell) => Math.floor(Math.random() * 2))
        }),
        startNode: '',
        startNodeSelected: false,
        endNode: '',
        endNodeSelected: false,
        stack: [],
        visited: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(false))),
        runningDFS: false,
        runningBFS: false,
        runningDijkstra: false,
        runningManhattanDijkstra: false,
        pathExists: false,
        parent: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(null))),
        distances: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(Infinity))),
        shortestPath: [],
        buildingWall: false,
        startTime: null,
        endTime: null
      }
    },
    initializeRandomMaze: (state) => {
      const init = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row, indexRow) => {
        return [...Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X)].map((cell, indexCell) => indexRow % 2 ? 0 : (indexCell % 2) ? 0 : 1)
      });

      const unionMap = new Map();
      const edges = [];

      init.map((row, indexRow) => row.map((cell, indexCell) => {
        if (cell) {
          unionMap.set(`${indexRow},${indexCell}`, new Set([`${indexRow},${indexCell}`]));
        } else {
          if ((indexRow % 2 && !(indexCell % 2)) || !(indexRow % 2)) {
            edges.push(`${indexRow},${indexCell}`);
          }
        }
      }));

      for (let i = edges.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = edges[i];
        edges[i] = edges[j];
        edges[j] = temp;
      }

      while (edges.length > 0) {
        const edgeConsidered = edges.shift();
        const edgeConsideredRowCol = edgeConsidered.split(',');
        const edgeConsideredRow = Number(edgeConsideredRowCol[0]);
        const edgeConsideredCol = Number(edgeConsideredRowCol[1]);

        let considerLeftRight = false;
        let considerTopDown = false;

        if (edgeConsideredRow % 2) {
          considerTopDown = true;
        } else {
          considerLeftRight = true;
        }

        if (considerTopDown) {
          const topNodeSet = unionMap.get(`${edgeConsideredRow - 1},${edgeConsideredCol}`);
          const bottomNodeSet = unionMap.get(`${edgeConsideredRow + 1},${edgeConsideredCol}`);
          const mergedSets = new Set([...topNodeSet, ...bottomNodeSet]);
          if (mergedSets.size > topNodeSet.size) {
            for (let node of mergedSets) {
              unionMap.set(node, mergedSets);
              init[edgeConsideredRow][edgeConsideredCol] = 1;
            }
          }
        }

        if (considerLeftRight) {
          const leftNodeSet = unionMap.get(`${edgeConsideredRow},${edgeConsideredCol - 1}`);
          const rightNodeSet = unionMap.get(`${edgeConsideredRow},${edgeConsideredCol + 1}`);
          const mergedSets = new Set([...leftNodeSet, ...rightNodeSet]);
          if (mergedSets.size > leftNodeSet.size) {
            for (let node of mergedSets) {
              unionMap.set(node, mergedSets);
              init[edgeConsideredRow][edgeConsideredCol] = 1;
            }
          } 
        }
      }
      return {
        ...state,
        nodes: init,
        startNode: '',
        startNodeSelected: false,
        endNode: '',
        endNodeSelected: false,
        stack: [],
        visited: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(false))),
        runningDFS: false,
        runningBFS: false,
        runningDijkstra: false,
        runningManhattanDijkstra: false,
        pathExists: false,
        parent: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(null))),
        distances: [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(Infinity))),
        shortestPath: [],
        buildingWall: false,
        startTime: null,
        endTime: null
      }
    },
    selectStartNode: (state, action) => ({
      ...state,
      startNode: action.payload,
      startNodeSelected: true
    }),
    selectEndNode: (state, action) => ({
      ...state,
      endNode: action.payload,
      endNodeSelected: true
    }),
    startAddingWalls: (state) => ({
      ...state,
      buildingWall: !state.buildingWall
    }),
    addWall: (state, action) => {
      const wallRowCol = action.payload.split(',');
      const wallRow = Number(wallRowCol[0]);
      const wallCol = Number(wallRowCol[1]);

      const nodes = [...state.nodes].map((row, rowIdx) => {
        if (rowIdx !== wallRow) return [...row];
        return [...row].map((col, colIdx) => {
          if (colIdx === wallCol) return 0;
          return col;
        });
      });

      return {
        ...state,
        nodes: nodes
      };
    },
    dfsGraph: (state) => {
      const stack = [state.startNode];
      const visited = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(false)));
      const parent = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(null)));
      const distances = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(Infinity)));
      const shortestPath = [];

      return {
        ...state,
        runningDFS: true,
        runningBFS: false,
        runningDijkstra: false,
        pathExists: false,
        stack,
        visited,
        parent,
        distances,
        shortestPath
      };
    },
    stepDFS: (state) => {
      const nodes = [...state.nodes].map((row) => {
        return [...row];
      });
      const visited = [...state.visited].map((row) => {
        return [...row];
      });
      const newDFSState = oneDFSStep(state.startNode, state.endNode, nodes, [...state.stack], visited);
      if (!newDFSState) {
        return {
          ...state,
          runningDFS: false
        };
      }
      if (newDFSState.pathExists) {
        return {
          ...state,
          runningDFS: false,
          pathExists: true
        };
      }
      return {
        ...state,
        stack: newDFSState.stack,
        visited: newDFSState.visited
      };
    },
    bfsGraph: (state) => {
      const stack = [state.startNode];
      const visited = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(false)));
      const parent = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(null)));
      const distances = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(Infinity)));
      const shortestPath = [];

      return {
        ...state,
        runningBFS: true,
        runningDFS: false,
        runningDijkstra: false,
        pathExists: false,
        stack,
        visited,
        parent,
        distances,
        shortestPath
      };
    },
    stepBFS: (state) => {
      const nodes = [...state.nodes].map((row) => {
        return [...row];
      });
      const visited = [...state.visited].map((row) => {
        return [...row];
      });
      const newBFSState = oneBFSStep(state.startNode, state.endNode, nodes, [...state.stack], visited);
      if (!newBFSState) {
        return {
          ...state,
          runningBFS: false
        };
      }
      if (newBFSState.pathExists) {
        return {
          ...state,
          runningBFS: false,
          pathExists: true
        };
      }
      return {
        ...state,
        stack: newBFSState.stack,
        visited: newBFSState.visited
      };
    },
    dijkstraGraph: (state) => {
      const stack = [state.startNode];
      const visited = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(false)));
      const parent = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(null)));
      const distances = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(Infinity)));
      const shortestPath = [];

      const startNodeRowCol = state.startNode.split(',');
      const startNodeRow = startNodeRowCol[0];
      const startNodeCol = startNodeRowCol[1];
      distances[startNodeRow][startNodeCol] = 0;
      const currentTime = moment();
      return {
        ...state,
        runningBFS: false,
        runningDFS: false,
        runningDijkstra: true,
        runningManhattanDijkstra: false,
        pathExists: false,
        stack,
        visited,
        parent,
        distances,
        shortestPath,
        startTime: currentTime
      };
    },
    manhattanDijkstraGraph: (state) => {
      const stack = [state.startNode];
      const visited = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(false)));
      const parent = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(null)));
      const distances = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map((row => Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(Infinity)));
      const shortestPath = [];

      const startNodeRowCol = state.startNode.split(',');
      const startNodeRow = startNodeRowCol[0];
      const startNodeCol = startNodeRowCol[1];
      distances[startNodeRow][startNodeCol] = 0;
      const currentTime = moment();
      return {
        ...state,
        runningBFS: false,
        runningDFS: false,
        runningDijkstra: false,
        runningManhattanDijkstra: true,
        pathExists: false,
        stack,
        visited,
        parent,
        distances,
        shortestPath,
        startTime: currentTime
      };
    },
    stepDijkstra: (state) => {
      const nodes = [...state.nodes].map((row) => {
        return [...row];
      });
      const visited = [...state.visited].map((row) => {
        return [...row];
      });
      const parent = [...state.parent].map((row) => {
        return [...row];
      });
      const distances = [...state.distances].map((row) => {
        return [...row];
      });

      const newDijkstraState = oneDijkstraStep(state.startNode, state.endNode, nodes, [...state.stack], visited, parent, distances);

      if (!newDijkstraState) {
        return {
          ...state,
          runningDijkstra: false
        };
      }
      if (newDijkstraState.pathExists) {
        const currentTime = moment();
        return {
          ...state,
          shortestPath: newDijkstraState.shortestPath,
          runningDijkstra: false,
          pathExists: true,
          endTime: currentTime
        };
      }

      return  {
        ...state,
        shortestPath: newDijkstraState.shortestPath,
        stack: newDijkstraState.stack,
        visited: newDijkstraState.visited,
        parent: newDijkstraState.parent,
        distances: newDijkstraState.distances
      };
    },
    stepManhattanDijkstra: (state) => {
      const nodes = [...state.nodes].map((row) => {
        return [...row];
      });
      const visited = [...state.visited].map((row) => {
        return [...row];
      });
      const parent = [...state.parent].map((row) => {
        return [...row];
      });
      const distances = [...state.distances].map((row) => {
        return [...row];
      });

      const newDijkstraState = oneDijkstraStep(state.startNode, state.endNode, nodes, [...state.stack], visited, parent, distances, true);

      if (!newDijkstraState) {
        return {
          ...state,
          runningManhattanDijkstra: false
        };
      }
      if (newDijkstraState.pathExists) {
        const currentTime = moment();
        return {
          ...state,
          shortestPath: newDijkstraState.shortestPath,
          runningManhattanDijkstra: false,
          pathExists: true,
          endTime: currentTime
        };
      }

      return  {
        ...state,
        shortestPath: newDijkstraState.shortestPath,
        stack: newDijkstraState.stack,
        visited: newDijkstraState.visited,
        parent: newDijkstraState.parent,
        distances: newDijkstraState.distances
      };
    },
    setRow: (state, action) => {
      const rows = action.payload;
      if (isNaN(rows) || Number(rows) % 2 === 0) {
        return { 
          ... state,
          numRows: Number(rows)
        };
      }
      
      const newNodes = [...Array(Number(rows))].map(row => new Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(1));
      const visited = [...Array(Number(rows))].map(row => new Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(false));
      const parent = [...Array(Number(rows))].map(row => new Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X).fill(null));
      const distances = [...Array(Number(rows))].map(row => new Array(state.numCols || DEFAULT_GRAPH_DIMENSION_X));

      return {
        ...state,
        nodes: newNodes,
        visited,
        parent,
        distances,
        numRows: Number(rows)
      };
    },
    setCol: (state, action) => {
      const columns = action.payload;
      if (isNaN(columns) || Number(columns) % 2 === 0) {
        return { 
          ... state,
          numCols: Number(columns)
        };
      }
      
      const newNodes = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map(row => new Array(Number(columns) || DEFAULT_GRAPH_DIMENSION_X).fill(1));
      const visited = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map(row => new Array(Number(columns) || DEFAULT_GRAPH_DIMENSION_X).fill(false));
      const parent = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map(row => new Array(Number(columns) || DEFAULT_GRAPH_DIMENSION_X).fill(null));
      const distances = [...Array(state.numRows || DEFAULT_GRAPH_DIMENSION_Y)].map(row => new Array(Number(columns) || DEFAULT_GRAPH_DIMENSION_X));

      return {
        ...state,
        nodes: newNodes,
        visited,
        parent,
        distances,
        numCols: Number(columns)
      };
    }
  }
});

export const { reducer: graphReducer, actions: graphActions } = slice;
export default graphReducer;