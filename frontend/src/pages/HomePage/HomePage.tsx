import { Container } from '@mui/material'
import { Products } from './components'

const HomePage = () => {
  return (
    <Container sx={{ marginTop: 9 }}>
      <Products />
    </Container>
  )
}

export default HomePage
