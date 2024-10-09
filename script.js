document.getElementById("calculateBtn").addEventListener("click", function () {
    // Get user inputs
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const pixelPitchInput = document.getElementById("pixelPitch").value;
    const controlSystem = document.getElementById("controlSystem").value;
    const viewingDistanceInput = parseFloat(document.getElementById("viewingDistance").value); // Viewing distance input
    const aspectRatio = document.getElementById('aspectRatio').value.split(':');
    
    // Convert pixel pitch input to number
    const pixelPitch = pixelPitchInput ? parseFloat(pixelPitchInput) : null; 

    // Module dimensions
    const moduleWidth = 0.32; // 320mm
    const moduleHeight = 0.16; // 160mm
let totalWidth=0;
let totalHeight=0;
    // Calculate number of modules
    const modulesInWidth = Math.floor(width / moduleWidth);
    const modulesInHeight = Math.floor(height / moduleHeight);
    let totalModules = modulesInWidth * modulesInHeight;
    console.log(totalModules);
    const screenWidth = modulesInWidth*moduleWidth;
    const screenHeight = modulesInHeight*moduleHeight;
    // If pixel pitch is not provided, calculate it based on viewing distance
    let maxPixelPitch;
    let calculatedViewingDistance;

    if(!width && ! height && ! pixelPitch){
        if (document.getElementById("indoor").checked) {
            maxPixelPitch =  viewingDistanceInput / 2;
        }else {
            maxPixelPitch = viewingDistanceInput / 3; // Outdoor
        }
        const height = maxPixelPitch / (parseFloat(aspectRatio[1]) / parseFloat(aspectRatio[0]) + parseFloat(aspectRatio[1]));
    
    // Calculate width based on height
    const width = height * (parseFloat(aspectRatio[0]) / parseFloat(aspectRatio[1]));

    // Calculate number of modules needed
    const numModulesWidth = Math.ceil(width / moduleWidth);
    const numModulesHeight = Math.ceil(height / moduleHeight);

    // Calculate total dimensions
     totalWidth = numModulesWidth * moduleWidth*10;
     totalHeight = numModulesHeight * moduleHeight*10;

 totalModules = Math.floor(totalWidth *totalHeight);


    }

    if (!pixelPitch && viewingDistanceInput) {
        // Determine max pixel pitch based on viewing distance
        if (document.getElementById("indoor").checked) {
            maxPixelPitch = viewingDistanceInput / 2; // Indoor
        } else {
            maxPixelPitch = viewingDistanceInput / 3; // Outdoor
        }
        calculatedViewingDistance = viewingDistanceInput; // Use provided viewing distance
    } else if (pixelPitch) {
        maxPixelPitch = pixelPitch; // Use provided pixel pitch
    } else {
        // If neither is provided, set defaults
        maxPixelPitch = 0; // Default if nothing is provided
        calculatedViewingDistance = 0; // Default if nothing is provided
    }

    if(pixelPitch && !viewingDistanceInput){
        if (document.getElementById("indoor").checked) {
            calculatedViewingDistance = maxPixelPitch *2; // Indoor
        } else {
            calculatedViewingDistance = maxPixelPitch *3; // Outdoor
        }
    }

    // Calculate total pixels using the calculated max pixel pitch
    const pixelsPerModule = Math.floor((moduleWidth / (maxPixelPitch / 1000)) * (moduleHeight / (maxPixelPitch / 1000)));
    const totalPixels = totalModules * pixelsPerModule;

    // Prepare viewing distance for display
    const viewingDistanceDisplay = calculatedViewingDistance ? calculatedViewingDistance.toFixed(2) : "Not Provided";
    let recommendedControlSystem = '';
    if (controlSystem === "") {
        if (totalPixels < 2600000) {
            recommendedControlSystem = "Recommended Control System: NovaStar VX400";
        } else if (totalPixels < 39000000) {
            recommendedControlSystem = "Recommended Control System: NovaStar VX600";
        } else if (totalPixels < 6500000) {
            recommendedControlSystem = "Recommended Control System: NovaStar VX1000";
        } else {
            recommendedControlSystem = "No suitable control system available for the pixel count.";
        }
    }else{
        recommendedControlSystem =controlSystem
    }
   
    // Display results
    let results = `
    <h2>Results:</h2>
    <p>Total Modules: ${totalModules}</p>
    <p>Total Pixels: ${totalPixels}</p>
    <p>Max Pixel Pitch Used: ${maxPixelPitch.toFixed(2)} mm</p>
    <p>Viewing Distance: ${viewingDistanceDisplay} m</p>
    <p>${recommendedControlSystem}</p>
`;

// Conditionally display screen width and height
if (screenWidth > 0) {
    results += `<p>Screen Width: ${screenWidth.toFixed(2)} m</p>`;
}

if (screenHeight > 0) {
    results += `<p>Screen Height: ${screenHeight.toFixed(2)} m</p>`;
}

    if (totalWidth && totalHeight) {
        results += `
            <h4>Recommended Screen Size:</h4>
            <p>Width: ${totalWidth.toFixed(2)} m</p>
            <p>Height: ${totalHeight.toFixed(2)} m</p>
        `;
    }
    
    document.getElementById("results").innerHTML = results;
});
