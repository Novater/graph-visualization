import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import GraphNode from './GraphNode';
import { Box, Button, ButtonGroup, Container } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { graphActions } from '../slices/graphSlice';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100% !important',
    width: '100% !important',
    padding: '0 !important'
  },
  navbar: {
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
    fontFamily: 'bold'
  },
  actionbar: {
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    padding: 80,
    backgroundColor: theme.palette.secondary.main
  },
  actionButton: {
    backgroundColor: `${theme.palette.primary.dark} !important`,
    width: 200,
    height: 50,
    marginLeft: '20px !important',
    marginRight: '20px !important',
    border: '4px dashed blue'
  },
  graph: {
    justifyContent: 'center',
    position: 'relative',
    display: 'flex',
    height: '100%',
    minHeight: '100%'
  },
  graphRow: {
    justifyContent: 'center',
    display: 'flex'
  }
}));

const Graph = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const nodes = useSelector((state) => state.graph.nodes, shallowEqual);
  console.log(nodes)
  const { runningDFS, runningBFS } = useSelector((state) => state.graph);

  const initializeEmpty = () => dispatch(graphActions.initializeEmptyGraph());
  const initializeRandom = () => dispatch(graphActions.initializeRandomGraph());

  const addNode = () => dispatch(graphActions.addNode());
  const addEdge = () => dispatch(graphActions.addEdge());
  const dfsGraph = () => dispatch(graphActions.dfsGraph());
  const bfsGraph = () => dispatch(graphActions.bfsGraph());
  

  useEffect(() => {
    if (runningDFS) {
      const interval = setInterval(() => {
        return dispatch(graphActions.stepDFS());
      }, 50);
      return () => clearInterval(interval);
    }
  }, [runningDFS, dispatch]);

  useEffect(() => {
    if (runningBFS) {
      const interval = setInterval(() => {
        return dispatch(graphActions.stepBFS());
      }, 50);
      return () => clearInterval(interval);
    }
  }, [runningBFS, dispatch]);

  return (
    <Container className={classes.root} maxWidth="xl">
      <Box className={classes.navbar}>Project by Jonathan Ku</Box>
      <Box className={classes.actionbar}>
        <Button color='primary' variant="contained" className={classes.actionButton} onClick={initializeEmpty}>
          Initialize Empty Graph
        </Button>
        <Button variant="contained" className={classes.actionButton} onClick={initializeRandom}>
          Initialize Random Graph
        </Button>
        <Button variant="contained" className={classes.actionButton} onClick={dfsGraph}>
          Run Depth First Search
        </Button>
        <Button variant="contained" className={classes.actionButton} onClick={bfsGraph}>
          Run Breadth First Search
        </Button>
      </Box>
      {
        nodes.map((row, idxRow) => { 
          return (
            <Box key={idxRow} className={classes.graphRow}>{ 
              row.map((cell, idxCol) => {
                const idCell = `${idxRow},${idxCol}`
                return <GraphNode key={idCell} id={idCell}></GraphNode> }
              )
            }</Box>
          );
        })
      }
    </Container>
  );
};

Graph.propTypes = {
  children: PropTypes.any
};

export default Graph;