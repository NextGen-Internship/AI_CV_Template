import React, { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";

const PdfDownload = () => {
  const { toPDF, targetRef } = usePDF({ filename: "cv.pdf" }); //change name of pdf with name
  return (
    <div id="download-div">
      <button onClick={() => toPDF()}>Download Pdf</button>
      <div ref={targetRef}>
        {/* put cv template component */}
        <p>"test"</p>
      </div>
    </div>
  );
};

export default PdfDownload;
