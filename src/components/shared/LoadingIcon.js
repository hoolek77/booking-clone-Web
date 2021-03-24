import CircularProgress from '@material-ui/core/CircularProgress'

export default function LoadingIcon(props) {
  return (
    <div className="d-flex justify-content-center">
      <CircularProgress />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
