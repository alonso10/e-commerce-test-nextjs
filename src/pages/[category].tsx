/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Card, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Product {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}

const Category = ({ products }: { products: Product[] }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{router.query.category}</title>
        <meta name="description" content={`Products by category ${router.query.category}`} />
      </Head>
      <Typography gutterBottom variant="h3" component="h1">Products category {router.query.category}</Typography>
      <Grid container spacing={2}>
        {products && products.map(product => (
          <Grid item key={product.id}>
            <Card sx={{ maxWidth: 345, height: 400 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom noWrap variant="h5" component="div">
                  {product.title}
                </Typography>
                <Box                  
                  component="div" 
                  overflow="hidden"            
                  whiteSpace="pre-line"
                  textOverflow="ellipsis"
                  height={120}          
                >
                  {product.description}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const useGetProductsByCategory = async (category: string) => {  
  try {
    const request = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    const response = await request.json()
    return { data: response, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data, error } = await useGetProductsByCategory(context.query.category as string)
  let products = []
  if (error === null) {
    products = data
  }
  return {
    props: {
      products
    }
  }
}

export default Category