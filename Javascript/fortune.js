/* FORTUNE CODE */
Fortunes = ['Daikichi', 'Chukichi', 'Shokichi', 'kyo', 'daikyo']
Colors = ['Yellow', 'Green', 'Blue', 'Purple', 'Red', 'Orange', 'Pink', 'White', 'Black']
number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
end = ''
const Fort = {
    TodaysFortune(name, array) {
        index = Math.floor(Math.random()*array.length)
        Fort[name] = array[index]
    },
    print(){
        for (const Fo in Fort){
            if (typeof(Fort[Fo]) != 'function') {
                end += `<br><br> Your lucky ${Fo} Today is ${Fort[Fo]} <br>`
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
print()

/* SOUND VARIABLES */
const start = new Audio('Audio/Openning.mp3')
const mystery = new Audio('Audio/Mystery.mp3')
const pos3 = new Audio('Audio/Pos3.mp3')
const OmiSound1 = new Audio('Audio/GoodSound.mp3')

/* DOCUMENT KEY VARIABLES */
let buttonSection = document.getElementById('Button')
let FateButton = document.getElementById('buttonOfFate')
let Fortune = document.getElementById('Fortune')
let cover = document.getElementById('cover')
let kuji = document.getElementById('kuji')

/* EVENT FUNCTIONS */
function buttonPress () {
    mystery.play()
    Fortune.style.display = 'block'
    buttonSection.style.display = 'none'
}

function removeCover () {
    OmiSound1.play()
    kuji.style.display = 'inline-block'
    kuji.innerHTML = end
}

/* MAIN */
start.play()
FateButton.addEventListener('click', buttonPress)
cover.addEventListener('click', removeCover)

