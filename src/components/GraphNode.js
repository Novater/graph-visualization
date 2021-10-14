import React from 'react';
import { makeStyles, Grow } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { graphActions } from '../slices/graphSlice';

import { 
  DEFAULT_GRAPH_DIMENSION_X
} from '../config/index';

const useStyles = makeStyles(theme => ({
  blockedNode: {
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  },
  emptyNode: {
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 5
  },
  highlightedNode: {
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 5
  },
  startNode: {
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'green',
    borderRadius: 5    
  },
  endNode: {
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'red',
    borderRadius: 5    
  },
  pathNode: {
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'yellow',
    borderRadius: 5    
  },
  stackNode: {
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'orange',
    borderRadius: 5    
  }
}));

const GraphNode = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const idXY = props.id.split(',');

  const node = useSelector((state) => state.graph.nodes[idXY[0]][idXY[1]]);
  const visited = useSelector((state) => state.graph.visited[idXY[0]][idXY[1]]);
  const { startNode, startNodeSelected, endNode, endNodeSelected, shortestPath, stack, buildingWall, numRows, numCols } = useSelector((state) => state.graph);

  const isNodeStartNode = (id) => id === startNode;
  const isNodeEndNode = (id) => id === endNode;
  const isPathNode = (id) => shortestPath.indexOf(id) >= 0;
  const isStackNode = (id) => stack.indexOf(id) >= 0;
  const isNodeEmpty = (node) => node === 1;
  const pathNumber = shortestPath.indexOf(props.id) >= 0 ? shortestPath.indexOf(props.id) + 1 : '';
  const selectStartNode = (action) => dispatch(graphActions.selectStartNode(action));
  const selectEndNode = (action) => dispatch(graphActions.selectEndNode(action));
  const addWall = (action) => {
    dispatch(graphActions.addWall(action));
  }

  const nodeType = (node, visited, id) => {
    if (isNodeStartNode(id)) {
      return classes.startNode;
    }
    if (isNodeEndNode(id)) {
      return classes.endNode;
    }
    if (isPathNode(id)) {
      return classes.pathNode;
    }
    if (isStackNode(id)) {
      return classes.stackNode;
    }
    if (visited) {
      return classes.highlightedNode;
    };

    if (isNodeEmpty(node)) {
      return classes.emptyNode;
    }
    return classes.blockedNode;
  };

  return (
    <svg height='100%' width={`${100 / (numCols || DEFAULT_GRAPH_DIMENSION_X) }%`} onClick={() => { buildingWall ? addWall(props.id) : (startNodeSelected ? selectEndNode(props.id) : selectStartNode(props.id)) }} id={props.id} className={nodeType(node, visited, props.id)}>
    </svg>
  );
};

GraphNode.propTypes = {
  children: PropTypes.any
};

export default GraphNode;