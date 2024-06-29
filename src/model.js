async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ostris/ikea-instructions-lora-sdxl",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const blob = await response.blob();
	return blob;
}

document.addEventListener("DOMContentLoaded", () => {
    query({ "inputs": "Xenomorph"}).then((blob) => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Generated Model Image";
        document.getElementById('model').appendChild(img);
    }).catch((error) => {
        console.error("Error generating model image: ", error)
    });
});


