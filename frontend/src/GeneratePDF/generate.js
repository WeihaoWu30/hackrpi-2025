import React, {useRef} from "react";
import html2pdf from "html2pdf.js"

export default function PDFGenerator({ children }) { 
   const elementRef = useRef(null); 

   const handleExport = () => {
      const options = {
         filename: 'patient-info.pdf',
         html2canvas:  { scale: 1, logging: true, dpi: 300, letterRendering: true},
         jsPDF: {unit: 'in', format: 'letter', orientation: 'landscape'},
         margin: 0.5
      };

      // Check if the ref is attached to an element before calling the library
      if (elementRef.current) { 
         html2pdf().set(options).from(elementRef.current).save();
      } else {
         console.error("Content reference not found.");
      }
   };

   return (
      <div>
         <div ref={elementRef}>{children}</div> 
         
         <button onClick={handleExport} style={{marginLeft: '45%', marginBottom: '5%'}}>Export Data</button> 
      </div>
   );
}

