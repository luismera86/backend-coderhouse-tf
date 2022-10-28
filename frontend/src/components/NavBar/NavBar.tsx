import { AppBar, Avatar, Box, Button, Container, Grid, Stack, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useAppSelector } from '@/redux'

const NavBar = () => {
  const user = useAppSelector(state => state.user)
  return (
    <Box>
      <AppBar position='fixed'>
        <Toolbar>
          <Container maxWidth='xl'>
            <Grid container flexDirection='row' justifyContent='space-between'>
              <Grid item>
                <Stack flexDirection='row'>
                  <NavLink style={{ textDecoration: 'none' }} to='/home'>
                    <Button variant='contained'>Home</Button>
                  </NavLink>
                  <NavLink style={{ textDecoration: 'none', marginLeft: 10 }} to={'/dashboard'}>
                    <Button variant='contained'>Perfil</Button>
                  </NavLink>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Typography>{user.firstName}</Typography>
                  <Link to={'/dashboard'}>
                    <Avatar alt={user ? user.firstName : ''} src={user ? user.avatar : ''} />
                  </Link>
                  <Link to={'/cart'} style={{textDecoration: 'none'}}>
                    <ShoppingCartOutlinedIcon color='action' />
                  </Link>
                  <Button color='inherit'>Salir</Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
