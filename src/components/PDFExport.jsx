// components/PDFExport.jsx
import React, { useState, useRef } from 'react';

const PDFExport = ({ tableJSX }) => {
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);
  const contentRef = useRef(null);

  const generatePDF = () => {
    setLoading(true);
    
    try {
      // Get the HTML content to export
      const contentHtml = contentRef.current.innerHTML;
      
      // Create print-friendly HTML document
      const printHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Exported Document</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                padding: 20px;
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              
              th {
                background-color: #242752;
                color: white;
                font-weight: bold;
                padding: 10px;
                border: 1px solid #d1d5db;
              }
              
              td {
                padding: 10px;
                border: 1px solid #d1d5db;
                background-color: #f3f4f6;
              }
              
              /* Ensure text is selectable */
              body {
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
              }
              
              @media print {
                body {
                  padding: 15mm;
                }
              }
            </style>
          </head>
          <body>
            ${contentHtml}
          </body>
        </html>
      `;
      
      // Set the iframe content
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(printHtml);
      iframeDoc.close();
      
      // Add a small delay to ensure content is fully rendered
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        disabled={loading}
        className={`px-4 py-2 rounded font-medium ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Generating PDF...' : 'Export to PDF'}
      </button>

      {/* Hidden content for PDF generation */}
      <div ref={contentRef} style={{ display: 'none' }}>
        {tableJSX}
      </div>

      {/* Hidden iframe for PDF generation */}
      <iframe 
        ref={iframeRef} 
        title="pdf-iframe"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default PDFExport;



