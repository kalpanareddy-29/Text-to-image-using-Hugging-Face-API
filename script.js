//const token="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"
//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 this is the token for text to image hugging transformer

const token = "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"; // Your Hugging Face token
const inputTxt = document.getElementById("input"); // Text area input
const image = document.createElement("img"); // Dynamic image element
const button = document.getElementById("btn"); // Generate button

// Set up the image element for displaying the result
image.style.maxWidth = "60%";
image.style.borderRadius = "10px";
image.style.marginTop = "20px";
image.style.display = "none"; // Hidden until an image is generated
document.querySelector(".container").appendChild(image); // Append to the container

// Function to query the Hugging Face API
async function query() {
    // Set a placeholder image or loading state
    image.src = "loading.png"; // Replace this with your loading animation
    image.style.display = "block";

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage",
            {
                headers: {
                    Authorization: `Bearer ${token}`, // API Authorization token
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: inputTxt.value }), // API expects "inputs" key
            }
        );

        if (!response.ok) {
            throw new Error("Failed to generate image. Please try again.");
        }

        const result = await response.blob(); // Get the image as a Blob
        return result;
    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
        image.style.display = "none"; // Hide image on error
    }
}

button.addEventListener("click", async function () {
    if (!inputTxt.value.trim()) {
        alert("Please enter a prompt!"); // Alert if input is empty
        return;
    }

    query().then((response) => {
        if (response) {
            const objectURL = URL.createObjectURL(response); // Convert Blob to object URL
            image.src = objectURL; 
        }
    });
});
