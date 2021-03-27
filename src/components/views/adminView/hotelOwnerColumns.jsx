import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { Button } from '@material-ui/core'
import { LOADING } from '../../../constants'

export const hotelOwnerColumns = (loading, verify) => {
  return [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 200,
    },
    { field: 'email', headerName: 'Email', width: 130 },
    {
      field: 'isVerified',
      headerName: 'Veryfied',
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <VerifiedUserIcon color="secondary" />
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            onClick={(e) => {
              verify(params.id)
              e.target.innerHTML = LOADING
            }}
          >
            Verify
          </Button>
        ),
    },
  ]
}
