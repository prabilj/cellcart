
import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import ReactToPrint from "react-to-print";
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import Button from '@mui/material/Button';


const OrderInvoice = () => {
  const componentRef = useRef();
  const navigate = useNavigate()

  const location = useLocation();
  const { invoiceData } = location.state;
  const products = invoiceData.orderDetails;

  const downloadPDF = () => {
    try {


      const content = componentRef.current;
      const pdfOptions = {
        margin: 10,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      const generatedPDF = html2pdf().from(content).set(pdfOptions).outputPdf();

      // Pass the generated PDF to another function
      handlePDFResult(generatedPDF);

      // Save the PDF immediately
      html2pdf().from(content).set(pdfOptions).save();
    }
    catch (err) {
      console.log("err", err);
    }
  };
  const handlePDFResult = (pdf) => {
    // Handle the generated PDF result here
    console.log("Generated PDF:", pdf)
  }
  handlePDFResult()

  const handlePrint = () => {

    const content = componentRef.current;
    console.log("content", content);
    const pdfOptions = {
      margin: 10,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(content).set(pdfOptions).outputPdf((pdf) => {
      // You can now send the generated PDF to your backend API
      // sendEmailWithAttachment(pdf);
    });
  };

  // const sendEmailWithAttachment = async (pdf) => {
  //   console.log("pdf", pdf);
  //   const formData = new FormData();
  //   formData.append('pdf', new Blob([pdf], { type: 'application/pdf' }), 'invoice.pdf');

  //   try {
  //     console.log("formData", formData.get('pdf'));
  //     // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
  //     const response = await axios.post('http://localhost:3000/sentOtp', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     console.log('Email sent successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // };

  // useEffect(() => {
  //   // This will be triggered when the component renders
  //   sendEmailWithAttachment();
  // }, []);

  return (
    <>
      <div style={{ border: '1px solid #000', padding: '20px', position: 'relative' }} ref={componentRef}>
        {/* Watermark: "cellCart" */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            opacity: 0.1,
          }}
        >
          CellCart
        </div>

        <Typography variant="h4">Order Invoice</Typography>

        {/* Display Shipping Address */}
        <Typography variant="h5">Shipping Address</Typography>

        <Typography variant="body1">
          {invoiceData.selectedAddressDetails.fullName}
        </Typography>
        <Typography variant="body1">
          {invoiceData.selectedAddressDetails.phoneNumber}
        </Typography>
        <Typography variant="body1">
          {invoiceData.selectedAddressDetails.address}
        </Typography>
        <Typography variant="body1">
          {invoiceData.selectedAddressDetails.city}
        </Typography>
        <Typography variant="body1">
          {invoiceData.selectedAddressDetails.country}
        </Typography>
        <Typography variant="body1">
          <strong>Landmark:</strong> {invoiceData.selectedAddressDetails.landmark}
        </Typography>
        <Typography variant="body1">
          {invoiceData.selectedAddressDetails.postcode}
        </Typography>

        {/* Display Order Details */}
        <Typography variant="h5">Order Details</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.productId.productName}</TableCell>
                  <TableCell>${product.productId.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${(product.productId.price * product.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Display Total Amount */}
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          <strong>Total Amount:</strong> ${invoiceData.totalAmount}
        </Typography>

      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" className="printInvoice" onClick={downloadPDF}>
              Download
            </Button>
          )}
          content={() => componentRef.current}
        />
        <Button
          onClick={() => { navigate('/productlist') }}
        >go to home</Button>
      </div>
    </>
  );
};
export default OrderInvoice;
