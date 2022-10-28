import { Box, Button, Container, Grid, Paper, Stack, TextField } from '@mui/material'

import { User } from '@/models'
import { useAppDispatch } from '@/redux'
import { useForm } from '@/hooks'

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const { formInputState, handleInputChange } = useForm<User>({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    address: '',
    age: 0,
    avatar: '',
    phone: 0,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formInputState)
  }
  return (
    <Container maxWidth='xl' sx={{ padding: 7 }}>
      <Grid container direction='column' alignItems='center' justifyContent='center' sx={{ minHeight: '100vh' }}>
        <Grid item>
          <Paper elevation={5} sx={{ padding: '1.2rem', width: '40rem' }}>
            <Box component='form' onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name='firstName'
                  label='Nombre'
                  type='text'
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  name='lastName'
                  label='Apellido'
                  type='text'
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField name='email' label='Email' type='email' onChange={handleInputChange} fullWidth required />
                <TextField
                  name='phone'
                  label='Teléfono'
                  type='number'
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField name='age' label='Edad' type='number' onChange={handleInputChange} fullWidth required />
                <TextField
                  name='address'
                  label='Dirección'
                  type='text'
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField name='avatar' label='' type='file' onChange={handleInputChange} fullWidth required />
                <TextField
                  name='password'
                  label='Contraseña'
                  type='password'
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <Button type='submit' variant='outlined' fullWidth>
                  Registrar
                </Button>
                <Button type='reset' variant='outlined' fullWidth>
                  Borrar
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RegisterPage
