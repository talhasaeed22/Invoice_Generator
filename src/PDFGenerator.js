import React from 'react'
import jsPDF, { AcroFormPasswordField } from 'jspdf'
import downloader from './Images/download.png'
// eslint-disable-next-line
import autoTable from 'jspdf-autotable'

const PDFGenerator = (props) => {
    const toPDF = () => {
        if (props.imageURL === '') {
            alert('Please Select Image')
        }
        else if (props.items.length === 0) {
            alert('Add Atleast one Item')
        }
        else if (props.sender.name === '' ||props.sender.fname === '' || props.sender.lname === '' ) {
            alert('Please Enter Sender Details')
        } else if (props.recipient.Cname === '' || props.recipient.fname === '' || props.recipient.lname === '') {
            alert('Please Enter Recipient Details')
        }else if(props.invoice.invoiceNo === '' || props.invoice.date === '' || props.invoice.dueDate === ''){
            alert('Please Enter Invoice Details')
            
        } else {
            var pdf = new jsPDF('portrait', 'px', 'a4', 'false')
            console.log(props.sender.length)
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
            pdf.text(40, index, 'Notes')
            pdf.text(300, index, 'Invoice Summary')
            pdf.setFontSize(9)
            pdf.line(300, index + 5, 350, index)
            index = index + 15;
            pdf.text(40, index, props.notes.notes)
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
        </>
    )
}

export default PDFGenerator