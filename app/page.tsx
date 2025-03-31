"use client"
import ProductItem from "./myReusableComponents/ProductItem";
import {useState, useEffect} from 'react'
import { listProducts } from '@/app/action/appwrite';



type productProps = {
        name: string,
        price: number,
        long_description: string,
        short_description: string,
        images: string,
 
}
const home = () =>{

const [products, setProducts] = useState<productProps[] | undefined>([])

const fetchProduct = async() => {
        try {
              const response = await listProducts()
              if(!response) throw new Error('No Product Found')



                   const formattedData = response.map((doc)=>(
                        {
                          name: doc.name,
                          price: doc.price,
                          long_description: doc.long_description,
                          short_description: doc.short_description,
                          images: doc.images


                        }
                   ))

                setProducts(formattedData)
        } catch (error) {
                console.log(error)
        }     
}

useEffect(() => {
        fetchProduct()
}, [])



return(
<div className="container mx-auto p-4">





        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {products?.map((product, index) =>(
           <ProductItem product={product} key={index}  />

             ))}
           

        </div>

</div>
)


}

 export default home; 