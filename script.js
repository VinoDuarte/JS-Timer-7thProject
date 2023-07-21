const playButtonImage = document.querySelector('.play')
const pauseButtonImage = document.querySelector('.pause')
const playOrPauseButton = document.querySelector('.play-pause')

const clockOrStopButton = document.querySelector('.clock-stop')
const clockButtonImage = document.querySelector('.clock')
const stopButtonImage = document.querySelector('.stop')

const playingOrMuteMusicButton = document.querySelector('.music-playing-mute')
const playingButtonImage = document.querySelector('.music-playing')
const muteButtonImage = document.querySelector('.music-mute')

const timerMinutes = document.querySelector('.minutes')
const timerSeconds = document.querySelector('.seconds')

let timerTimeout
let minutesPrompt

const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")
const bgAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/bg-audio.mp3?raw=true")


function buttonPressAudioPlay() {
  buttonPressAudio.play()
}

function kitchenTimerPlay() {
  kitchenTimer.play()
}

function bgAudioPlay() {
  bgAudio.play()
}

function bgAudioPause() {
  bgAudio.pause()
}

function toggleAllButtons() {
  playButtonImage.classList.toggle('open')
  pauseButtonImage.classList.toggle('open')
  stopButtonImage.classList.toggle('open')
  clockButtonImage.classList.toggle('open')
}

function togglePlayPauseButton () {
  playButtonImage.classList.toggle('open')
  pauseButtonImage.classList.toggle('open')
}


function playPauseClockStopHideCombo() {
  toggleAllButtons()
  stopButtonImage.classList.toggle('hide')
}

function resetTimer() {
  timerMinutes.textContent = minutesPrompt === undefined ? '25' : String(minutesPrompt).padStart(2, '0')
  timerSeconds.textContent = '00'
}

function keepPlayButton() {
  playButtonImage.classList.remove('open')
  pauseButtonImage.classList.remove('open')
}

function toggleClockStopButton() {
  stopButtonImage.classList.toggle('open')
  clockButtonImage.classList.toggle('open')
}

// onclick functions


function counting() {


  if (pauseButtonImage.classList.contains('hide')) {
    
    timerTimeout = setTimeout(function () {  
    let seconds = Number(timerSeconds.textContent)
    let minutes = Number(timerMinutes.textContent)

    if(seconds <= 0) {
      seconds = 60
  
      if(minutes <= 0) {
        playPauseClockStopHideCombo()
        resetTimer()
        kitchenTimerPlay()
        return;
      }

      timerMinutes.textContent = String(minutes - 1).padStart(2, "0")
    }

    timerSeconds.textContent =  String(seconds - 1).padStart(2, "0")
    
    
    counting()
  }, 1000)}
  
}


playOrPauseButton.onclick = () => {
  if(playButtonImage.classList.contains('open')) {
    togglePlayPauseButton()
    buttonPressAudioPlay()
    clearTimeout(timerTimeout)
    return;
  }

  togglePlayPauseButton()
  clockButtonImage.classList.add('open')
  stopButtonImage.classList.add('open')
  stopButtonImage.classList.remove('hide')
  buttonPressAudioPlay()
  
  counting()  
}

clockOrStopButton.onclick = function resetuno() {

  if(stopButtonImage.classList.contains('hide')) {
   minutesPrompt = prompt('Digite quantos minutos você quer:') || '00'
   resetTimer()
   buttonPressAudioPlay()
   keepPlayButton()
  } 
  
  if(stopButtonImage.classList.contains('open')){
    toggleClockStopButton()
    keepPlayButton()
    clearTimeout(timerTimeout)
    resetTimer()
    buttonPressAudioPlay()
    stopButtonImage.classList.toggle('hide')
  }

}

function togglePlayingMute() {
  playingButtonImage.classList.toggle('open')
  muteButtonImage.classList.toggle('open')
}

playingOrMuteMusicButton.onclick = () => {
  if(playingButtonImage.classList.contains('hide')) {
    bgAudioPlay()
    togglePlayingMute()
    playingButtonImage.classList.remove('hide')
    muteButtonImage.classList.add('hide')
  }
  
  else {
  bgAudioPause()
  togglePlayingMute()
  playingButtonImage.classList.toggle('hide')
  muteButtonImage.classList.remove('hide')
  playingButtonImage.classList.add('hide')
  }
  
}