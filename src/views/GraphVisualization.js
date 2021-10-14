import Graph from '../components/Graph';
import ActionBar from '../components/ActionBar';
import InfoSection from '../components/InfoSection';
import { makeStyles } from '@material-ui/core';
import { 
  Box,
  Grid,
  Container
} from '@mui/material';

const useStyles = makeStyles(theme => ({
  root: {
    height: '99vh',
    width: '100% !important',
    padding: '0px !important',
    margin: '0px !important'
  },
  navbar: {
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
    fontFamily: 'bold',
    boxShadow: '3px 3px 3px #000000',
    height: '2%'
  },
  info: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    height: '83%',
    boxShadow: '3px 3px 3px #000000',
    flexGrow: 1
  }
}));

const GraphVisualization = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false}>
      <Box className={classes.navbar}>Visualize your Problem</Box>
      <ActionBar></ActionBar>
      <Grid container className={classes.info}>
        <Graph></Graph>
        <InfoSection></InfoSection>
      </Grid>
    </Container>
  );
};

export default GraphVisualization;