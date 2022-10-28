import { Avatar, Container, Grid, Paper, Typography } from '@mui/material'

import { useAppSelector } from '@/redux'

const DashboardPage = () => {
  const user = useAppSelector(state => state.user)
  return (
    <Container sx={{ marginTop: 20 }}>
        <Paper style={{ padding: 70 }} >
      <Grid container spacing={3} flexDirection='row'>
          <Grid item xs={2}>
            <Avatar sx={{ width: 150, height: 150 }} src={user.avatar} />
          </Grid>
          <Grid item xs={6}>

          <Typography variant='h4'>Perfil</Typography>
          <Typography variant='body1'>Nome: {user.firstName}</Typography>
          <Typography variant='body1'>Apellido: {user.lastName}</Typography>
          <Typography variant='body1'>Email: {user.email}</Typography>
          <Typography variant='body1'>Dirección: {user.address}</Typography>
            <Typography variant='body1'>Teléfono: {user.phone}</Typography>
          </Grid>
      </Grid>
        </Paper>
    </Container>
  )
}
export default DashboardPage
