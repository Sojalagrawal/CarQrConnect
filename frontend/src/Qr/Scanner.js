import React, { useState,useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

const Scanner = () => {
  const [result, setResult] = useState(null);

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
    if (result && isValidURL(result.text)) {
      window.open(result.text, '_blank');
    }
  }, [result]);

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
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
