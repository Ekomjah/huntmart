import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

export default function BarcodeGenerator({ meta }) {
  const svgRef = useRef(null);
  console.log("meta in barcode generator: ", meta);
  console.log("meta barcode: ", fixEAN13(meta?.barcode));

  useEffect(() => {
    if (meta?.barcode) {
      JsBarcode(svgRef.current, fixEAN13(meta.barcode), {
        format: "ean13",
        displayValue: true,
        fontSize: 16,
        height: 60,
      });
    }
  }, [meta]);

  return (
    <div className="flex flex-col items-center justify-center">
      <svg ref={svgRef}></svg>
      <img src={meta.qrCode} alt="qr" style={{ width: 120, marginTop: 10 }} />
      <p>Created: {meta.createdAt}</p>
      <p>Updated: {meta.updatedAt}</p>
    </div>
  );
}

function fixEAN13(code) {
  if (!/^\d{13}$/.test(code)) return code;

  const digits = code.split("").map(Number);
  const check = digits.pop();
  const sum = digits
    .reverse()
    .reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 3 : 1), 0);

  const calculated = (10 - (sum % 10)) % 10;
  return code.slice(0, 12) + calculated;
}
