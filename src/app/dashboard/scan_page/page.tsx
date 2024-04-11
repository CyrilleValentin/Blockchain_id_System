"use client"
import { StateContext } from "@/components/Provider";
import { Html5QrcodeScanner } from "html5-qrcode"
import { useContext, useEffect, useState } from "react";
export default function ScanPage() {
    const { contract, provider, signer } = useContext(StateContext)
    const [scanResult, setScanResult] = useState(null)
    let config = {
        fps: 10,
        qrbox: { width: 100, height: 100 },
        rememberLastUsedCamera: true,
        // Only support camera scan type.
        // supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    useEffect(() => {
        let scanner = new Html5QrcodeScanner("reader", config, false);
        scanner.render(success)
        function success(result) {
            scanner.clear
            setScanResult(result)
        }
        // function error(err) {
        //     console.warn(err)
        // }
    }, [])

    
    async function Verifier(){
        // const doc =  await contract?.getDocument(scanResult)
        // console.log(doc);
        console.log(scanResult);
    }
    

    return (
        <div>
            <h1 className="">Qr Code scanner</h1>
            {
                scanResult
                ?<div>Success: <p>{scanResult}</p></div>
                :<div id="reader"></div> 
            }
            <button onClick={()=>Verifier()}>Verifier</button>
        </div>
    )
}