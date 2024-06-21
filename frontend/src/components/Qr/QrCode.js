import React, { useEffect,useState } from 'react';

import {QRCodeSVG} from 'qrcode.react';



export default function QrCode() {
  const [id,setId]=useState("");
  const user=JSON.parse(localStorage.getItem("userInfo"));

  const fetchId=async()=>{
    try{
      const response = await fetch("http://localhost:5000/api/user/encrypt", {
          method: "post",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              userId: user._id,
          }),
      });
      
      const data = await response.json();
      console.log(data.encryptedUserId);
      setId(data.encryptedUserId);
      
    }
    catch(error){
        console.log(error);
    }
  }

  useEffect(()=>{
    fetchId();
  },[]);

  
  return (
    <div>
        <p>Scan my Qr code</p>
        {id && <QRCodeSVG value={`http://localhost:3000/${id}`} size="256"/>}
    </div>
  )
}
