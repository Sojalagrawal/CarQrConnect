import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';


const Scanner = () => {
  const [result, setResult] = useState(null);
  const [isScannerActive, setIsScannerActive] = useState(true);


  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    // This code runs when the component mounts (when the component is rendered)
    setIsScannerActive(true);
  
    // This function is the cleanup function, it runs when the component unmounts (when the component is removed from the UI)
    return () => {
      setIsScannerActive(false);
    };
  }, []);

 
  

  useEffect(() => {
    if (result && isValidURL(result.text)) {
      setIsScannerActive(false);
      window.open(result.text, '_blank');
    }
  }, [result]);

  const previewStyle = {
    height: 320,
    width: 320,
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      {isScannerActive && (
        <QrScanner
          delay={300}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      )}
      {result && (
        <div>
          <p>Scanned Result:</p>
          <p>Text: {result.text}</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
