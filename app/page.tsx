"use client"
import ProductItem from "./myReusableComponents/ProductItem";
import {useState, useEffect} from 'react'
import { listProducts } from '@/app/action/appwrite';
import { Loader } from "lucide-react";
import { CartLoader } from '@/components/ui/LoadingCart';




type productProps = {
        name: string,
        price: number,
        long_description: string,
        short_description: string,
        images: string[]
        $id: string
}
const home = () =>{

const [products, setProducts] = useState<productProps[] | undefined>([])
const [loading, setLoading] = useState<boolean>(true)





const fetchProduct = async() => {
        try {
                setLoading(true)
              const response = await listProducts()
              if(!response) throw new Error('No Product Found')



                   const formattedData = response.map((doc)=>(
                        {
                          name: doc.name,
                          price: doc.price,
                          long_description: doc.long_description,
                          short_description: doc.short_description,
                          images: doc.images,
                        $id: doc.$id

                        }
                   ))

                setProducts(formattedData)
        } catch (error) {
                console.log(error)
        }     finally{
                setLoading(false)
        }
        

}

useEffect(() => {
        fetchProduct()
}, [])



return(
<div className="container mx-auto p-4">

{loading && (<div className="flex justify-center items-center h-screen">
                <CartLoader />
        </div>)}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
       {products?.map((product, index) =>(
        <ProductItem product={product} key={index} />
       ))}

        </div>

</div>
)


}

 export default home; 