import { getProduct } from '@/app/action/appwrite'
import React from 'react'


interface ProductDetailProps {
    params: {
        id: string
    }
}
    
     type productprop = {
        $id: string,
        name: string,
        price: number,
        long_description: string,
        short_description: string,
        image: string,
    }
        
       
 const ProductDetail = async ({ params }: ProductDetailProps) => {
         const {id} = params

         const product = await getProduct(id);

         console.log(product);

         return(    
          <div className='grid grid-cols-1 md:grid-cols-4 py-5'>  
            <div className='col-span-1 md:col-span-2'>
              <img src={product?.images[0]} />
            </div>
            
            <div className='col-span-1 md:col-span-2'>

              <p className='py-5 text-2x1 font-bold'>{product?.Name}  <span>NGN {product?.Price}</span></p>
              <p>{product?.Long_Description}</p>
            </div>
            </div>
         )
 }



 export default ProductDetail