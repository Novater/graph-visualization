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
  }
}));

const isNodeEmpty = (node) => node === 1;


const isNodeHighlighted = (node) => node === 2;

const GraphNode = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const idXY = id.split(',');

  const node = useSelector((state) => state.graph.nodes[idXY[0]][idXY[1]]);
  const selectStartNode = (action) => dispatch(graphActions.selectStartNode(action));
  const nodeType = isNodeEmpty(node) ? classes.emptyNode : (isNodeHighlighted(node) ? classes.highlightedNode : classes.blockedNode);

  return (
    <Box onClick={() => selectStartNode(id)} id={id} className={nodeType}>
    </Box>
  );
};

GraphNode.propTypes = {
  children: PropTypes.any
};

export default GraphNode;