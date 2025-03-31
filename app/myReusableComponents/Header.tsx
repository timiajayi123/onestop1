import { ShoppingCart } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#333333] text-white py-1 px-2 flex justify-between'>
       <div className='flex gap-3'>
        <div className='w-10 h-10'>
        <img src="logo.jpg" alt='logo' className="h-10 w-10 rounded-full"/>
        </div>
       <h3 className='font-bold'>One Stop Shop</h3>
       </div>

          <div className='flex gap-3'>
            <a href='#' className='hover:text-blue-200'>Home</a>
            <a href='#' className='hover:text-blue-200'>About</a>
            <a href='#' className='hover:text-blue-200'>Sign Up</a>
            <a href='#' className='hover:text-blue-200'><ShoppingCart/></a>
          
            




          </div>

    </div>
  )
}

export default Header