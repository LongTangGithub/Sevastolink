import * as transformers from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.9.2/dist/esm/index.js';

async function generateInstructions(prompt) {
    const model = await transformers.AutoModelForSeq2SeqLM.fromPretrained("ostris/ikea-instructions-lora-sdxl");
    const tokenizer = await transformers.AutoTokenizer.fromPretrained("ostris/ikea-instructions-lora-sdxl");

    const inputs = tokenizer(prompt, { return_tensors: "pt" });
    const outputs = await model.generate(inputs.input_ids);
    const generatedInstructions = tokenizer.decode(outputs[0], { skipSpecialTokens: true });
  
    return generatedInstructions;
}

// Function to display generated instructions in the DOM
async function displayInstructions() {
    const prompt = "Xenomorph"; // Prompt to generate instructions for
    const instructions = await generateInstructions(prompt);
  
    // Display instructions in the #model div
    const modelDiv = document.getElementById('model');
    modelDiv.innerHTML = `<p>${instructions}</p>`;
}
// Load instructions on page load
document.addEventListener('DOMContentLoaded', async () => {
    await displayInstructions();
  });