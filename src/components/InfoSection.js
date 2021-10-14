import { useSelector } from 'react-redux';
import moment from 'moment';
import { 
  Box,
  Grid
} from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textSection: {
    backgroundColor: '#F5F5DC',
    padding: 30,
    marginLeft: 5,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column !important',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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

const InfoSection = (props) => {
  const classes = useStyles();
  const { startNode, startNodeSelected, endNode, endNodeSelected, pathExists, shortestPath, startTime, endTime } = useSelector((state) => state.graph);

  return (
    <Grid item className={classes.textSection} xs={3}>
      <Box width='100%' marginBottom='10px'><b>Path:</b></Box>
      <Box marginBottom='20px' className={classes.pathInfo}>
        {
          shortestPath.map((node, idx) => {
            return <Box className={classes.infoRow} key={idx}><i className={classes.leftArrow}></i>{node}</Box>
          })
        }
        
      </Box>
      <Box width='100%' marginBottom='5px'><b>Path Cost:</b></Box>
      <Box width='100%' marginBottom='10px'>{shortestPath.length}</Box>
  
      <Box width='100%' marginBottom='5px'><b>{startNodeSelected ? `Start Node is:` : `Select a Start Node`}</b></Box>
      <Box marginBottom='10px'>{startNode}</Box>
  
  
      <Box width='100%' marginBottom='5px'><b>{endNodeSelected ? `End Node is:` : `Select an End Node`}</b></Box>
      <Box marginBottom='10px'>{endNode}</Box>
  
      <Box color='blue'>
        <b>{pathExists ? 'A path exists!' : ''}</b><br /> 
        <b>{pathExists ? `Time elapsed in seconds: ${moment.duration(endTime.diff(startTime)).asSeconds().toFixed(2)}` : ``}</b>
      </Box>
    </Grid>
  );
}

export default InfoSection;
