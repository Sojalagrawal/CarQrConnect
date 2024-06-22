import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QrCode() {
  const [id, setId] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const fetchId = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      const data = await response.json();
      // console.log("Encrypted ID from API:", data.encryptedUserId);
      setId(data.encryptedUserId); 

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchId();
    const url = window.location.href.replace('/chats', '');
    // console.log("Base URL without /chats:", url);
    setBaseUrl(url);
  }, []);

  useEffect(() => {
    if (id && baseUrl) {
      const encodedId = encodeURIComponent(id); // Encode the ID here
      const constructedUrl = `${baseUrl}/${encodedId}`;
      setFullUrl(constructedUrl);
      // console.log("Constructed Full URL:", constructedUrl);
    }
  }, [id, baseUrl]);

  return (
    <div>
      <p>Scan my Qr code</p>
      {fullUrl && <QRCodeSVG value={fullUrl} size="256" />}
    </div>
  );
}
