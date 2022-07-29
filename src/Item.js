import React from 'react'

const Item = (props) => {
    return (
        <>
            

                <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col justify-between s:gap-11 text-gray-700 font-semibold'>
                    <div className='flex-1'>
                        <span className=''>{props.item.item_name}</span>
                    </div>

                    <div className=' text-gray-700 font-semibold flex-1 flex justify-evenly items-end w-full pr-6 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col s:gap-12 '>
                        <span className=' '>{props.item.item_qty}</span>
                        <span className=' '>{props.item.item_rate}</span>
                        <span className=' '>{props.item.item_tax}</span>
                        <span className=' '>{props.item.item_qty * props.item.item_rate}</span>
                    </div>
                </div>

                <div className='flex justify-between gap-12 items-center pr-12'>
                    <span className='mt-1 py-1 px-3 lg:w-20 md:w-20 sm:w-12 s:w-12 w-20 '>{props.item.item_desc}</span>
                    <i onClick={() => { props.deleteItem(props.item.id) }} className="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
                </div>
            
            <hr />
        </>
    )
}

export default Item