import React, { useRef, useState } from 'react'
import uploader from './Images/uploader.png'
import Item from './Item'

import PDFGenerator from './PDFGenerator';

const Home = () => {
    const [notes, setNotes] = useState({ notes: '' })
    const onNotesChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }
    const [error, setError] = useState(false)
    //Invoice Related
    const [totalTax, setTotalTax] = useState(0)
    const [invoice, setInvoice] = useState({ invoiceNo: '', date: '', dueDate: '', currency: 'USD' })

    const invoiceOnChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value })
    }

    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0)
    const [addMore, setAddMore] = useState(true)
    const [item, setItem] = useState({ id: Math.random().toString(), item_name: '', item_qty: '', item_rate: '', item_tax: '', item_desc: '' })
    const [items, setItems] = useState([]);
    const [imageURL, setImageURL] = useState('')
    const [imageLoaded, setImageLoaded] = useState(false)

    //Image Related 
    const inpRef = useRef();

    const loadImage = () => {
        inpRef.current.click();
    }

    const handleImage = (e) => {
        const images = e.target.files[0];

        const urlImage = URL.createObjectURL(images);

        setImageURL(urlImage);
        setImageLoaded(true);
    }


    //Adding Items
    const addItems = () => {
        if (item.item_name !== '' || item.item_qty !== '' || item.item_rate !== '' || item.item_tax !== '' || item.item_desc !== '') {
            setItems(items.concat(item))
            setSubTotal(subTotal + (item.item_qty * item.item_rate))
            var sub = subTotal + (item.item_qty * item.item_rate)
            var tax = parseInt(item.item_tax);
            var item_total = item.item_qty * item.item_rate
            tax = tax / 100;
            tax = tax * item_total
            tax = Math.round((tax + Number.EPSILON) * 100) / 100

            setTotalTax(totalTax + tax)
            var T_tax = totalTax + tax;

            setTotal(sub + T_tax)

            setItem({ id: Math.random().toString(), item_name: '', item_qty: '', item_rate: '', item_tax: '', item_total: '0.00', item_desc: '' })
            setAddMore(false);

        }
        else {
            setError(true);
        }
    }
    const itemOnChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value })

    }


    //Deleting an Item
    const deleteItem = (id) => {

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (element.id === id) {
                var tax = element.item_tax / 100;
                tax = tax * element.item_qty * element.item_rate
                const totalamm = element.item_qty * element.item_rate
                console.log(tax)
                setTotal(total - tax - totalamm);

                setSubTotal(subTotal - totalamm)
                setTotalTax(totalTax - tax)
            }
        }


        const newList = items.filter((item) => {

            return item.id !== id;
        })
        setItems(newList);
    }

    //Modal Related
    const [showModal, setShowModal] = useState(false)
    const [showClientModal, setShowClientModal] = useState(false)


    //Sender Data
    const [sender, setSender] = useState({ name: '', country: '', fname: '', lname: '', tax: '', Email: '', address: '', address2: '', Phone: '', Website: '' })
    const [showSender, setShowSender] = useState(false)
    const onChangeSender = (event) => {
        setSender({ ...sender, [event.target.name]: event.target.value })
    }

    const updateSender = () => {
        if (sender.name !== '' || sender.country !== '' || sender.fname !== '' || sender.lname !== '' || sender.tax !== '' || sender.Email !== '' || sender.address !== '' || sender.address2 !== '' || sender.Phone !== '' || sender.Website !== '') {
            setShowModal(false);
            setShowSender(true)
        }
        else {
            setError(true)
        }
    }

    //Recipient Data
    const [recipient, setRecipient] = useState({ Cname: '', Ccountry: '', Cfname: '', Clname: '', CEmail: '', Caddress: '', Caddress2: '', CPhone: '', extra: '' })
    const [showRecipient, setShowRecipient] = useState(false)

    const onClientChange = (event) => {
        setRecipient({ ...recipient, [event.target.name]: event.target.value })

    }

    const updateRecipient = () => {
        if (recipient.Cname !== '' || recipient.Ccountry !== '' || recipient.Cfname !== '' || recipient.Clname !== '' || recipient.CEmail !== '' || recipient.Caddress !== '' || recipient.Caddress2 !== '' || recipient.CPhone !== '' || recipient.extra !== '') {
            setShowClientModal(false)
            setShowRecipient(true)
        }
        else {
            setError(true)
        }
    }

    const closeModal = ()=>{
        setShowModal(false);
        setSender({ name: '', country: '', fname: '', lname: '', tax: '', Email: '', address: '', address2: '', Phone: '', Website: '' })
    }
    
    const closeRecipientModel = ()=>{
        setShowClientModal(false)
        setRecipient({ Cname: '', Ccountry: '', Cfname: '', Clname: '', CEmail: '', Caddress: '', Caddress2: '', CPhone: '', extra: '' })

    }


    return (
        <>
            <div className="header bg-emerald-600 h-12 flex items-center">
                <h1 className=' text-white ml-4 font-bold text-lg'>App logo</h1>

            </div>

            <div className="text-white flex flex-col items-center py-12 bg-emerald-500">
                <h1 className=' font-bold text-3xl'>Quickly Create</h1>
                <h1 className=' font-bold text-3xl'>and send invoices</h1>

                <h6 className='my-2 text-xl text-center'>Fill your invoice details below, choose templete and then download/send/share it</h6>
            </div>

            <div className="form py-4 2xl:px-72 xl:px-56 lg:px-36 md:px-20 sm:px-12 s:px-6 relative -top-12  ">
                <div className='flex flex-col border p-6  shadow-lg shadow-gray-500/50 bg-white rounded-md'>

                    <div className='flex flex-col xl:flex-row md:flex-row 2xl:flex-row sm:flex-row justify-between'>

                        {imageLoaded === false ? <div onClick={loadImage} className="mt-1 bg-slate-50 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                            <div className="left flex flex-col items-center">
                                <img src={uploader} alt="upload here" className='w-10' />
                                <span className='text-center'>Drag your logo here, or <input ref={inpRef} onChange={handleImage} className='hidden' type="file" name="" id="" /> <p className='text-emerald-500 font-bold' >browse</p> </span>
                                <p className='text-zinc-500 '>Max. File size: 25 MB</p>
                            </div>
                        </div> : <div> <img className='w-52' src={imageURL} alt="" /> </div>}

                        <div className="right flex flex-col gap-1 s:my-4 s:items-center ">

                            <div className='flex items-center justify-end gap-2'>
                                <label htmlFor="invoiceNo">Invoice #:</label>
                                <input onChange={invoiceOnChange} type="text" name="invoiceNo" id="invoiceNo" placeholder='0001' className='mt-1 placeholder:text-gray-500 placeholder:font-semibold border border-gray-300 rounded p-1 w-20' />
                            </div>

                            <div className='flex flex-row items-center justify-end gap-2'>
                                <div className='flex justify-end'>
                                    <label htmlFor="date">Date: </label>
                                </div>
                                <input onChange={invoiceOnChange} type="date" name="date" id="date" placeholder='0001' className='mt-1 border border-gray-300 rounded p-1 w-fit' />
                            </div>

                            <div className='flex flex-row items-center justify-end gap-2'>
                                <label htmlFor="dueDate">Due Date: </label>
                                <input onChange={invoiceOnChange} type="date" name="dueDate" id="dueDate" placeholder='0001' className='mt-1 border border-gray-300 rounded p-1 w-fit' />
                            </div>

                            <div className='flex flex-row items-center justify-end gap-2'>
                                <label htmlFor="currency">Currency: </label>
                                <select onChange={invoiceOnChange} id="currency" name="currency" className="border-gray-300 p-1 border h-full pl-2 pr-7 bg-transparent text-gray-800 text-sm font-bold rounded">
                                    <option selected>USD</option>
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

                    <div className='flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row justify-between py-10'>
                        <div >
                            <h5 className='font-semibold text-gray-700'>From</h5>
                            {showSender === false ?

                                <div onClick={() => { setShowModal(true) }} className="mt-1 cursor-pointer gap-1 bg-slate-50 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md xl-w-96 lg:w-80 md:w-64">
                                    <span className='font-semibold text-gray-600'>Sender Name</span>
                                    <span className='text-zinc-400'>Sender Contact Details</span>
                                </div>

                                :

                                <div className='my-2'>
                                    <p className='font-bold'> {sender.name}</p>
                                    <p>{sender.fname} {sender.lname}</p>
                                    <p>{sender.address}</p>
                                    <p>{sender.address2}</p>
                                    <p>{sender.country}</p>
                                    <div className='my-3'></div>
                                    <p>{sender.Email}</p>
                                    <p>{sender.Phone}</p>
                                    <p>{sender.Website}</p>
                                    <div className='my-3'></div>
                                    <p>Tax Registration Number</p>
                                    <p>{sender.tax}</p>

                                </div>
                            }
                        </div>

                        <div>
                            <h5 className='font-semibold text-gray-700'>To</h5>
                            {showRecipient === false ?

                                <div onClick={() => { setShowClientModal(true) }} className="mt-1 cursor-pointer gap-1 bg-slate-50 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md xl-w-96 lg:w-80 md:w-64">
                                    <span className='font-semibold text-gray-600'>Recipient Name</span>
                                    <span className='text-zinc-400'>Recipient Contact Details</span>
                                </div>
                                :
                                <div className='my-2'>
                                    <p className='font-bold'> {recipient.Cname}</p>
                                    <p>{recipient.Cfname} {recipient.Clname}</p>
                                    <p>{recipient.Caddress}</p>
                                    <p>{recipient.Caddress2}</p>
                                    <p>{recipient.Ccountry}</p>
                                    <p>{recipient.extra}</p>
                                    <div className='my-3'></div>
                                    <p>{recipient.CEmail}</p>
                                    <p>{recipient.CPhone}</p>

                                </div>
                            }
                        </div>
                    </div>

                    <div className='flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col sm:flex-row justify-between items-normal'>
                        <div className='flex justify-between 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col s:gap-12'>
                            <div className='2xl:flex-1 xl:flex-1 lg:flex-1 md:flex-1 flex-0'>
                                <span className='text-gray-700 font-semibold'>ITEM</span>
                            </div>
                            <div className='text-gray-700 font-semibold flex-1 flex justify-evenly w-full  2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col s:gap-12'>
                                <span>HRS/QTY</span>
                                <span>RATE</span>
                                <span>TAX</span>
                                <span>SUBTOTAL</span>
                            </div>
                        </div>

                        <hr />
                        {items.map((item) => {
                            return <Item deleteItem={deleteItem} key={item.id} item={item} />
                        })}

                        {addMore && <>
                            <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col justify-between s:gap-8'>
                                <div className='flex-1'>
                                    <input value={item.item_name} onChange={itemOnChange} type="text" name="item_name" id="item_name" placeholder='Item Name' className='mt-1 border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm w-32 ' />
                                </div>
                                <div className='text-gray-700 font-semibold flex-1 flex justify-evenly items-end w-full pr-6 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col s:gap-10'>
                                    <input value={item.item_qty} onChange={itemOnChange} type="text" name="item_qty" id="item_qty" className='mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm  2xl:w-12 xl:w-12 lg:w-12 md:w-12 w-20   ' />
                                    <input value={item.item_rate} onChange={itemOnChange} type="text" name="item_rate" id="item_rate" className='mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm   2xl:w-12 xl:w-12 lg:w-12 md:w-12 w-20  ' />
                                    <input value={item.item_tax} onChange={itemOnChange} type="text" name="item_tax" id="item_tax" className='mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm  2xl:w-12 xl:w-12 lg:w-12 md:w-12 w-20  ' />
                                    <div className='text-right flex items-center'>
                                        <span>{(item.item_qty * item.item_rate)}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                        }
                    </div>
                    {addMore && <div className='flex justify-between items-center pr-7'>
                        <input onChange={itemOnChange} type="text" name="item_desc" id="item_desc" placeholder='Description' className='mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm lg:w-96' />
                        <i onClick={addItems} className="fa fa-check-circle text-emerald-500 cursor-pointer" aria-hidden="true"></i>
                    </div>}

                    <hr className='mt-6' />

                    <span onClick={() => { setAddMore(true) }} className='text-emerald-500 font-bold mt-1 cursor-pointer'>Add Invoice Item</span>

                    <div className='flex justify-between flex-col xl:flex-row md:flex-row 2xl:flex-row sm:flex-row'>

                        <div className='left p-5 flex flex-col '>
                            <span className='font-semibold text-gray-700 my-2'>Notes</span>
                            <textarea onChange={onNotesChange} className='border border-gray-300 rounded resize-none py-1 px-3 lg:w-80 md:w-80 sm:w-64 w-56' name="notes" id="notes" cols="60" rows="2"></textarea>
                        </div>

                        <div className='right text-base p-5 w-fill'>
                            <div className='flex justify-between my-3'>
                                <span>Subtotal</span>
                                <span>{invoice.currency + ' ' + subTotal}</span>
                            </div>
                            <div className='flex justify-between my-3'>
                                <span>Tax</span>
                                <span>{invoice.currency + ' ' + totalTax}</span>
                            </div>

                            <hr />
                            <div className='flex 2xl:gap-56 xl:gap-36 lg:gap-24 md:gap-16 sm:gap-12 my-3 font-bold text-gray-800 2xl:text-lg lg:text-lg md:text-lg text-sm'>
                                <span>Total({invoice.currency})</span>
                                <span>{invoice.currency + ' ' + total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end gap-7 my-5'>
                    <PDFGenerator items={items} sender={sender} recipient={recipient} invoice={invoice} imageURL={imageURL} subTotal={subTotal} totalTax={totalTax} total={total} notes={notes} />
                </div>
            </div>


            {/* //Modal */}

            <div className={`relative z-10 ${!showModal && 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className=" 2xl:flex xl:flex lg:flex md:flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

                        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="">
                                    <div className='flex justify-between'>
                                        <h3 className='font-semibold'>Sender Contact Details</h3>
                                        <i onClick={closeModal} className="fa fa-times text-gray-700 cursor-pointer" aria-hidden="true"></i>
                                    </div>

                                    <div className="">
                                        <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center justify-between mt-10'>
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Comapny/Client Name</label>
                                                <input value={sender.name} onChange={onChangeSender} type="text" name="name" id="name" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Company/Client Name" />
                                            </div>
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                                <select value={sender.country} defaultValue={'United State'} onChange={onChangeSender} id="country" name="country" className="border-gray-300 focus:outline-none p-1 border h-3/4 bg-transparent text-gray-800 text-sm font-bold rounded">
                                                    <option>United State</option>
                                                    <option>China</option>
                                                    <option>Pakistan</option>
                                                    <option>Germany</option>
                                                    <option>Australia</option>
                                                    <option>Korea</option>
                                                    <option>India</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="fname" className="block text-sm font-medium text-gray-700">Last Name</label>
                                                <input value={sender.fname} onChange={onChangeSender} type="text" name="fname" id="fname" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="First Name" />
                                            </div>
                                            <div className='flex flex-col'>
                                                <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last Name</label>
                                                <input value={sender.lname} onChange={onChangeSender} type="text" name="lname" id="lname" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Last Name" />
                                            </div>
                                        </div>

                                        <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="tax" className="block text-sm font-medium text-gray-700">Tax Registration No.</label>
                                                <input value={sender.tax} onChange={onChangeSender} type="text" name="tax" id="tax" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Tax Registration No." />
                                            </div>
                                            <div className='flex flex-col'>
                                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
                                                <input value={sender.Email} onChange={onChangeSender} type="text" name="Email" id="Email" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Email" />
                                            </div>
                                        </div>

                                        <div className='mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address 1</label>
                                                <textarea value={sender.address} onChange={onChangeSender} className='border focus:outline-none border-gray-300 rounded py-1 px-3' name="address" id="address" rows="1"></textarea>
                                            </div>

                                        </div>

                                        <div className='mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Address 2</label>
                                                <textarea value={sender.address2} onChange={onChangeSender} className='border border-gray-300 rounded focus:outline-none py-1 px-3 ' name="address2" id="address2" rows="1"></textarea>
                                            </div>

                                        </div>


                                        <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                                <input value={sender.Phone} onChange={onChangeSender} type="text" name="Phone" id="Phone" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Phone" />
                                            </div>
                                            <div className='flex flex-col'>
                                                <label htmlFor="Website" className="block text-sm font-medium text-gray-700">Website</label>
                                                <input value={sender.Website} onChange={onChangeSender} type="text" name="Website" id="Website" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Website" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={updateSender} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-500 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* //CLient Modal */}

            <div className={`relative z-10 ${!showClientModal && 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="  2xl:flex xl:flex lg:flex md:flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

                        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="">
                                    <div className='flex justify-between'>
                                        <h3 className='font-semibold'>New Client</h3>
                                        <i onClick={closeRecipientModel} className="fa fa-times text-gray-700 cursor-pointer" aria-hidden="true"></i>
                                    </div>

                                    <div className="">
                                        <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center justify-between mt-10'>
                                            <div>
                                                <label htmlFor="Cname" className="block text-sm font-medium text-gray-700">Comapny/Client Name</label>
                                                <input value={recipient.Cname} onChange={onClientChange} type="text" name="Cname" id="Cname" className="border focus:outline-none border-gray-300 rounded p-2 " placeholder="Company/Client Name" />
                                            </div>
                                            <div>
                                                <label htmlFor="Ccountry" className="block text-sm font-medium text-gray-700">Country</label>
                                                <select value={recipient.Ccountry} defaultValue={'United State'} onChange={onClientChange} id="Ccountry" name="Ccountry" className="border-gray-300 focus:outline-none p-1 border h-3/4 bg-transparent text-gray-800 text-sm font-bold rounded">
                                                    <option>United State</option>
                                                    <option>China</option>
                                                    <option>Pakistan</option>
                                                    <option>Germany</option>
                                                    <option>Australia</option>
                                                    <option>Korea</option>
                                                    <option>India</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="Cfname" className="block text-sm font-medium text-gray-700">First Name</label>
                                                <input value={recipient.Cfname} onChange={onClientChange} type="text" name="Cfname" id="Cfname" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="First Name" />
                                            </div>
                                            <div className='flex flex-col'>
                                                <label htmlFor="Clname" className="block text-sm font-medium text-gray-700">Last Name</label>
                                                <input value={recipient.Clname} onChange={onClientChange} type="text" name="Clname" id="Clname" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Last Name" />
                                            </div>
                                        </div>

                                        <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="CEmail" className="block text-sm font-medium text-gray-700">Email</label>
                                                <input value={recipient.CEmail} onChange={onClientChange} type="text" name="CEmail" id="CEmail" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Email" />
                                            </div>
                                            <div className='flex flex-col'>
                                                <label htmlFor="CPhone" className="block text-sm font-medium text-gray-700">Phone</label>
                                                <input value={recipient.CPhone} onChange={onClientChange} type="text" name="CPhone" id="CPhone" className="border focus:outline-none border-gray-300 rounded p-2" placeholder="Phone" />
                                            </div>
                                        </div>

                                        <div className='mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="Caddress" className="block text-sm font-medium text-gray-700">Address 1</label>
                                                <textarea value={recipient.Caddress} onChange={onClientChange} className='border focus:outline-none border-gray-300 rounded py-1 px-3' name="Caddress" id="Caddress" rows="1"></textarea>
                                            </div>

                                        </div>

                                        <div className='mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="Caddress2" className="block text-sm font-medium text-gray-700">Address 2</label>
                                                <textarea value={recipient.Caddress2} onChange={onClientChange} className='border border-gray-300 rounded focus:outline-none py-1 px-3' name="Caddress2" id="Caddress2" rows="1"></textarea>
                                            </div>

                                        </div>


                                        <div className='mt-5'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="extra" className="block text-sm font-medium text-gray-700">Extra Data</label>
                                                <input value={recipient.extra} onChange={onClientChange} type="text" name="extra" id="extra" className="border focus:outline-none border-gray-300 rounded p-2 w-fill" placeholder="Extra Data" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={updateRecipient} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-500 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* //ALERT MODEL */}

            <div className={`relative z-10 ${!error && 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

                        <div className="relative bg-white border border-red-600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Warning</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Please Enter all the fields required.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={()=>{setError(false)}} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Ok</button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
