// DOM fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Home click listener
    document.querySelector('.nav-link[href="#Home"]').addEventListener('click', fetchPlants);
    // About click listener
    document.querySelector('.nav-link[href="#About"]').addEventListener('click', showAbout);
  
    // Fetch plants initially
    fetchPlants();
});

// Fetch plants
function fetchPlants() {
    // Cache-busting URL - using this for sometimes JSON is cached and don't update with new version
    const url = 'https://raw.githubusercontent.com/F-i-l-i-p-e/PlantAPI/main/plants.json?' + new Date().getTime();
  
    fetch(url)
        .then(response => response.json())
        .then(plants => {
            const container = document.getElementById('plants-container');
            container.classList.remove('about-mode'); // Remove class
            container.innerHTML = ''; // Clear content
  
            plants.forEach(plant => {
                const plantCard = document.createElement('div');
                plantCard.className = 'plant-card';
                plantCard.innerHTML = `
                <img src="${plant.image}" alt="${plant.name}">
                <h4>${plant.name}</h4>
                <p><strong>Description:</strong> ${plant.description}</p>
                <p><strong>Growing Conditions:</strong> ${plant.growingConditions}</p>
                `;
                container.appendChild(plantCard);
  
                // Image click listener
                plantCard.querySelector('img').addEventListener('click', function() {
                    showImage(plant.image);
                });
            });
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

// Show About
function showAbout() {
    const container = document.getElementById('plants-container');
    container.classList.add('about-mode'); // Add class
    const aboutContent = `
    <div class="about-content">
        <h2>Welcome to Plant Encyclopedia</h2>
        <p>Embark on a botanical journey with Plant Encyclopedia, a comprehensive repository of plant information. Whether you are an aspiring botanist, a seasoned gardener, or simply a lover of flora, our collection offers an in-depth exploration of the natural world. Discover the unique characteristics, growing conditions, and captivating images of various plant species from around the globe. Let the beauty of nature inspire you!</p>
    </div>
    `;
    container.innerHTML = aboutContent;
}
// Function to click and open image
function showImage(imageSrc) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `<img src="${imageSrc}" class="enlarged-image" alt="Enlarged Image">`;
    document.body.appendChild(overlay);
  
    // Click to hide image
    overlay.addEventListener('click', hideImage);
    
    // Esc to hide image
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') hideImage();
    });
}

function hideImage() {
    const overlay = document.querySelector('.overlay');
    if (overlay) document.body.removeChild(overlay); // Remove overlay
}
