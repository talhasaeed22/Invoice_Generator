import React from 'react'
import jsPDF from 'jspdf'
import downloader from './Images/download.png'
// eslint-disable-next-line
import autoTable from 'jspdf-autotable'

const PDFGenerator = (props) => {
    const toPDF = () => {
        var pdf = new jsPDF('portrait', 'px', 'a4', 'false')
        //Header Section
        pdf.addImage(props.imageURL, 'png', 10, 10, 100, 100);
        pdf.text(395, 20, props.invoice.invoiceNo).setFontSize(14)
        pdf.text(350, 40, props.invoice.date).setFontSize(14)
        pdf.text(350, 60, props.invoice.dueDate).setFontSize(14)

        //To And From Section
        pdf.text(40, 150, 'From').setFontSize(13)

        pdf.text(40, 170, props.sender.name).setFontSize(10)
        pdf.text(40, 180, props.sender.fname + '' + props.sender.lname).setFontSize(9)
        pdf.text(40, 190, props.sender.address).setFontSize(9)
        pdf.text(40, 200, props.sender.address2).setFontSize(9)
        pdf.text(40, 210, props.sender.country).setFontSize(9)

        pdf.text(40, 220, props.sender.Email).setFontSize(9)
        pdf.text(40, 230, props.sender.Phone).setFontSize(9)
        pdf.text(40, 240, props.sender.Website).setFontSize(9)

        pdf.text(40, 250, 'Tax Registration Number').setFontSize(9)
        pdf.text(40, 260, props.sender.tax).setFontSize(9)


        pdf.text(300, 150, 'To').setFontSize(13)
        pdf.text(300, 170, props.recipient.Cname).setFontSize(10)
        pdf.text(300, 180, props.recipient.Cfname + '' + props.recipient.Clname).setFontSize(10)
        pdf.text(300, 190, props.recipient.Caddress).setFontSize(9)
        pdf.text(300, 200, props.recipient.Caddress2).setFontSize(9)
        pdf.text(300, 210, props.recipient.Ccountry).setFontSize(9)
        pdf.text(300, 220, props.recipient.extra).setFontSize(9)

        pdf.text(300, 230, props.recipient.CEmail).setFontSize(9)

        // //Table Data
        // pdf.line(40, 300, 450, 300)

        // pdf.text(40, 310, 'ITEM').setFontSize(13)
        // pdf.text(240, 310, 'HRS/QTY').setFontSize(13)
        // pdf.text(300, 310, 'RATE').setFontSize(13)
        // pdf.text(360, 310, 'TAX').setFontSize(13)
        // pdf.text(420, 310, 'SUBTOTAL').setFontSize(13)
        // // var total = props.items.item_qty * props.items.item_rate;
        // // var index = 330
        // pdf.line(40, 310, 450, 310)
        // const newItems = props.items.slice();
        // setList(newItems)
        // for (let index = 0; index < newItems; index++) {
        //     const element = newItems[index];
        //     newItems[index].item_total = parseInt(element.item_qty) * parseInt(element.item_rate);
        // }
        // console.log("newItem" + list)
        const newArray = props.items.map(({id, item_total, ...rest}) => {
            return rest;
          });
          console.log(newArray)

        const newItems = newArray.slice();
        for (let index = 0; index < newItems.length; index++) {
            const element = newItems[index];
            newItems[index].item_total = parseInt(element.item_qty) * parseInt(element.item_rate);
            
        }
        // console.log(newItems)

        
        // props.items.forEach((item) => {
        //     pdf.text(40, index, item.item_name).setFontSize(9)
        //     pdf.text(260, index, item.item_qty).setFontSize(9)
        //     pdf.text(320, index, item.item_rate).setFontSize(9)
        //     pdf.text(380, index, item.item_tax).setFontSize(9)
        //     pdf.text(440, index, total.toString()).setFontSize(9)
        //     pdf.text(40, (index + 20), item.item_desc).setFontSize(12)
        //     index = index + 40
        // })
        const values = newItems.map((e)=>Object.values(e))

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
        if(index >= pdf.internal.pageSize.height){
            pdf.addPage()
            index =0
        }
        pdf.setFontSize(13)
        pdf.text(40, index, 'Notes')
        pdf.text(300, index, 'Invoice Summary')
        pdf.setFontSize(9)
        pdf.line(300, index + 5, 350, index)
        index = index + 15;
        pdf.text(40, index, 'Your Notes Here')
        pdf.text(300, index, 'Subtotal')
        console.log(props.subTotal)
        pdf.text(340, index, props.subTotal.toString())

        index = index + 15

        pdf.text(300, index, 'Tax')
        pdf.text(340, index, 'Tax Here')

        index = index + 15

        pdf.text(300, index, 'Total')
        pdf.text(340, index, props.subTotal.toString())




        pdf.save('invoice' + Date.now() + '.pdf')
    }
    return (
        <>
            <button className='border border-emerald-500 rounded-lg  py-2 px-7 font-semibold'>Reset</button>
            <button onClick={toPDF} className='border flex items-center gap-2 bg-emerald-500 rounded-lg text-white py-2 px-10 font-semibold'> <img src={downloader} alt="" /> Download</button>
        </>
    )
}

export default PDFGenerator