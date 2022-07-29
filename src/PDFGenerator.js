import React, {useState} from 'react'
import jsPDF, { AcroFormPasswordField } from 'jspdf'
import downloader from './Images/download.png'
// eslint-disable-next-line
import autoTable from 'jspdf-autotable'

const PDFGenerator = (props) => {
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    
    const toPDF = () => {
        if (props.imageURL === '') {
            setMessage('Please Select Image')
            setError(true)

        }
        else if (props.items.length === 0) {
            setMessage('Add Atleast one Item')
            setError(true)

        }
        else if (props.sender.name === '' ||props.sender.fname === '' || props.sender.lname === '' ) {
            setMessage('Please Enter Sender Details')
            setError(true)

        } else if (props.recipient.Cname === '' || props.recipient.fname === '' || props.recipient.lname === '') {
            setMessage('Please Enter Recipient Details')
            setError(true)

        }else if(props.invoice.invoiceNo === '' || props.invoice.date === '' || props.invoice.dueDate === ''){
            setMessage('Please Enter Invoice Details')
            setError(true)

            
        } else {
            var pdf = new jsPDF('portrait', 'px', 'a4', 'false')
            pdf.setFontSize(14)
            pdf.text(380, 15, 'INVOICE')
            //Header Section
            pdf.addImage(props.imageURL, 'png', 10, 10, 100, 100);
            pdf.addFont('Times-Roman', 'Arial', 'normal');
            pdf.setFont('Times-Roman');
            pdf.setFontSize(12)
            pdf.text(340, 150, 'INVOICE #')
            pdf.addFont('Times-Bold', 'bolder')
            pdf.setFont('Times-Bold')
            pdf.setFontSize(10)
            pdf.text(380, 165, props.invoice.invoiceNo)
            pdf.setFont('Times-Roman');
            pdf.setFontSize(12)
            pdf.text(340, 180, 'Invoice Date')
            pdf.setFont('Times-Bold')
            pdf.setFontSize(10)
            pdf.text(350, 195, props.invoice.date)
            pdf.setFont('Times-Roman');
            pdf.setFontSize(12)
            pdf.text(350, 210, 'Due Date')
            pdf.setFont('Times-Bold')
            pdf.setFontSize(10)
            pdf.text(350, 225, props.invoice.dueDate)

            //To And From Section
            pdf.setFontSize(13)
            pdf.text(40, 150, 'From').setFontSize(13)

            pdf.text(40, 170, props.sender.name).setFontSize(10)
            pdf.text(40, 180, props.sender.fname + '' + props.sender.lname)
            pdf.text(40, 190, props.sender.address)
            pdf.text(40, 200, props.sender.address2)
            pdf.text(40, 210, props.sender.country)

            pdf.text(40, 220, props.sender.Email)
            pdf.text(40, 230, props.sender.Phone)
            pdf.text(40, 240, props.sender.Website)

            pdf.text(40, 250, 'Tax Registration Number')
            pdf.text(40, 260, props.sender.tax)

            pdf.setFontSize(13)
            pdf.text(200, 150, 'To')
            pdf.text(200, 170, props.recipient.Cname).setFontSize(10)
            pdf.text(200, 180, props.recipient.Cfname + '' + props.recipient.Clname).setFontSize(10)
            pdf.text(200, 190, props.recipient.Caddress)
            pdf.text(200, 200, props.recipient.Caddress2)
            pdf.text(200, 210, props.recipient.Ccountry)
            pdf.text(200, 220, props.recipient.extra)

            pdf.text(200, 230, props.recipient.CEmail)

            const newArray = props.items.map(({ id, item_total, ...rest }) => {
                return rest;
            });

            const newItems = newArray.slice();
            for (let index = 0; index < newItems.length; index++) {
                const element = newItems[index];
                newItems[index].item_total = parseInt(element.item_qty) * parseInt(element.item_rate);

            }

            const values = newItems.map((e) => Object.values(e))

            pdf.autoTable({
                head: [['Item', 'HRS/QTY', 'Rate', 'TAX', 'Description', 'SUBTOTAL']],
                body: values,
                startY: 300,
                styles: { fillColor: "#a8a4a3" },
            })
            var index = 300;
            for (let i = 0; i < newItems.length; i++) {
                index += 70
            }
            if (index >= pdf.internal.pageSize.height) {
                pdf.addPage()
                index = 0
            }
            pdf.setFontSize(13)
            if(props.notes.notes){
                pdf.text(40, index, 'Notes')
            }
            pdf.text(300, index, 'Invoice Summary')
            pdf.setFontSize(9)
            
            index = index + 15;
            if(props.notes.notes){

                pdf.text(40, index, props.notes.notes)
            }
            pdf.text(300, index, `Subtotal (${props.invoice.currency})`)
            pdf.text(360, index, props.subTotal.toString() + ' ' + props.invoice.currency)

            index = index + 15

            pdf.text(300, index, `Tax (${props.invoice.currency})`)
            pdf.text(360, index, props.totalTax.toString() + ' ' + props.invoice.currency)

            index = index + 15

            pdf.text(300, index, `Total (${props.invoice.currency})`)
            pdf.text(360, index, props.total.toString() + ' ' + props.invoice.currency)




            pdf.save('invoice' + Date.now() + '.pdf')
        }


    }
    return (
        <>
            <button className='border border-emerald-500 rounded-lg  py-2 px-7 font-semibold'>Reset</button>
            <button onClick={toPDF} className='border flex items-center gap-2 bg-emerald-500 rounded-lg text-white py-2 px-10 font-semibold'> <img src={downloader} alt="" /> Download</button>

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
                                            <p className="text-sm text-gray-500">{message}</p>
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

export default PDFGenerator