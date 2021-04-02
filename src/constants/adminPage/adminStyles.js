import { makeStyles } from '@material-ui/core'

export const adminStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: theme.palette.secondary.main,
  },
  centerItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '70vh',
    width: '60%',
    margin: '0 auto',
  },
  button: {
    background: theme.palette.error.main,
    color: 'white',
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  controlRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    position: 'relative',
    top: '10px',
    left: '20px',
  },
  grid: {
    height: '30%',
  },
}))
