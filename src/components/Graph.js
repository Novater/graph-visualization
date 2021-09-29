import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ForceGraph2D from 'react-force-graph-2d';
import { Box, Button } from '@mui/material';
import { graphActions } from '../slices/graphSlice';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { 
  DEFAULT_GRAPH_NODES,
  DEFAULT_BGC,
  DEFAULT_OPACITY,
  DEFAULT_NODE_COLOR,
  DEFAULT_EDGE_COLOR,
  DEFAULT_LINK_OPACITY
} from '../config/index';

const Graph = () => {
  const dispatch = useDispatch();

  const graph = useSelector((state) => JSON.parse(JSON.stringify(state.graph)));

  const getColor = () => DEFAULT_NODE_COLOR;

  const drawNode = (id) => {
    return new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: DEFAULT_OPACITY
      })
    )
  };
  
  const { graphData } = graph;
  const { runningDFS } = graph;
  const { runningBFS } = graph;

  const initialize = () => { return dispatch(graphActions.initializeGraph()) };
  const addNode = () => { return dispatch(graphActions.addNode()) };
  const dfsGraph = () => { return dispatch(graphActions.dfsGraph()) };
  const bfsGraph = () => { return dispatch(graphActions.bfsGraph()) };

  useEffect(() => {
    if (runningDFS) {
      const interval = setInterval(() => {
        return dispatch(graphActions.stepDFS());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [runningDFS, dispatch]);

  useEffect(() => {
    if (runningBFS) {
      const interval = setInterval(() => {
        return dispatch(graphActions.stepBFS());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [runningBFS, dispatch]);

  return (
    <Box>
      <Button onClick={initialize}>
        Initialize Graph
      </Button>
      <Button onClick={addNode}>
        Add Node
      </Button>
      <Button onClick={dfsGraph}>
        Run Depth First Search
      </Button>
      <Button onClick={bfsGraph}>
        Run Depth First Search
      </Button>
      <ForceGraph2D
        graphData={graphData}
        // nodeThreeObject={({ id }) => drawNode(id)}
        linkWidth={3}
        backgroundColor={DEFAULT_BGC}
        linkOpacity={DEFAULT_LINK_OPACITY}
        enableZoomInteraction={false}
        warmupTicks={100}
        cooldownTicks={1}
      />
    </Box>
  );
};

Graph.propTypes = {
  children: PropTypes.any
};

export default Graph;