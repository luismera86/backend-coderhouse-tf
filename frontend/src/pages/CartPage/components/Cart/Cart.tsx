import { Box, Container, Grid, Paper, Typography, dividerClasses } from '@mui/material'
import { removeFromCart, useAppDispatch, useAppSelector } from '@/redux'

import DeleteIcon from '@mui/icons-material/Delete'

const Cart = () => {
  const dispatch = useAppDispatch()
  const carts = useAppSelector(state => state.cart)
  const onHandleDelete = (id: number) => {
    const cart = carts.find(cart => cart._id === id)
    if (cart) {
      dispatch(removeFromCart(cart))
    } else {
      console.log('error')
    }
  }
  return (
    <Container>
      <Grid container  spacing={2}>
        {carts.length > 0 ? (
          carts.map(cart => (
            <Grid xs={12} item key={cart._id} >
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                <Box component='img' src={cart.thumbnail} alt={cart.name} sx={{ height: 100, width: 100 }} />
                <Typography>{cart.name}</Typography>
                <Typography>$ {cart.price}</Typography>
                  <DeleteIcon onClick={() => onHandleDelete(cart._id!)} fontSize='large' color='error' />
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <div>Carrito vacio</div>
        )}
      </Grid>
    </Container>
  )
}
export default Cart
