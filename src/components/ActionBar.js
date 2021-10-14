import { 
  Box,
  Button,
  ButtonGroup,
  TextField,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles
} from '@material-ui/core';
import { graphActions } from '../slices/graphSlice';
import { DIALOG_PROMPT, PRESET_WALL_GRAPH, PRESET_SPIRAL_GRAPH } from '../config';

const useStyles = makeStyles(theme => ({
  actionbar: {
    justifyContent: 'start',
    display: 'flex',
    flexDirection: 'column',
    height: '16%',
    padding: '2%',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    boxSizing: 'border-box'
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
  actionButtonGroup: {
    justifyContent: 'left',
    height: '50%',
    display: 'flex',
    flexDirection: 'row'
  },
  actionText: {
    marginRight: '20px !important',
    '& .Mui-focused': {
      color: `${theme.palette.primary.main} !important`
    }
  }
}));

const ActionBar = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { numRows, numCols, dialogOpen } = useSelector((state) => state.graph);
  
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
  const uploadGraph = (event) => {
    console.log(event.target.value);
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0], 'UTF-8');
      reader.onload = e => {
        console.log('e.target.result', e.target.result);
        dispatch(graphActions.initializeCustomGraph(e.target.result));
      }
    } else {
      dispatch(graphActions.initializeCustomGraph(event.target.value));
    }
  };
  const openCustomGraph = () => dispatch(graphActions.openCustomTab());
  const handleCloseCustomGraph = () => dispatch(graphActions.closeCustomTab());

  const errorRows = isNaN(numRows) || (numRows % 2) === 0 || numRows <= 1;
  const errorCols = isNaN(numCols) || (numCols % 2) === 0 || numCols <= 1;

  return (
    <Box className={classes.actionbar}>
      <ButtonGroup className={classes.actionButtonGroup}>
        <Button variant='contained' className={classes.actionButton} onClick={openCustomGraph}>
          Custom Graphs
        </Button>
        <Dialog open={dialogOpen} onClose={handleCloseCustomGraph}>
          <DialogTitle>Use a Custom Graph Design</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {DIALOG_PROMPT}
            </DialogContentText>
          </DialogContent>
          <DialogActions>            
              <Button variant="contained" value={PRESET_WALL_GRAPH} onClick={uploadGraph} className={classes.actionButton}>
                Large Wall
              </Button>
              <Button variant="contained" value={PRESET_SPIRAL_GRAPH} onClick={uploadGraph} className={classes.actionButton}>
                Spiral
              </Button>
              <input
                accept='.txt'
                className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={uploadGraph}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" className={classes.actionButton}>
                  Upload Local File
                </Button>
              </label>
            </DialogActions>
        </Dialog>
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
      </Box>
    </Box>
  );
}

export default ActionBar;
