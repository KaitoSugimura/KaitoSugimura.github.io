let PhotoIndex = 0;
let BorderSwitch = false;
let rightButton = document.getElementById('rightButton');
let leftButton = document.getElementById('leftButton');
let bannerImg = document.getElementById('banner');
let title = document.getElementById('title')
let BorderButton = document.getElementById('borderButton')

function PhotoRotate () {
    if (PhotoIndex === 0) {
        bannerImg.style.backgroundImage = "url('Photos/KaitoCliff.jpg')";
        title.style.color = '#0fb0f0'
        title.style.top = '4.2rem'
    }
    else if (PhotoIndex === 1) {
        bannerImg.style.backgroundImage = "url('Photos/Karate.jpg')";
        title.style.color = '#ffffff'
        title.style.top = '4.2rem'
    }
    else if (PhotoIndex === 2) {
        bannerImg.style.backgroundImage = "url('Photos/KarateWin.jpg')";
        title.style.color = 'rgb(255, 214, 51)'
        title.style.top = '21rem'
    }
} 

function Border () {
    if (BorderSwitch===false) {
        title.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        BorderButton.innerHTML = 'Text Border Off'
        BorderSwitch = true
    } else {
        title.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        BorderButton.innerHTML = 'Text Border On'
        BorderSwitch = false
    }
}


function rightButtonClick () {
    PhotoIndex += 1; 
    if (PhotoIndex > 2) {
        PhotoIndex = 0
    }
    PhotoRotate()
}

function leftButtonClick () {
    PhotoIndex -= 1; 
    if (PhotoIndex < 0) {
        PhotoIndex = 2
    }
    PhotoRotate()
}

rightButton.addEventListener('click', rightButtonClick);
leftButton.addEventListener('click', leftButtonClick);
BorderButton.addEventListener('click', Border);