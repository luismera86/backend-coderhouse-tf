import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import { getProducts, useAppDispatch, useAppSelector } from '@/redux'

import { Product } from '@/models'
import { useEffect } from 'react'

const Products = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  const products = useAppSelector(state => state.products)
  const onHandleAddToCart = (id: number) => {
    const product = products.find((product: Product) => product._id === id)
    if (product) {
    }
  }
  return (
    <Container>
      <Grid container flexDirection='row' spacing={3}>
        {products.map(product => (
          <Grid item key={product._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia component='img' height='140' image={product.thumbnail} alt={product.name} />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {product.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button onClick={() => onHandleAddToCart(product._id!)} sx={{ margin: 3 }} size='small' color='primary' variant='outlined'>
                Comprar
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
export default Products
