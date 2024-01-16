// Add this to your script.js file

function zoomImage(imagePath) {
    // Create a modal element
    var modal = document.createElement('div');
    modal.className = 'modal';
  
    // Create an image element inside the modal
    var modalImage = document.createElement('img');
    modalImage.src = imagePath;
    modalImage.alt = 'Zoomed Certificate';
  
    // Append the image to the modal
    modal.appendChild(modalImage);
  
    // Append the modal to the body
    document.body.appendChild(modal);
  
    // Close the modal when clicking outside the image
    modal.onclick = function () {
      document.body.removeChild(modal);
    };
  }
  