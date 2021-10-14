import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import GraphNode from './GraphNode';
import { 
  Box,
  Grid
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { graphActions } from '../slices/graphSlice';
import PropTypes from 'prop-types';
import { DEFAULT_GRAPH_DIMENSION_Y } from '../config';

const useStyles = makeStyles(theme => ({
  graph: {
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  graphRow: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%'
  }
}));

const Graph = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const nodes = useSelector((state) => state.graph.nodes, shallowEqual);
  const { numRows, runningDFS, runningBFS, runningDijkstra, runningManhattanDijkstra } = useSelector((state) => state.graph);
  useEffect(() => {
    if (runningDFS) {
      const interval = setInterval(() => {
        return dispatch(graphActions.stepDFS());
      }, 1);
      return () => clearInterval(interval);
    }
  }, [runningDFS, dispatch]);

  useEffect(() => {
    if (runningBFS) {
      const interval = setInterval(() => {
        return dispatch(graphActions.stepBFS());
      }, 1);
      return () => clearInterval(interval);
    }
  }, [runningBFS, dispatch]);

  useEffect(() => {
    if (runningDijkstra) {
      const interval = setInterval(() => {
        return dispatch(graphActions.stepDijkstra());
      }, 1);
      return () => clearInterval(interval);
    }
  }, [runningDijkstra, dispatch]);

  useEffect(() => {
    if (runningManhattanDijkstra) {
      const interval = setInterval(() => {
        return dispatch(graphActions.stepManhattanDijkstra());
      }, 1);
      return () => clearInterval(interval);
    }
  }, [runningManhattanDijkstra, dispatch]);

  return (
    <Grid item className={classes.graph} xs={9}>
    {
      nodes.map((row, idxRow) => { 
        return (
          <Box key={idxRow} className={classes.graphRow} height={`${100 / numRows || DEFAULT_GRAPH_DIMENSION_Y}%`}>{ 
            row.map((cell, idxCol) => {
              const idCell = `${idxRow},${idxCol}`
              return <GraphNode key={idCell} id={idCell}></GraphNode> }
            )
          }</Box>
        );
      })
    }
    </Grid>
  );
};

Graph.propTypes = {
  children: PropTypes.any
};

export default Graph;