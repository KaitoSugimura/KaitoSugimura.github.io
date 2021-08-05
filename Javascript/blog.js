let setInOrder = document.getElementById('InOrder')
let setReverseOrder = document.getElementById('ReverseOrder')
let setStared = document.getElementById('Stared')
let main = document.getElementById('main')

let posts = document.getElementsByClassName('post')
let starPosts = document.getElementsByClassName('star')

const settings = [setInOrder, setReverseOrder, setStared]


const button = new Audio('Audio/button.mp3')


function Display (event) {

    button.play()
    //Change color
    for (let i of settings) {
        i.style.backgroundColor = 'white'
    }
    event.target.style.backgroundColor = 'lightblue'
    
    //change displays and settings vvv
    if (event.target == setInOrder) {
        main.style.flexWrap = 'wrap'
        for (let i in posts) {
            posts[i].style.display = 'block';
        }

    } 
    
    else if (event.target == setReverseOrder) {
        main.style.flexWrap = 'wrap-reverse'
        for (let i in posts) {
            posts[i].style.display = 'block';
        }

    } 
    
    else if (event.target == setStared) {

        for (let i in posts) {
            posts[i].style.display = 'none';
        };
        for (let i in starPosts) {
            starPosts[i].style.display = 'block';
        };
    }
}


settings.forEach(item => {
    item.addEventListener('click', Display)
  })