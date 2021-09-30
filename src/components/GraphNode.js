import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { 
  DEFAULT_GRAPH_DIMENSION_X,
  DEFAULT_GRAPH_DIMENSION_Y,
  DEFAULT_BGC,
  DEFAULT_OPACITY,
  DEFAULT_NODE_COLOR,
  DEFAULT_EDGE_COLOR,
  DEFAULT_LINK_OPACITY,
  DEFAULT_NODE_SIZE,
  DEFAULT_EDGE_SIZE,
  DEFAULT_ALPHA
} from '../config/index';

const useStyles = makeStyles(theme => ({
  node: {
    width: 40,
    height: 40,
    display: 'inline-block',
    border: '2px solid',
    borderColor: '#283747',
    borderRadius: 5
  }
}));

const GraphNode = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={className ? className : classes.node}>
    </div>
  );
};

GraphNode.propTypes = {
  children: PropTypes.any
};

export default GraphNode;