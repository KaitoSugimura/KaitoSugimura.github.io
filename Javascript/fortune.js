/* FORTUNE CODE */
Fortunes = ['Daikichi', 'Chukichi', 'Shokichi', 'kyo', 'daikyo']
Colors = ['Yellow', 'Green', 'Blue', 'Purple', 'Red', 'Orange', 'Pink', 'White', 'Black']
number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Fort = {
    TodaysFortune(name, array) {
        index = Math.floor(Math.random()*array.length)
        Fort[name] = array[index]
    },
    print(){
        for (const Fo in Fort){
            if (typeof(Fort[Fo]) != 'function') {
                Fort[Fo+'Message'] = `Your lucky ${Fo} Today is ${Fort[Fo]}`
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
const OmiSound1 = new Audio('Audio/GoodSound.mp3')
const ColorSound1 = new Audio('Audio/ColorFortune/Color1.mp3')
const ColorSound2 = new Audio('Audio/ColorFortune/Color2.mp3')

/* DOCUMENT KEY VARIABLES */
let buttonSection = document.getElementById('Button')
let FateButton = document.getElementById('buttonOfFate')
let Fortune = document.getElementById('Fortune')
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
    Fortune.style.display = 'block'
    buttonSection.style.display = 'none'
}

//Fortune 1
function removeCover1 () {
    OmiSound1.play()
    kuji1.style.display = 'inline-block'
    kuji1.innerHTML = Fort.FortuneMessage
}
//Fortune 2
function removeCover2 () {
    let RanNum = Math.floor(Math.random()*2)
    if (RanNum === 0) {
        ColorSound1.play()
    }   
    else if (RanNum === 1) {
        ColorSound2.play()
    }
    kuji2.style.display = 'inline-block'
    kuji2.innerHTML = Fort.ColorMessage
}
//Fortune 3
function removeCover3 () {
    
    kuji3.style.display = 'inline-block'
    kuji3.innerHTML = Fort.NumberMessage
}

/* MAIN */
start.play()
FateButton.addEventListener('click', buttonPress)
cover1.addEventListener('click', removeCover1)
cover2.addEventListener('click', removeCover2)
cover3.addEventListener('click', removeCover3)
