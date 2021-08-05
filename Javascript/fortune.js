/* FORTUNE CODE */
Fortunes = ['Daikichi', 'Chukichi', 'Shokichi', 'Kyo', 'Daikyo']
Colors = ['Yellow', 'Green', 'Blue', 'Purple', 'Red', 'Orange', 'Pink', 'Gold', 'Silver']
number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Fort = {
    TodaysFortune(name, array) {
        index = Math.floor(Math.random()*array.length)
        Fort[name] = array[index]
    },
    print(){
        for (const Fo in Fort){
            if (typeof(Fort[Fo]) != 'function') {
                Fort[Fo+'Message'] = `<p>Your lucky ${Fo} Today is ${Fort[Fo]}</p>`
            }
        }
    }
}

function CF(name, ar){
    Fort.TodaysFortune(name, ar)
}

function print(){
    Fort.print()
}


CF('Fortune', Fortunes)
CF('Color', Colors)
CF('Number', number)
/*To keep the reminisce of my old project, the variable "print" is still kept
but this function is changed to create a new message object that contains the fortune messages*/
print()
/* objects created: FortuneMessage,  ColorMessage,  NumberMessage 
    Acess by Fort.object */

/* SOUND VARIABLES */
const start = new Audio('Audio/Openning.mp3')
const mystery = new Audio('Audio/Mystery.mp3')
const pos3 = new Audio('Audio/Pos3.mp3')
const Daikichi = new Audio('Audio/kuji/Daikichi.mp3')
const Chukichi = new Audio('Audio/kuji/Chukichi.mp3')
const Shokichi = new Audio('Audio/kuji/Shokichi.mp3')
const Kyo = new Audio('Audio/kuji/Kyo.mp3')
const Daikyo = new Audio('Audio/kuji/Daikyo.mp3')
const ColorSound1 = new Audio('Audio/ColorFortune/Color1.mp3')
const ColorSound2 = new Audio('Audio/ColorFortune/Color2.mp3')
const NumberOpen = new Audio('Audio/NumberOpen.mp3')

/* DOCUMENT KEY VARIABLES */
let buttonSection = document.getElementById('Button')
let FateButton = document.getElementById('buttonOfFate')
let Fortune = document.getElementById('Fortune')
let HowtoPlay = document.getElementById('HowtoPlay')
//Fortune 1
let cover1 = document.getElementById('cover1')
let kuji1 = document.getElementById('kuji1')
//Fortune 2
let cover2 = document.getElementById('cover2')
let kuji2 = document.getElementById('kuji2')
//Fortune 3
let cover3 = document.getElementById('cover3')
let kuji3 = document.getElementById('kuji3')

/* EVENT FUNCTIONS */
function buttonPress () {
    mystery.play()
    HowtoPlay.style.display = 'none'
    Fortune.style.display = 'block'
    buttonSection.style.display = 'none'
}

//Fortune 1
function removeCover1 () {
    cover1.removeEventListener('click', removeCover1)
    if (Fort.Fortune === 'Daikichi') { //DAIKICHI
        Daikichi.play()
        kuji1.innerHTML = '<h1>大吉</h1>'
        kuji1.innerHTML += Fort.FortuneMessage
        kuji1.innerHTML += '<h2>"Big luck"</h2>'
        kuji1.innerHTML += "<p>You're in fantastic luck! Something amazing may happen to you today!</p>"
        kuji1.querySelector('h1').style.color = 'red'
        kuji1.querySelector('h2').style.color = 'red'
    } else if (Fort.Fortune === 'Chukichi') { //CHUKICHI
        Chukichi.play()
        kuji1.innerHTML = '<h1>中吉</h1>'
        kuji1.innerHTML += Fort.FortuneMessage
        kuji1.innerHTML += '<h2>"Medium luck"</h2>'
        kuji1.innerHTML += '<p>You got some good luck today! Keep your head up high and you may encounter a surprise!</p>'
    } else if (Fort.Fortune === 'Shokichi') { //SHOKICHI
        Shokichi.play()
        kuji1.innerHTML = '<h1>小吉</h1>'
        kuji1.innerHTML += Fort.FortuneMessage
        kuji1.innerHTML += '<h2>"Small luck"</h2>'
        kuji1.innerHTML += '<p>You got a nice day ahead of you!</p>'
    } else if (Fort.Fortune === 'Kyo') {  //KYO
        Kyo.play()
        kuji1.innerHTML = '<h1>凶</h1>'
        kuji1.innerHTML += Fort.FortuneMessage
        kuji1.innerHTML += '<h2>"Curse"</h2>'
        kuji1.innerHTML += "<p>Bad luck, but not the worst. Don't let any of the bad luck get to you, think positive and move foward!</p>"
    } else if (Fort.Fortune === 'Daikyo') {  //DAIKYO
        Daikyo.play()
        kuji1.innerHTML = '<h1>大凶</h1>'
        kuji1.innerHTML += Fort.FortuneMessage
        kuji1.innerHTML += '<h2>"Big Curse"</h2>'
        kuji1.innerHTML += "<p>You have very bad luck today. But it's not the end of the world! Sometimes, the worst of luck turns into the best experiences!</p>"
    }
    kuji1.style.display = 'inline-block'
}
//Fortune 2
function removeCover2 () {
    cover2.removeEventListener('click', removeCover2)
    let RanNum = Math.floor(Math.random()*2)
    if (RanNum === 0) {
        ColorSound1.play()
    }   
    else if (RanNum === 1) {
        ColorSound2.play() 
    }
    kuji2.style.display = 'inline-block'
    kuji2.innerHTML = `<h3>${Fort.Color}</h3>`
    kuji2.innerHTML += `<p>${Fort.ColorMessage}</p>`
    kuji2.querySelector('h3').style.color = Fort.Color.toLowerCase()
}

//Fortune 3
function removeCover3 () {
    NumberOpen.play()
    cover3.removeEventListener('click', removeCover3)
    kuji3.style.display = 'inline-block'
    kuji3.innerHTML = `<h3>${Fort.Number}</h3>`
    kuji3.innerHTML += `<p>${Fort.NumberMessage}</p>`
    kuji3.querySelector('h3').style.color = 'black'
}

/* MAIN */
start.play()
FateButton.addEventListener('click', buttonPress)
cover1.addEventListener('click', removeCover1)
cover2.addEventListener('click', removeCover2)
cover3.addEventListener('click', removeCover3)
