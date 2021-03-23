import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  media: {
    height: 140,
    backgroundSize: '100%',
    '&:hover': {
      backgroundSize: '105%',
    },
    transition: 'all .3s',
  },
  noUnderLine: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  imageZoom: {
    backgroundSize: '400px',
    '&:hover': {
      backgroundSize: '405px',
    },
  },
}))

export const CityCard = ({ url, city, cityDesc }) => {
  const classes = useStyles()
  return (
    <Link
      to={{ pathname: `/hotels/${city}`, state: { city: city } }}
      className={classes.noUnderLine}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={url} title={city} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {city}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {cityDesc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
