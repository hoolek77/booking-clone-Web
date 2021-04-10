import React from 'react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 400,
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
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export const CityCard = ({ url, city, cityDesc }) => {
  const classes = useStyles()
  return (
    <Link
      to={{ pathname: `/hotels/${city}`, state: { city: city } }}
      className={(classes.noUnderLine, classes.center)}
      style={{ width: '100%' }}
    >
      <Card className={classes.root} style={{ width: '100%' }}>
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
