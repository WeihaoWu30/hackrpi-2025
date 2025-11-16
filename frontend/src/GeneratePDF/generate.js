import React, {useRef} from "react";
import html2pdf from "html2pdf.js"

function generatePDF({children}){
   const element = useRef(null);
   const options = {
      filename: 'patient-info.pdf',
      html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
   }

   html2pdf().set(options).from(element).save();
   return(
      <div>
         
      </div>
   )
}