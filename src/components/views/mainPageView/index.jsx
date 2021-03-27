import React from 'react'

import { Grid, makeStyles } from '@material-ui/core'

import SearchBar from './SearchBar'
import { CityCard } from './CityCard'

import wroclaw from '../../../static/mainPageImgs/wroclaw.jpg'
import bydgoszcz from '../../../static/mainPageImgs/bydgosz.jpg'
import krakow from '../../../static/mainPageImgs/krakow.jpg'

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  height100: {
    height: '100%',
  },
}))

export const MainPageView = () => {
  const classes = useStyles()

  return (
    <div id="MainPageView" className="mainPageContainer">
      <Grid
        container
        spacing={4}
        justify="center"
        alignItems="center"
        direction="row"
        className={classes.height100}
      >
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.center}>
          <CityCard
            url={wroclaw}
            city="Wroclaw"
            cityDesc="See hotels in Wroclaw"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.center}>
          <CityCard
            url={bydgoszcz}
            city="Bydgoszcz"
            cityDesc="See hotels in Bydgoszcz"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.center}>
          <CityCard
            url={krakow}
            city="Krakow"
            cityDesc="See hotels in Krakow"
          />
        </Grid>
      </Grid>
    </div>
  )
}
