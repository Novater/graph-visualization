import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import GraphNode from './GraphNode';
import { Box, Button, ButtonGroup, TextField, Container } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { graphActions } from '../slices/graphSlice';
import PropTypes from 'prop-types';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100% !important',
    width: '100% !important',
    padding: '0px !important',
    margin: '0px !important'
  },
  navbar: {
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
    fontFamily: 'bold',
    boxShadow: '3px 3px 3px #000000'
  },
  actionbar: {
    justifyContent: 'start',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 20,
    width: '100%',
    backgroundColor: theme.palette.secondary.main
  },
  actionButton: {
    backgroundColor: `${theme.palette.primary.dark} !important`,
    width: 180,
    height: 40,
    fontSize: '12px !important',
    marginBottom: '20px !important',
    marginRight: '20px !important',
    border: '4px dashed blue'
  },
  graph: {
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '1500px'
  },
  graphRow: {
    justifyContent: 'center',
    display: 'flex'
  },
  actionButtonGroup: {
    justifyContent: 'left',
    display: 'flex',
    flexDirection: 'row'
  },
  info: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    boxShadow: '3px 3px 3px #000000'
  },
  textSection: {
    backgroundColor: '#f5f5dc',
    padding: 30,
    marginLeft: 5,
    width: '100%',
    height: 630,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    boxShadow: '3px 3px 3px #000000'
  },
  infoRow: {
    border: '1px outset black',
    height: 30,
    width: 60,
    margin: 0,
    textAlign: 'center'
  },
  pathInfo: {
    width: '100%',
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
  },
  leftArrow: {
    border: 'solid black',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '3px',
    transform: 'rotate(135deg)',
    webkitTransform: 'rotate(135deg)'
  },
  actionText: {
    marginRight: '20px !important',
    '& .Mui-focused': {
      color: `${theme.palette.primary.main} !important`
    }
  }
}));

const Graph = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const nodes = useSelector((state) => state.graph.nodes, shallowEqual);
  const { numRows, numCols, runningDFS, runningBFS, runningDijkstra, runningManhattanDijkstra, startNode, startNodeSelected, endNode, endNodeSelected, pathExists, shortestPath, startTime, endTime } = useSelector((state) => state.graph);

  const initializeEmpty = () => dispatch(graphActions.initializeEmptyGraph());
  const initializeRandomGraph = () => dispatch(graphActions.initializeRandomGraph());
  const initializeRandomMaze = () => dispatch(graphActions.initializeRandomMaze());

  const dfsGraph = () => dispatch(graphActions.dfsGraph());
  const bfsGraph = () => dispatch(graphActions.bfsGraph());
  const dijkstraGraph = () => dispatch(graphActions.dijkstraGraph());
  const manhattanDijkstraGraph = () => dispatch(graphActions.manhattanDijkstraGraph());
  const startAddWalls = () => dispatch(graphActions.startAddingWalls());
  const setRow = (event) => dispatch(graphActions.setRow(event.target.value));
  const setColumn = (event) => dispatch(graphActions.setCol(event.target.value));

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

  const errorRows = isNaN(numRows) || (numRows % 2) === 0 || numRows <= 1 || numRows > 40;
  const errorCols = isNaN(numCols) || (numCols % 2) === 0 || numCols <= 1 || numCols > 80;

  return (
    <Container className={classes.root} maxWidth={false}>
      <Box className={classes.navbar}>Visualize your Problem</Box>
      <Box className={classes.actionbar}>
        <ButtonGroup className={classes.actionButtonGroup}>
          <Button variant='contained' className={classes.actionButton} onClick={initializeEmpty}>
            Empty Graph
          </Button>
          <Button variant='contained' className={classes.actionButton} onClick={initializeRandomGraph}>
            Random Graph
          </Button>
          <Button variant='contained' className={classes.actionButton} onClick={initializeRandomMaze}>
            Random Kruskal's Maze
          </Button>
          <Button variant='contained' className={classes.actionButton} onClick={startAddWalls}>
            Add Wall
          </Button>
          <Button variant='contained' className={classes.actionButton} onClick={dfsGraph}>
            DFS Traversal
          </Button>
          <Button variant='contained' className={classes.actionButton} onClick={bfsGraph}>
            BFS Traversal
          </Button>
          <Button variant='contained' className={classes.actionButton} onClick={dijkstraGraph}>
            Dijkstra Shortest Path
          </Button>
          <Button variant='contained' className={classes.actionButton} onClick={manhattanDijkstraGraph}>
            A* Path with Manhattan
          </Button>
        </ButtonGroup>
        <Box className={classes.actionButtonGroup}>
          <TextField
            className={classes.actionText}
            variant='standard'
            label='Number Rows'
            onChange={setRow}
            value={numRows}
            error={errorRows}
            helperText={errorRows ? 'Invalid Row  Entry' : ''}
          />
          <TextField
          className={classes.actionText}
            variant='standard'
            label='Number Columns'
            onChange={setColumn}
            value={numCols}
            error={errorCols}
            helperText={errorCols ? 'Invalid Column  Entry' : ''}
          />
          <TextField
            className={classes.actionText}
            variant='standard'
            label='Number Walls To Break'
          />
        </Box>
      </Box>
      <Box className={classes.info}>
        <Box className={classes.graph}>
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
        </Box>
        <Box className={classes.textSection}>
          <Box width='100%' marginBottom='10px'><b>Path:</b></Box>
          <Box marginBottom='20px' className={classes.pathInfo}>
            {
              shortestPath.map((node, idx) => {
                return <Box className={classes.infoRow} key={idx}><i className={classes.leftArrow}></i>{node}</Box>
              })
            }
            
          </Box>
          <Box width='100%' marginBottom='10px'><b>Path Cost:</b></Box>
          <Box width='100%' marginBottom='20px'>{shortestPath.length}</Box>

          <Box width='100%' marginBottom='10px'><b>{startNodeSelected ? `Start Node is:` : `Select a Start Node`}</b></Box>
          <Box marginBottom='20px'>{startNode}</Box>


          <Box width='100%' marginBottom='10px'><b>{endNodeSelected ? `End Node is:` : `Select an End Node`}</b></Box>
          <Box marginBottom='20px'>{endNode}</Box>

          <Box color='blue'>
            <b>{pathExists ? 'A path exists!' : ''}</b><br /> 
            <b>{pathExists ? `Time elapsed in seconds: ${moment.duration(endTime.diff(startTime)).asSeconds().toFixed(2)}` : ``}</b>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

Graph.propTypes = {
  children: PropTypes.any
};

export default Graph;