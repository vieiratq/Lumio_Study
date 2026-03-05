const sound = new Audio("../sound/alarm.mp3")
const level = document.getElementById("level")
const storageLevel = localStorage.getItem("level")
let levelPlayer = 1

if (storageLevel){
  level.innerHTML = storageLevel
  levelPlayer = parseInt(storageLevel)
}

const xpPlayer = document.getElementById("xp")
let xp = 0
xpPlayer.innerHTML = xp
const storageXp = localStorage.getItem("xp")

if (storageXp){
  xpPlayer.innerHTML = storageXp
  xp = parseInt(storageXp)
}
// 
levelCheck()

//// troca de nome ////////
const modal = document.getElementById("modal") 
const saveBtn = document.getElementById("savebtn")
const nameUsuario = document.getElementById("userconfig")
const nomeDigitado = document.getElementById("newname")
const erro12 = document.getElementById("mensagem-erro")
const storagename = localStorage.getItem("name")

if (storagename){
  nameUsuario.innerHTML = storagename
}

nameUsuario.addEventListener("click", () => {
    modal.style.display = "flex";
}); 
saveBtn.addEventListener("click", () => { trocarnome() })
    
function trocarnome() {
    const totalLetras = nomeDigitado.value.length;
    if (nomeDigitado.value !== "" && totalLetras < 13 ){
      nameUsuario.innerHTML = nomeDigitado.value
      modal.style.display = "none";
      erro12.style.display = "none";
      localStorage.setItem("name", nomeDigitado.value)
    }
    else if (totalLetras > 12 ){
        erro12.style.display = "flex";
    }
    else if (totalLetras == 0 ){
        modal.style.display = "none";
        erro12.style.display = "none";
    }
}

////// timer //////////
const reset = document.getElementById("reset")
const xpbadge = document.getElementById("xpGanho")
const btnPlay = document.getElementById("startButton")
const timer = document.getElementById("relogio")
const containerTime = document.getElementById("timeSelect") 

let tempoEscolhido = 25
let tempoInicial = tempoEscolhido * 60
let tempoRestante = tempoInicial
let rodando = false
let intervalo

timer.addEventListener("click", () => {
    containerTime.style.display = "flex"
})

atualizarInterface()

reset.addEventListener("click", () => {
    pararTimer()
    tempoRestante = tempoInicial
    atualizarInterface()
})

function atualizarInterface (){
    const minuto = Math.floor(tempoRestante / 60);
    const segundo = Math.floor(tempoRestante % 60);
    let formatoMinuto = minuto.toString().padStart(2, "0");
    let formatosegundo = segundo.toString().padStart(2, "0");
    timer.innerHTML = `${formatoMinuto}:${formatosegundo}`;
}

btnPlay.addEventListener("click", () => {
    alterarTimer()
})

function alterarTimer(){
    if (rodando){
        pararTimer()
    } else {
        iniciarTimer()
    }
}

function iniciarTimer(){
    rodando = true; 
    btnPlay.innerHTML = "Pausar";
    intervalo = setInterval(() => {
        if (tempoRestante > 0){
            tempoRestante--;
            atualizarInterface();
        } else {
            if (sleepCheck === false){
                finalizarTarefa();
            } else {
                pararTimer();
                noSleep(); 
            }
        }
    }, 1000);
}

function finalizarTarefa(){
    pararTimer()
    tempoRestante = tempoInicial
    atualizarInterface()
    showPopup() 
}

function pararTimer() {
    clearInterval(intervalo);
    rodando = false;
    btnPlay.innerHTML = "Play";
}

function ganharXp(){
    let xpGanho = tempoEscolhido * 8
    xpbadge.innerHTML = `+ ${Math.floor(xpGanho)} xp` ; 
    xp = xp + Math.floor(xpGanho) 
    xpPlayer.innerHTML = xp
    localStorage.setItem("xp", xp.toString())
    levelCheck()
}

//////////// xp popup ///////////////
function showPopup() {
    ganharXp();
    sound.play()
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('xp-modal').style.display = 'block';
}

function closePopup() {
    sound.pause()
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('xp-modal').style.display = 'none';
}

/////////// config ////////////////
const nameConfig = document.getElementById("nameConfig")
const sair = document.getElementById("sair")
const timeConfig = document.getElementById("timeConfig")
const btnConfig = document.getElementById("configBTN")
const containerCfg = document.getElementById("containerconfig")
let janela = "close"

function closeConfig(){
    containerCfg.style.display = 'none';
    janela = "close"
}

function openConfig(){
    containerCfg.style.display = 'flex';
    janela = "open"
}

btnConfig.addEventListener("click", () => {
    if (janela == "close"){
        openConfig()
    } else {
        closeConfig()
    }
})

sair.addEventListener("click", () => {
    closeConfig()
})

timeConfig.addEventListener("click", () => {
    containerTime.style.display = "flex";
    pararTimer()
    closeConfig()
})

nameConfig.addEventListener("click", () => {
    closeConfig()
    modal.style.display = "flex";
})

//////////// trocar tempo /////////////////
const easy = document.getElementById("easy")
const medium = document.getElementById("medium")
const hard = document.getElementById("hard")

function modifyTimer(tempo){
    tempoEscolhido = tempo;
    containerTime.style.display = "none";
    tempoInicial = tempoEscolhido * 60;
    tempoRestante = tempoInicial;
    atualizarInterface();
    pararTimer()
}

easy.addEventListener("click", () => { modifyTimer(15); sleepCheck = false; })
medium.addEventListener("click", () => { modifyTimer(25); sleepCheck = false; })
hard.addEventListener("click", () => { modifyTimer(30); sleepCheck = false; })

///////// level up ///////
function levelUp(xpdown){
    xp = xp - xpdown
    levelPlayer = levelPlayer + 1
    localStorage.setItem("level", levelPlayer);
    localStorage.setItem("xp", xp);
    xpPlayer.innerHTML = xp
    level.innerHTML = levelPlayer
}

//// level check
function levelCheck() {
    let xpNecessario = 0;
    if (levelPlayer < 5) {
        xpNecessario = 200;
    } 
    else if (levelPlayer >= 5 && levelPlayer < 10) {
        xpNecessario = 400;
    } 
    else if (levelPlayer >= 10 && levelPlayer < 15) {
        xpNecessario = 700; 
    } 
    else if (levelPlayer >= 15 && levelPlayer < 20) {
        xpNecessario = 1000;
    } 
    else if (levelPlayer >= 20 && levelPlayer <= 30) {
        xpNecessario = 2000;
    }
    else if (levelPlayer > 30) {
        xpNecessario = 2200;
    }
    
    if (xpNecessario > 0 && xp >= xpNecessario) {
        levelUp(xpNecessario);
        levelCheck(); 
    }
}

////// tempo de descanso escolhido /////
let sleepTime = 5
let sleepCheck = false

//// descanso ///////
const easySleepBTN = document.getElementById("easySleep")
const mediumSleepBTN = document.getElementById("mediumSleep")
const hardSleepBTN = document.getElementById("hardSleep")
const descansoBtn = document.getElementById("descansoBtn")
const sleepChose = document.getElementById("sleepSelect")
const sleepBtn = document.getElementById("sleepBtn")

function opensleepChose(){
    sleepChose.style.display = "flex"
}

function closesleepChose(){
    sleepChose.style.display = "none"
}

sleepBtn.addEventListener("click", () => {
    closePopup()
    sleep()
})

function sleep(){
    timer.classList.add("modo-descanso");
    modifyTimer(sleepTime)
    sleepCheck = true;
    iniciarTimer(); 
}

function noSleep(tempodevoltar){
    timer.classList.remove("modo-descanso");
    modifyTimer(tempodevoltar || 25)
    sleepCheck = false
}

descansoBtn.addEventListener("click", () => {
    opensleepChose()
    closeConfig()
})

easySleepBTN.addEventListener("click", () => { sleepTime = 5; closesleepChose(); })
mediumSleepBTN.addEventListener("click", () => { sleepTime = 10; closesleepChose(); })
hardSleepBTN.addEventListener("click", () => { sleepTime = 15; closesleepChose(); })
/////// Sobre /////////
const sobre = document.getElementById("Sobre")
sobre.addEventListener("click", () => {
    window.location.href = "../html/readme.html";
});