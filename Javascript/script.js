let PhotoIndex = 0;
let BorderSwitch = false;
let rightButton = document.getElementById('rightButton');
let leftButton = document.getElementById('leftButton');
let bannerImg = document.getElementById('banner');
let title = document.getElementById('title')
let BorderButton = document.getElementById('borderButton')
let TipButton = document.getElementById('tipButton')
let Tips = document.getElementById('tips')


function PhotoRotate () {
    if (PhotoIndex === 0) {
        bannerImg.style.backgroundImage = "url('Photos/KaitoCliff.jpg')";
        title.style.color = '#0fb0f0'
        title.style.top = '4.2rem'
        title.innerHTML = 'Hello! My name is Kaito Sugimura, and Welcome to my website!'
    }
    else if (PhotoIndex === 1) {
        bannerImg.style.backgroundImage = "url('Photos/Karate.jpg')";
        title.style.color = '#000'
        title.style.top = '4.2rem'
        title.innerHTML = 'Our Karate showdown at the Calgary Japanese Festival "Omatsuri"'
    }
    else if (PhotoIndex === 2) {
        bannerImg.style.backgroundImage = "url('Photos/KarateWin.jpg')";
        title.style.color = 'black'
        title.style.top = '21rem'
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

function hideTips () {
    Tips.style.display = 'none'
    TipButton.innerHTML = 'Click here to read tips'
}

rightButton.addEventListener('click', rightButtonClick);
leftButton.addEventListener('click', leftButtonClick);
BorderButton.addEventListener('click', Border);
TipButton.addEventListener('click', displayTips)