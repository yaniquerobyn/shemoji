document.addEventListener("DOMContentLoaded", function () {
    const characterPreview = document.getElementById("character-preview");
    const coll = document.querySelectorAll(".collapsible");
    const loader = document.getElementById('loader'); // Loader element


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

     // Get all the checkboxes for the other features
     var checkboxes = document.querySelectorAll('input[name="otherFeatures"]');

     // Listen for changes on the checkboxes
     checkboxes.forEach(function(checkbox) {
         checkbox.addEventListener('change', function() {
             updatePreview();
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

        
        // Construct the path of the full-size image for each selected option
        const backgroundImagePath = 'fullImages/background/' + selectedBackground + '.png';
        const skinImagePath = 'fullImages/skin/' + selectedSkin + '.png';
        const eyesImagePath = 'fullImages/eyes/' + selectedEyes + '.png';
        const hairstyleImagePath = 'fullImages/hairstyle/' + selectedHairstyle + '/' + selectedHairColor + '.png';
        const shoesImagePath = 'fullImages/shoes/' + selectedShoes + '.png';
        const bottomsImagePath = 'fullImages/bottoms/' + selectedBottoms + '.png';
        const topsImagePath = 'fullImages/tops/' + selectedTops + '.png';
        const earringsImagePath = 'fullImages/earrings/' + selectedEarrings + '.png';
      //  const otherFeaturesImagePaths = Array.from(selectedOtherFeaturesNodes).map(node => 'fullImages/otherFeatures/' + node.value + '.png');        
        const CameraImagePath = 'fullImages/camera.png';
  // Handle multiple selections for otherFeatures
  const selectedOtherFeaturesNodes = document.querySelectorAll('input[name="otherFeatures"]:checked');
  let otherFeaturesImagePaths = [];
  selectedOtherFeaturesNodes.forEach(node => {
      const featureValue = node.value;
      let imagePath;
      if (featureValue === 'freckles') {
          switch (selectedSkin) {
              case 'fair':
                  imagePath = 'fullImages/otherFeatures/frecklesFair.png';
                  break;
              case 'tan':
                  imagePath = 'fullImages/otherFeatures/frecklesTan.png';
                  break;
              case 'deep':
              case 'deeper':
                  imagePath = 'fullImages/otherFeatures/frecklesDeep.png';
                  break;
              default:
                  imagePath = 'fullImages/otherFeatures/' + featureValue + '.png';
          }
      } else {
          imagePath = 'fullImages/otherFeatures/' + featureValue + '.png';
      }
      otherFeaturesImagePaths.push(imagePath);
  });


        // Construct an array of image paths
        const imagePaths = [
            backgroundImagePath,
            skinImagePath,
            eyesImagePath,
            hairstyleImagePath,
            ...otherFeaturesImagePaths,
            shoesImagePath,
            bottomsImagePath,
            topsImagePath,
            earringsImagePath,
            CameraImagePath
        ];
 // Add the selected features to the character preview
   // otherFeatures.forEach(function(feature) {
   // var img = document.createElement('img');
   // img.src = 'thumbnails/otherFeatures/' + feature + '.png';
   // characterPreview.appendChild(img);
//});

        const hiddenContainer = document.getElementById('hidden-container');

        const imageLoadPromises = imagePaths.map(path => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                hiddenContainer.appendChild(img);
                resolve(path);
            };
            img.onerror = reject;
            img.src = path;
        }));
        // Show the loader before starting the image loading process
        loader.style.display = 'block';

        Promise.all(imageLoadPromises).then((paths) => {
            const previewHTML = paths.map(path => `<img src="${path}" alt="Character Image" style="position: absolute;">`).join('');
            characterPreview.innerHTML = previewHTML;
            hiddenContainer.innerHTML = ''; // Clear the hidden container
       // Hide the loader when all images have loaded
       loader.style.display = 'none';
    }).catch(error => {
        console.error("Failed to load images", error);

        // Hide the loader if there was an error
        loader.style.display = 'none';
    });
    }

    const options = document.querySelectorAll('input[type="radio"]');
    options.forEach(option => option.addEventListener("change", updatePreview));

    updatePreview(); // Initial preview update

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