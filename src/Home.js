import React, { useState } from 'react'
import uploader from './Images/uploader.png'
import downloader from './Images/download.png'
const Home = () => {
    const [item, setItem] = useState({ item_name: '', item_qty: '', item_rate: '', item_tax: '', item_total: '0.00', item_desc: '' })

    return (
        <>
            <div className="header bg-emerald-600 h-12 flex items-center">
                <h1 className=' text-white ml-4 font-bold text-lg'>App logo</h1>

            </div>

            <div className="text-white flex flex-col items-center py-12 bg-emerald-500">
                <h1 className=' font-bold text-3xl'>Quickly Create</h1>
                <h1 className=' font-bold text-3xl'>and send invoices</h1>

                <h6 className='my-2 text-xl'>Fill your invoice details below, choose templete and then download/send/share it</h6>
            </div>

            <div className="form py-4 lg:px-64 relative -top-10  ">
                <div className='flex flex-col border p-6  shadow-lg shadow-gray-500/50 bg-white rounded-md'>

                    <div className='flex flex-row justify-between'>

                        <div className="mt-1 bg-slate-50 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="left flex flex-col items-center">
                                <img src={uploader} alt="upload here" className='w-10' />
                                <p className='text-center'>Drag your logo here, or <p className='text-emerald-500 font-bold' >browse</p></p>
                                <p className='text-zinc-500 '>Max. File size: 25 MB</p>
                            </div>
                        </div>

                        <div className="right flex flex-col gap-1 ">

                            <div className='flex items-center justify-end gap-2'>
                                <label htmlFor="invoice">Invoice #:</label>
                                <input type="text" name="invoiceNo" id="invoiceNo" placeholder='0001' className='mt-1 placeholder:text-gray-500 placeholder:font-semibold border border-gray-300 rounded p-1 w-20' />
                            </div>

                            <div className='flex flex-row items-center justify-end gap-2'>
                                <div className='flex justify-end'>
                                    <label htmlFor="date">Date: </label>
                                </div>
                                <input type="date" name="date" id="date" placeholder='0001' className='mt-1 border border-gray-300 rounded p-1 w-fit' />
                            </div>

                            <div className='flex flex-row items-center justify-end gap-2'>
                                <label htmlFor="dueDate">Due Date: </label>
                                <input type="date" name="dueDate" id="dueDate" placeholder='0001' className='mt-1 border border-gray-300 rounded p-1 w-fit' />
                            </div>

                            <div className='flex flex-row items-center justify-end gap-2'>
                                <label htmlFor="currency">Currency: </label>
                                <select id="currency" name="currency" className="border-gray-300 p-1 border h-full pl-2 pr-7 bg-transparent text-gray-800 text-sm font-bold rounded">
                                    <option>USD</option>
                                    <option>CAD</option>
                                    <option>EUR</option>
                                    <option>GBP</option>
                                    <option>PKR</option>
                                    <option>CHN</option>
                                    <option>CHF</option>
                                </select>
                            </div>


                        </div>

                    </div>

                    <div className='flex flex-row justify-between py-10'>
                        <div >
                            <h5 className='font-semibold text-gray-700'>From</h5>
                            <div className="mt-1 cursor-pointer gap-1 bg-slate-50 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md w-96">
                                <span className='font-semibold text-gray-600'>Sender Name</span>
                                <span className='text-zinc-400'>Sender Contact Details</span>
                            </div>
                        </div>

                        <div>
                            <h5 className='font-semibold text-gray-700'>To</h5>
                            <div className="mt-1 cursor-pointer gap-1 bg-slate-50 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md w-96">
                                <span className='font-semibold text-gray-600'>Recipient Name</span>
                                <span className='text-zinc-400'>Recipient Contact Details</span>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className='flex justify-between py-2 text-gray-700 font-semibold'>
                        <div>
                            <span>ITEM</span>
                        </div>

                        <div className='flex justify-between gap-14 pr-7'>
                            <span>HRS/QTY</span>
                            <span>RATE</span>
                            <span>TAX</span>
                            <span>SUBTOTAL</span>
                        </div>
                    </div>

                    <hr />

                    <div className='flex justify-between py-2 text-gray-700 font-semibold'>
                        <div>
                            <input type="text" name="item_name" id="item_name" placeholder='Item Name' className='mt-1 border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm w-full ' />
                        </div>

                        <div className='flex justify-between gap-7 '>
                            <span></span>
                            <input type="text" name="item_qty" id="item_qty" className='mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm lg:w-20 ' />
                            <input type="text" name="item_rate" id="item_rate" className='mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm lg:w-20 ' />
                            <input type="text" name="item_tax" id="item_tax" className='mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm lg:w-20 ' />
                            <span className='lg:w-20'>{item.item_total}</span>
                        </div>
                    </div>
                    <div>
                        <input type="text" name="item_desc" id="item_desc" placeholder='Description' className='mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm lg:w-96' />
                    </div>

                    <hr className='mt-6' />

                    <span className='text-emerald-500 font-bold mt-1 cursor-pointer'>Add Invoice Item</span>

                    <div className='flex justify-between'>

                        <div className='left p-5 flex flex-col '>
                            <span className='font-semibold text-gray-700 my-2'>Notes</span>
                            <textarea className='border border-gray-300 rounded resize-none py-1 px-3' name="notes" id="notes" cols="70" rows="2"></textarea>
                        </div>

                        <div className='right text-base p-5 w-fill'>
                            <div className='flex gap-56 my-3'>
                                <span>Subtotal</span>
                                <span>0.00</span>
                            </div>
                            <div className='flex gap-56 my-3'>
                                <span>Tax</span>
                                <span></span>
                            </div>

                            <hr />
                            <div className='flex gap-56 my-3 font-bold text-gray-800 text-lg'>
                                <span>Total(USD)</span>
                                <span>0.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end gap-7 my-5'>
                    <button className='border border-emerald-500 rounded-lg  py-2 px-7 font-semibold'>Reset</button>
                    <button className='border flex items-center gap-2 bg-emerald-500 rounded-lg text-white py-2 px-10 font-semibold'> <img src={downloader} alt="" /> Download</button>
                </div>

            </div>
        </>
    )
}

export default Home
