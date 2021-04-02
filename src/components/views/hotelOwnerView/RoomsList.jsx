import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '12rem',
    padding: '1rem',
    backgroundColor: theme.palette.background.paper,
  },
}))

const RoomsList = ({ roomsList, setRoomsList, forceUpdate }) => {
  const classes = useStyles()

  return (
    <div>
      <List className={`${classes.list} rooms-list`}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4>Rooms: </h4>
        </div>
        {roomsList.map((room, index) => {
          const labelId = `checkbox-list-label-${index}`

          return (
            <ListItem
              key={index}
              role={undefined}
              dense
              button
              className="room-list-item"
            >
              <ListItemText id={labelId} primary={`Room ${room.roomNumber}`} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    roomsList.splice(index, 1)
                    setRoomsList(roomsList)
                    forceUpdate()
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default RoomsList
