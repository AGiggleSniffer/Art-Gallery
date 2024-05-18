import { useEffect, useState } from "react";
import "./Noise.css";

export default function Noise() {
	const [rSalt, setSalt] = useState(0);
	useEffect(() => {
		const delay = 1000;
		const id = setInterval(() => {
			setSalt(Math.random() * 10);
		}, delay);
		return () => clearTimeout(id);
	});
	return (
		<svg style={{ display: "none" }}>
			<defs>
				<filter id="shake0">
					<feTurbulence
						id="turbulence"
						baseFrequency="0.005"
						numOctaves="3"
						seed={0 + rSalt}
					/>
					<feDisplacementMap
						id="displacment"
						in="SourceGraphic"
						in2="noise"
						scale="7"
					/>
				</filter>
				<filter id="shake1">
					<feTurbulence
						id="turbulence"
						baseFrequency="0.005"
						numOctaves="3"
						seed={1 + rSalt}
					/>
					<feDisplacementMap
						id="displacment"
						in="SourceGraphic"
						in2="noise"
						scale="8"
					/>
				</filter>
				<filter id="shake2">
					<feTurbulence
						id="turbulence"
						baseFrequency="0.005"
						numOctaves="3"
						seed={2 + rSalt}
					/>
					<feDisplacementMap
						id="displacment"
						in="SourceGraphic"
						in2="noise"
						scale="5"
					/>
				</filter>
				<filter id="shake3">
					<feTurbulence
						id="turbulence"
						baseFrequency="0.005"
						numOctaves="3"
						seed={3 + rSalt}
					/>
					<feDisplacementMap
						id="displacment"
						in="SourceGraphic"
						in2="noise"
						scale="6"
					/>
				</filter>
				<filter id="shake4">
					<feTurbulence
						id="turbulence"
						baseFrequency="0.005"
						numOctaves="3"
						seed={4 + rSalt}
					/>
					<feDisplacementMap
						id="displacment"
						in="SourceGraphic"
						in2="noise"
						scale="7"
					/>
				</filter>
			</defs>
		</svg>
	);
}
