import React from 'react'

const Item = (props) => {
    return (
        <>
            <div className='flex justify-between py-2 text-gray-700 font-semibold'>
                <div>
                    <span className='mt-1 py-1 px-3 w-full'>{props.item.item_name}</span>
                </div>

                <div className='flex justify-between xl:gap-12 md:gap-14 sm:gap-10 s:gap-11 2xl:pr-0 md:pr-7 sm:pr-10 s:pr-4 pr-16'>
                    <span className='mt-1  py-1 px-3 lg:w-20 md:w-20 sm:w-12 s:w-12 w-20    '>{props.item.item_qty}</span>
                    <span className='mt-1  py-1 px-3 placeholder:font-normal placeholder:text-sm lg:w-20 md:w-20 sm:w-12 s:w-12 w-20    '>{props.item.item_rate}</span>
                    <span className='mt-1  py-1 px-3 lg:w-20 md:w-20 sm:w-12 s:w-12 w-20    '>{props.item.item_tax}</span>
                    <span className='lg:w-20'>{props.item.item_qty * props.item.item_rate}</span>
                </div>
            </div>
            <div className='flex justify-between items-center pr-12'>
                <span className='mt-1  py-1 px-3 lg:w-20 md:w-20 sm:w-12 s:w-12 w-20    '>{props.item.item_desc}</span>
                <i onClick={()=>{props.deleteItem(props.item.id)}} className="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
            </div>
            <hr />
        </>
    )
}

export default Item