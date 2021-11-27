const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '92kmHIhmmfu1Ceimz8M5lnCwXWAT7rCxxH3R0s-h8aU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements for links & photos, add to DOM

// Helper function for Setting attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // console.log('ready =', ready);
    }
}

const displayPhotos = () => {
    //Run function for each object in photosArray
    totalImages = photosArray.length;
    imagesLoaded = 0;

    photosArray.forEach((photo) => {
        // console.log('total images', totalImages);

        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // Example: item.setAttribute('href', photo.links.html);
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create <img> for photo
        const img = document.createElement('img');
        // Example: img.setAttribute('src', photo.urls.regular);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: `Author: ${photo.user.name} - Liked ${photo.likes} times`,
        });

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put them both inside imageContainer element

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photosh from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        // console.log(photosArray);
    } catch (error) {
        // Catch error Here
    }
}

// Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos();