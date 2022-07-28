import React, { useState } from 'react'

const Abc = () => {
    const [first, setFirst] = useState('hello')
    const onChangeSender = (e)=>{
        setFirst(e.target.value)
        
    }

    return (
       <>
        <select onChange={onChangeSender} id="country" name="country" className="border-gray-300 focus:outline-none p-1 border h-3/4 bg-transparent text-gray-800 text-sm font-bold rounded">
            <option>United State</option>
            <option>China</option>
            <option>Pakistan</option>
            <option>Germany</option>
            <option>Australia</option>
            <option>Korea</option>
            <option>India</option>
        </select>
        {first}
       </>
    )
}

export default Abc