import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import GraphNode from './GraphNode';
import { Box, Button, Container } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { graphActions } from '../slices/graphSlice';
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
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80,
    maxWidth: 'lg'
  },
  actionbar: {
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
    padding: 80,
    backgroundColor: '#F3F3F3'
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
  },
  filledCell: {
    width: 40,
    height: 40,
    display: 'inline-block',
    border: '2px solid',
    borderColor: '#283747',
    borderRadius: 5,
    backgroundColor: 'black'
  },
  emptyCell: {
    width: 40,
    height: 40,
    display: 'inline-block',
    border: '2px solid',
    borderColor: '#283747',
    borderRadius: 5
  }
}));

const Graph = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const graph = useSelector((state) => JSON.parse(JSON.stringify(state.graph)));
  
  const { graphData } = graph;
  const { runningDFS } = graph;
  const { runningBFS } = graph;

  console.log(graphData);
  const initialize = () => dispatch(graphActions.initializeGraph());
  const addNode = () => dispatch(graphActions.addNode());
  const addEdge = () => dispatch(graphActions.addEdge());
  const dfsGraph = () => dispatch(graphActions.dfsGraph());
  const bfsGraph = () => dispatch(graphActions.bfsGraph());
  const initializePreset = () => dispatch(graphActions.initializePresetGraph());

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
    <Container className={classes.root}>
      <Box className={classes.actionbar}>
        <Button disableElevation variant="contained" onClick={initialize}>
          Initialize Graph
        </Button>
        <Button disableElevation variant="contained" onClick={initializePreset}>
          Initialize Preset Graph
        </Button>
        <Button disableElevation variant="contained" onClick={addNode}>
          Add Node
        </Button>
        <Button disableElevation variant="contained" onClick={addEdge}>
          Add Edge
        </Button>
        <Button disableElevation variant="contained" onClick={dfsGraph}>
          Run Depth First Search
        </Button>
        <Button disableElevation variant="contained" onClick={bfsGraph}>
          Run Breadth First Search
        </Button>
      </Box>
      {
        graphData.nodes.map((row, idx) => { 
          return (
            <Box key={idx} className={classes.graphRow}>{ 
              row.map((cell, idx) => {
                console.log(cell);
               return <GraphNode key={idx} id={idx} className={cell ? classes.emptyCell : classes.filledCell}>Test</GraphNode> }
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