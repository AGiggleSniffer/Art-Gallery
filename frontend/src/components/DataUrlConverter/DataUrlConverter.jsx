import { useRef, useState } from "react";
import useCanvasCtx from "../../hooks/useCanvasCtx";

export default function DataUrlConverter() {
    const [dataUrl, setUrl] = useState("");
    const [imgsrc, setImgsrc] = useState("")
    const canvasref = useRef();
    const ctx = useCanvasCtx(canvasref);
	const handleConversion = (e) => {
        const img = new Image();
        setImgsrc(e.target.value);
        img.src = e.target.value;
        ctx.drawImage(img, 0, 0);
        setUrl(ctx.canvas.toDataURL());
	};

	return (
		<>
			<h1>CONVERTER</h1>
            <input type="text" onChange={handleConversion} />
            <img src={imgsrc} style={{width: "300px"}}/>
            <canvas ref={canvasref}/>
			<div
				style={{
                    wordWrap: "break-word",
					width: "80%",
					backgroundColor: "black",
					color: "white",
					padding: "10px",
					borderRadius: "10px",
					border: "2px solid blue",
				}}
			>
				<h3>URL:</h3>
				<code>{dataUrl}</code>
			</div>
		</>
	);
}
