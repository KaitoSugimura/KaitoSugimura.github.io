let PhotoIndex = 0;
let BorderSwitch = false;
let rightButton = document.getElementById('rightButton');
let leftButton = document.getElementById('leftButton');
let bannerImg = document.getElementById('banner');
let title = document.getElementById('title')
let BorderButton = document.getElementById('borderButton')
let TipButton = document.getElementById('tipButton')
let Tips = document.getElementById('tips')
let img1 = document.getElementById('img1')
let img2 = document.getElementById('img2')
let img3 = document.getElementById('img3')
let img1Button = document.getElementById('imgButton1')
let img2Button = document.getElementById('imgButton2')
let img3Button = document.getElementById('imgButton3')


function PhotoRotate () {
    if (PhotoIndex === 0) {
        bannerImg.style.backgroundImage = "url('Photos/KaitoCliff.jpg')";
        title.style.color = '#0fb0f0'
        title.innerHTML = 'Hello! My name is Kaito Sugimura, and Welcome to my website!'
    }
    else if (PhotoIndex === 1) {
        bannerImg.style.backgroundImage = "url('Photos/Karate.jpg')";
        title.style.color = '#000'
        title.innerHTML = 'Our Karate showdown at the Calgary Japanese Festival "Omatsuri"'
    }
    else if (PhotoIndex === 2) {
        bannerImg.style.backgroundImage = "url('Photos/KarateWin.jpg')";
        title.style.color = 'black'
        title.innerHTML = 'Me winning a Gold medal at Quebec City, Shotokan National Karate'
    }
} 

function Border () {
    if (BorderSwitch===false) {
        title.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
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

function displayTips () {
    if (TipButton.innerHTML == 'Click here to read tips') {
        Tips.style.display = 'block'
        TipButton.innerHTML = 'Hide Tips'
    } else {
        Tips.style.display = 'none'
        TipButton.innerHTML = 'Click here to read tips'
    }
    
}

function displayImage1 () {
    if (img1Button.innerHTML == 'Display image') {
        img1.style.display = 'block'
        img1Button.innerHTML = 'Hide image'
    } else {
        img1.style.display = 'none'
        img1Button.innerHTML = 'Display image'
    }
    
}
function displayImage2 () {
    if (img2Button.innerHTML == 'Display image') {
        img2.style.display = 'block'
        img2Button.innerHTML = 'Hide image'
    } else {
        img2.style.display = 'none'
        img2Button.innerHTML = 'Display image'
    }
    
}
function displayImage3 () {
    if (img3Button.innerHTML == 'Display image') {
        img3.style.display = 'block'
        img3Button.innerHTML = 'Hide image'
    } else {
        img3.style.display = 'none'
        img3Button.innerHTML = 'Display image'
    }
    
}


rightButton.addEventListener('click', rightButtonClick);
leftButton.addEventListener('click', leftButtonClick);
BorderButton.addEventListener('click', Border);
TipButton.addEventListener('click', displayTips)
img1Button.addEventListener('click', displayImage1)
img2Button.addEventListener('click', displayImage2)
img3Button.addEventListener('click', displayImage3)