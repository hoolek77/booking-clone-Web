import React from 'react'

export const WelcomePage = ({ useStyles }) => {
  const classes = useStyles()
  return (
    <div className={classes.centerItems}>
      <h1>Welcome to the admin page!</h1>
    </div>
  )
}
