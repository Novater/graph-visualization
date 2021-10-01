import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { graphActions } from '../slices/graphSlice';
import { Box, Button, ButtonGroup, Container } from '@mui/material';
import { 
  DEFAULT_GRAPH_DIMENSION_X,
  DEFAULT_SCREEN_X,
  DEFAULT_SCREEN_Y
} from '../config/index';

const useStyles = makeStyles(theme => ({
  blockedNode: {
    width: DEFAULT_SCREEN_X / DEFAULT_GRAPH_DIMENSION_X,
    height: DEFAULT_SCREEN_Y / DEFAULT_GRAPH_DIMENSION_X,
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  },
  emptyNode: {
    width: DEFAULT_SCREEN_X / DEFAULT_GRAPH_DIMENSION_X,
    height: DEFAULT_SCREEN_Y / DEFAULT_GRAPH_DIMENSION_X,
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 5
  },
  highlightedNode: {
    width: DEFAULT_SCREEN_X / DEFAULT_GRAPH_DIMENSION_X,
    height: DEFAULT_SCREEN_Y / DEFAULT_GRAPH_DIMENSION_X,
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 5
  },
  startNode: {
    width: DEFAULT_SCREEN_X / DEFAULT_GRAPH_DIMENSION_X,
    height: DEFAULT_SCREEN_Y / DEFAULT_GRAPH_DIMENSION_X,
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'green',
    borderRadius: 5    
  },
  endNode: {
    width: DEFAULT_SCREEN_X / DEFAULT_GRAPH_DIMENSION_X,
    height: DEFAULT_SCREEN_Y / DEFAULT_GRAPH_DIMENSION_X,
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'red',
    borderRadius: 5    
  },
  pathNode: {
    width: DEFAULT_SCREEN_X / DEFAULT_GRAPH_DIMENSION_X,
    height: DEFAULT_SCREEN_Y / DEFAULT_GRAPH_DIMENSION_X,
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'yellow',
    borderRadius: 5    
  },
  stackNode: {
    width: DEFAULT_SCREEN_X / DEFAULT_GRAPH_DIMENSION_X,
    height: DEFAULT_SCREEN_Y / DEFAULT_GRAPH_DIMENSION_X,
    display: 'inline-block',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'orange',
    borderRadius: 5    
  }
}));

const GraphNode = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const idXY = id.split(',');

  const node = useSelector((state) => state.graph.nodes[idXY[0]][idXY[1]]);
  const visited = useSelector((state) => state.graph.visited[idXY[0]][idXY[1]]);
  const { startNode, startNodeSelected, endNode, endNodeSelected, shortestPath, stack, buildingWall } = useSelector((state) => state.graph);

  const isNodeStartNode = (id) => id === startNode;
  const isNodeEndNode = (id) => id === endNode;
  const isPathNode = (id) => shortestPath.indexOf(id) >= 0;
  const isStackNode = (id) => stack.indexOf(id) >= 0;
  const isNodeEmpty = (node) => node === 1;
  const pathNumber = shortestPath.indexOf(id) >= 0 ? shortestPath.indexOf(id) + 1 : '';
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
    <svg onClick={() => { buildingWall ? addWall(id) : (startNodeSelected ? selectEndNode(id) : selectStartNode(id)) }} id={id} className={nodeType(node, visited, id)}>
    </svg>
  );
};

GraphNode.propTypes = {
  children: PropTypes.any
};

export default GraphNode;