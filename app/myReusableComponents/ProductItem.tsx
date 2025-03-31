import React from 'react'
import { Card,CardHeader,CardContent,CardTitle,CardDescription, CardFooter, } from '@/components/ui/card' 

interface ProductItemProps{
  name: string,
  price: number,
  long_description: string,
  short_description: string,
  images: string,
}

const ProductItem = ({product}:{product:ProductItemProps}) => {
  return (
    <Card>



<CardHeader>
{product.name}

</CardHeader>

<CardContent>
<img src={product.images[0]} alt={product.name}  />
</CardContent>

<CardFooter>
{product.price}
</CardFooter>


    </Card>
  )
}

export default ProductItem