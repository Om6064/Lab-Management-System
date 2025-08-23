import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContentProvider'

const Counter = () => {
   
    const {count,setCount} = useContext(AuthContext)
    console.log(count,setCount);
    
    
    return (
        <div>

        </div>
    )
}

export default Counter