import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { graphActions } from '../slices/graphSlice';
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
  }
}));

const isNodeEmpty = (id, nodes) => {
  const idXY = id.split(',');
  const idRow = idXY[0];
  const idCol = idXY[1];

  return nodes[idRow][idCol];
}
const GraphNode = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const nodes = useSelector((state) => state.graph.nodes);
  const selectStartNode = (action) => dispatch(graphActions.selectStartNode(action));

  return (
    <svg onClick={() => selectStartNode(id)} id={id} className={isNodeEmpty(id, nodes) ? classes.emptyNode : classes.blockedNode }>
    </svg>
  );
};

GraphNode.propTypes = {
  children: PropTypes.any
};

export default GraphNode;