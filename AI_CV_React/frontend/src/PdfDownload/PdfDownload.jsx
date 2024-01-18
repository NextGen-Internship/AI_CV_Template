import React, { useEffect, useState } from 'react';
import './PdfDownload.css'

const PdfDownload = () => {
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await fetch('./sample.pdf');  //to add real endpoint
                if(!response.ok){
                    throw new Error('Failed to fetch PDF');
                }

                const pdfBlob = await response.blob();
                setPdfData(URL.createObjectURL(pdfBlob));
            }catch (error){
                console.log('Error fetching PDF: ', error);
            }
        };

        fetchPdf();
    }, []);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfData;
        link.download = 'cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id='download-div'>
            <label id='download-pdf'>Download PDF:</label>
            <div className='pdf-container'>
                {pdfData && <iframe src={`${pdfData}#toolbar=0`} type="application/pdf" className='preview'/>}
            </div>
            <button onClick={handleDownload} id='download-button'>Download PDF</button>
    </div>
    );
};

export default PdfDownload;