import React from 'react';
import {QRCodeSVG} from 'qrcode.react';


export default function QrCode() {
  return (
    <div>
        <p>Scan my Qr code</p>
        <QRCodeSVG value="http://localhost:3000/123" size="256"/>
    </div>
  )
}
