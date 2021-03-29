import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

export default function LoadingIcon(props) {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      {...props}
    >
      <CircularProgress />
      <p className="sr-only">Loading...</p>
    </Grid>
  )
}
