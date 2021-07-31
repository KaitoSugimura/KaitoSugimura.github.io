let PhotoIndex = 0;
let rightButton = document.getElementById('rightButton');
let leftButton = document.getElementById('leftButton');
let bannerImg = document.getElementById('banner');
let title = document.getElementById('title')

function PhotoRotate () {
    if (PhotoIndex === 0) {
        bannerImg.style.backgroundImage = "url('Photos/KaitoCliff.jpg')";
        title.style.color = '#0fb0f0'
    }
    else if (PhotoIndex === 1) {
        bannerImg.style.backgroundImage = "url('Photos/Karate.jpg')";
        title.style.color = '#ffffff'
    }
} 

function rightButtonClick () {
    PhotoIndex += 1; 
    if (PhotoIndex > 1) {
        PhotoIndex = 0
    }
    PhotoRotate()
}

function leftButtonClick () {
    PhotoIndex -= 1; 
    if (PhotoIndex < 0) {
        PhotoIndex = 1
    }
    PhotoRotate()
}

rightButton.addEventListener('click', rightButtonClick);
leftButton.addEventListener('click', leftButtonClick);