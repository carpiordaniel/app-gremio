import { useState } from "react";


const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  return <iframe src={pdfUrl} title="PDF Viewer" />;
};

const PopupDocuments = () => {
  const [url] = useState("https://www.orimi.com/pdf-test.pdf"); 
  return (
    <main>
      <div className="tabs">
      </div>
      <div className="tab-content">
        <PDFViewer pdfUrl={url} />
      </div>
    </main>
  );
};

export default PopupDocuments;
