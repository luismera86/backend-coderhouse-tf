import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { deleteProductFromCart, useAppDispatch, useAppSelector } from '@/redux'

import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect } from 'react'

const Cart = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart)
  useEffect(() => {}, [cart])
  const onHandleDelete = (id: number) => dispatch(deleteProductFromCart(id))

  return (
    <Container>
      <Grid container spacing={2}>
        {cart.products?.length! > 0 ? (
          cart.products?.map!(cart => (
            <Grid xs={12} item key={cart._id}>
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
          <div>Carrito vació</div>
        )}
      </Grid>
    </Container>
  )
}
export default Cart
