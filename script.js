document.addEventListener("DOMContentLoaded", function () {
    const characterPreview = document.getElementById("character-preview");
    const coll = document.querySelectorAll(".collapsible");

    // Add click event listeners to each heading
    coll.forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                // Close all other collapsible sections
                coll.forEach(element => {
                    if (element !== item) {
                        element.classList.remove("active");
                        element.nextElementSibling.style.display = "none";
                    }
                });
                // Open the clicked section
                content.style.display = "block";
            }
        });
    });

    function updatePreview() {

        // Get the selected options
        const selectedBackground = document.querySelector('input[name="background"]:checked').value;
        const selectedSkin = document.querySelector('input[name="skin"]:checked').value;
        const selectedEyes = document.querySelector('input[name="eyes"]:checked').value;
        const selectedHairstyle = document.querySelector('input[name="hairstyle"]:checked').value;

        // Hide all hair color options
        const hairColorContainers = document.querySelectorAll('.color-options');
        hairColorContainers.forEach(container => {
            container.style.display = "none";
        });

        // Show hair color options for the selected hairstyle
        const selectedHairColorContainer = document.getElementById(selectedHairstyle + "-color-options");
        if (selectedHairColorContainer) {
            selectedHairColorContainer.style.display = "block";
        }

        const selectedHairColor = document.querySelector('input[name="hair-color"]:checked').value;
        const selectedTops = document.querySelector('input[name="tops"]:checked').value;
        const selectedBottoms = document.querySelector('input[name="bottoms"]:checked').value;
        const selectedShoes = document.querySelector('input[name="shoes"]:checked').value;
        const selectedEarrings = document.querySelector('input[name="earrings"]:checked').value;
        const selectedOtherFeatures = document.querySelector('input[name="otherFeatures"]:checked').value;

        // Construct the path of the full-size image for each selected option
        const backgroundImagePath = 'fullImages/background/' + selectedBackground + '.png';
        const skinImagePath = 'fullImages/skin/' + selectedSkin + '.png';
        const eyesImagePath = 'fullImages/eyes/' + selectedEyes + '.png';
        const hairstyleImagePath = 'fullImages/hairstyle/' + selectedHairstyle + '/' + selectedHairColor + '.png';
        const topsImagePath = 'fullImages/tops/' + selectedTops + '.png';
        const bottomsImagePath = 'fullImages/bottoms/' + selectedBottoms + '.png';
        const shoesImagePath = 'fullImages/shoes/' + selectedShoes + '.png';
        const earringsImagePath = 'fullImages/earrings/' + selectedEarrings + '.png';
        const otherFeaturesImagePath = 'fullImages/otherFeatures/' + selectedOtherFeatures + '.png';
        const CameraImagePath = 'fullImages/camera.png';

        // Construct an array of image paths
        const imagePaths = [
            backgroundImagePath,
            skinImagePath,
            eyesImagePath,
            hairstyleImagePath,
            topsImagePath,
            bottomsImagePath,
            shoesImagePath,
            earringsImagePath,
            otherFeaturesImagePath,
            CameraImagePath
        ];

        // Preload all images and update the character preview once all images are loaded
        const imageLoadPromises = imagePaths.map(path => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = path;
        }));

        Promise.all(imageLoadPromises).then(() => {
            const previewHTML = imagePaths.map(path => `<img src="${path}" alt="Character Image">`).join('');
            document.getElementById("character-preview").innerHTML = previewHTML;
        }).catch(error => console.error("Failed to load images", error));

        // Construct the HTML for the stacked preview
        const previewHTML = `
            <img src="${backgroundImagePath}" alt="Background">
            <img src="${skinImagePath}" alt="Skin Tone">
            <img src="${eyesImagePath}" alt="Eye Color">
            <img src="${otherFeaturesImagePath}" alt="Other Features">
            <img src="${hairstyleImagePath}" alt="Hairstyle">
            <img src="${CameraImagePath}" alt="Camera"> <!-- Corrected here -->
            <img src="${bottomsImagePath}" alt="Bottoms">
            <img src="${shoesImagePath}" alt="Shoes">
            <img src="${topsImagePath}" alt="Tops">
            <img src="${earringsImagePath}" alt="Earrings">
        `;

        // Update character preview with the stacked images
        characterPreview.innerHTML = previewHTML;
    }

    // Get all radio button options
    const backgroundOptions = document.querySelectorAll('input[name="background"]');
    const skinOptions = document.querySelectorAll('input[name="skin"]');
    const eyesOptions = document.querySelectorAll('input[name="eyes"]');
    const hairstyleOptions = document.querySelectorAll('input[name="hairstyle"]');
    const hairColorOptions = document.querySelectorAll('input[name="hair-color"]');
    const topsOptions = document.querySelectorAll('input[name="tops"]');
    const bottomsOptions = document.querySelectorAll('input[name="bottoms"]');
    const shoesOptions = document.querySelectorAll('input[name="shoes"]');
    const earringsOptions = document.querySelectorAll('input[name="earrings"]');
    const otherFeaturesOptions = document.querySelectorAll('input[name="otherFeatures"]');

    // Add event listeners to all radio button options
    backgroundOptions.forEach(option => option.addEventListener("change", updatePreview));
    skinOptions.forEach(option => option.addEventListener("change", updatePreview));
    eyesOptions.forEach(option => option.addEventListener("change", updatePreview));
    hairstyleOptions.forEach(option => option.addEventListener("change", function () {
        updatePreview();
        // Trigger click event on the color section to ensure it's expanded
        const selectedHairstyle = document.querySelector('input[name="hairstyle"]:checked').value;
        const selectedHairColorSection = document.getElementById(selectedHairstyle + "-color-options");
        if (selectedHairColorSection) {
            selectedHairColorSection.previousElementSibling.click();
        }
    }));
    hairColorOptions.forEach(option => option.addEventListener("change", updatePreview));
    topsOptions.forEach(option => option.addEventListener("change", updatePreview));
    bottomsOptions.forEach(option => option.addEventListener("change", updatePreview));
    shoesOptions.forEach(option => option.addEventListener("change", updatePreview));
    earringsOptions.forEach(option => option.addEventListener("change", updatePreview));
    otherFeaturesOptions.forEach(option => option.addEventListener("change", updatePreview));

    // Initial preview update
    updatePreview();
// Mobile-specific conditions
function applyMobileConditions() {
    if (window.innerWidth <= 600) {
        const submitButton = document.getElementById('submit-button');
        if (submitButton) {
            submitButton.style.display = 'block';
            submitButton.style.width = '80%';
            submitButton.style.margin = '20px auto';
        }
    }
}

window.addEventListener('resize', applyMobileConditions);
applyMobileConditions(); // Apply mobile conditions initially

});
