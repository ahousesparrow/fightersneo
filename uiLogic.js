const menu = document.querySelector('#menu');
const main = document.querySelector('#main');

// menu and screen
const charSelTextPlayer = document.querySelector('#char-sel-txt-player');
const charSelTextBottom = document.querySelector('#char-sel-txt-bottom');
const credits = document.querySelector('#credits');
const buttonBack = document.querySelector('#button-back');
const game = document.querySelector('#game');
const characterSelection = document.querySelector('#char-sel');
const end = document.querySelector('#end');
const endText = document.querySelector('#end-txt');
const over = document.querySelector('#over');
const overP1 = document.querySelector('#over-img-p1');
const overP2 = document.querySelector('#over-img-p2');

// sounds
const buttonSelectMP3 = new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/buttonSelection1.mp3');
const charSelectMP3 = new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/selectYourChampion.mp3');
const deathMP3 = {
  death1: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death1.mp3'),
  death2: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death2.mp3'),
  death3: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death3.mp3'),
  death4: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death4.mp3'),
  death5: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death5.mp3'),
  death6: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death6.mp3'),
  death7: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death7.mp3'),
  death8: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death8.mp3')
}
const deathSpMP3 = {
  death1: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death1Sp.mp3'),
  death2: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death2Sp.mp3'),
  death3: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death3Sp.mp3'),
  death4: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/death4Sp.mp3')
}
const roundMP3 = {
  round1: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/fight.mp3'), //Fight!
  round2: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/2nd%20round.mp3'), //2nd round!
  round3: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/3rd%20round.mp3'), //3rd round!
  round4: new Audio('https://github.com/ahousesparrow/neocitiesAssets/raw/refs/heads/main/gameover.mp3') //Game over!
}

function playSound(sound) {
  sound.play();
}
function stopSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}

// ui
const healthbar1 = document.querySelector('.hbar-p1-meter');
const healthbar1Text = document.querySelector('.hbar-p1-meter-txt');
const ultimate1 = document.querySelector('.ulti-p1-meter');
const healthbar2 = document.querySelector('.hbar-p2-meter');
const healthbar2Text = document.querySelector('.hbar-p2-meter-txt');
const ultimate2 = document.querySelector('.ulti-p2-meter');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const wincounter1 = document.querySelector('.win-counter-p1');
const wincounter2 = document.querySelector('.win-counter-p2');

let gameState = 'main';
let supposedNumber = 0;
let currentNumber = 0;


function applyCharacterStats(playerElement, characterName) {
  const stats = characterData[characterName];
  if (stats) {
    Object.entries(stats).forEach(([key, value]) => {
        playerElement.dataset[key] = value;
    });
  }
}

const buttonListMain = {
  buttonNumber0: document.querySelector('#main-button-n1'),
  buttonNumber1: document.querySelector('#main-button-n2'),
  buttonNumber2: document.querySelector('#main-button-n3'),
  buttonNumber3: document.querySelector('#main-button-n4')
}
const buttonListP1Mobile = {
  buttonNumber0: document.querySelector('p1mobile-button-q'),
  buttonNumber1: document.querySelector('p1mobile-button-w'),
  buttonNumber2: document.querySelector('p1mobile-button-e'),
  buttonNumber3: document.querySelector('p1mobile-button-r'),
  buttonNumber4: document.querySelector('p1mobile-button-block'),
}
const buttonListP2Mobile = {
  buttonNumber0: document.querySelector('p2mobile-button-q'),
  buttonNumber1: document.querySelector('p2mobile-button-w'),
  buttonNumber2: document.querySelector('p2mobile-button-e'),
  buttonNumber3: document.querySelector('p2mobile-button-r'),
  buttonNumber4: document.querySelector('p2mobile-button-block'),
}
const buttonListOver = {
  buttonNumber0: document.querySelector('#over-button-n1'),
  buttonNumber1: document.querySelector('#over-button-n2'),
  buttonNumber2: document.querySelector('#over-button-n3')
}
const characterList = {
  characterNumber0: document.querySelector('#char-sel-img-p1-n1'),
  characterNumber1: document.querySelector('#char-sel-img-p1-n2'),
  characterNumber2: document.querySelector('#char-sel-img-p1-n6'),
  characterNumber3: document.querySelector('#char-sel-img-p1-n3'),
  characterNumber4: document.querySelector('#char-sel-img-p1-n4'),
  characterNumber5: document.querySelector('#char-sel-img-p1-n5')
}

if (buttonListMain.buttonNumber0) {
  buttonListMain.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
  buttonListMain.buttonNumber0.dataset.selected = '1';
}
if (buttonListOver.buttonNumber0) {
  buttonListOver.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
  buttonListOver.buttonNumber0.dataset.selected = '1';
}
if (characterList.characterNumber0) {
  characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
}

let buttonCountMain = Object.keys(buttonListMain).length;
let buttonCountOver = Object.keys(buttonListOver).length;
let characterCount = Object.keys(characterList).length;

let p1SelectedChar = false;
let p2SelectedChar = false;
let singleplayer = false;

function announceRound(){
  stopSound(charSelectMP3);
  if((player1Score + player2Score) === 1){
    playSound(roundMP3.round2);
  }
  else if((player1Score + player2Score) === 2){
    playSound(roundMP3.round3);
  }
  else {
    playSound(roundMP3.round1);
  }
}

function overScreen(){
  if(player1.dataset.currentHP <= 0){
    endText.textContent = 'PLAYER 2 WON';
    endText.style.filter = 'drop-shadow(0 0 4vmin red)';
    overP1.style.filter = 'brightness(30%)';
    overP2.style.filter = 'drop-shadow(0 0 20vmin red)';
    
    player2Score += 1;
    
    wincounter2.textContent = player2Score;
  }
  else if(player2.dataset.currentHP <= 0){
    endText.textContent = 'PLAYER 1 WON';
    endText.style.filter = 'drop-shadow(0 0 4vmin blue)';
    overP2.style.filter = 'brightness(30%)';
    overP1.style.filter = 'drop-shadow(0 0 20vmin blue)';
    
    player1Score += 1;
    
    wincounter1.textContent = player1Score;
  }
  
  overP1.src = `./assets/characters/${player1.dataset.character}/idle.gif`;
  overP1.style.width = `${parseInt(player1.dataset.idle, 10)}vmin`;
  overP2.src = `./assets/characters/${player2.dataset.character}/idle.gif`;
  overP2.style.width = `${parseInt(player2.dataset.idle, 10)}vmin`;
  
  gameState = 'over';

  end.style.backgroundColor = 'rgba(0, 0, 0, .7)';
  
  currentNumber = 0;
  
  setTimeout(() => {
    gameState = 'over';
    end.style.backgroundColor = 'transparent';
    endText.textContent = ' ';
    game.style.display = 'none';
    over.style.display = 'grid';
    player1.dataset.currentHP = player1.dataset.baseHP;
    player2.dataset.currentHP = player2.dataset.baseHP;
    player1.dataset.blockCount = '1';
    player2.dataset.blockCount = '1';
    player1.dataset.ultimateCount = '0';
    player2.dataset.ultimateCount = '0';
    healthbar1.style.width = '100%';
    healthbar2.style.width = '100%';
    healthbar1Text.textContent = '100%';
    healthbar2Text.textContent = '100%';
    ultimate1.style.width = '0%';
    ultimate2.style.width = '0%';
  }, 5000);
}

function stateManager(event){
  if(gameState === 'main'){
    if (event.key === ' '){
      buttonListMain['buttonNumber' + currentNumber].style.filter = 'none';
      buttonListMain['buttonNumber' + currentNumber].dataset.selected = '0';
      
      currentNumber += 1;
      
      if(currentNumber >= buttonCountMain){
        currentNumber = 0;
      }
      
      buttonListMain['buttonNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin gold)';
      buttonListMain['buttonNumber' + currentNumber].dataset.selected = '1';
    }
    else if (event.key === 'Enter'){
      if(buttonListMain['buttonNumber0'].dataset.selected === '1'){
        main.style.display = 'none';
        characterSelection.style.display = 'grid';
        characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonBack.style.display = 'block';
        gameState = 'characterSelection';
        supposedNumber = 0;
        currentNumber = 0;
        singleplayer = false;
        playSound(charSelectMP3);
        const randomNumber = Math.floor(Math.random() * 18) + 1;
        document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
      }
      else if(buttonListMain['buttonNumber1'].dataset.selected === '1'){
        main.style.display = 'none';
        characterSelection.style.display = 'grid';
        characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonBack.style.display = 'block';
        gameState = 'characterSelection';
        supposedNumber = 1;
        currentNumber = 0;
        singleplayer = true; keyConfigSPBot();
        playSound(charSelectMP3);
        p2SelectedChar = true;
        const randomNumber = Math.floor(Math.random() * 18) + 1;
        document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
      }
      else if(buttonListMain['buttonNumber2'].dataset.selected === '1'){
        console.log('Page doesnt exist yet!');
        if (document.querySelector(".dance")) {document.querySelector(".dance").remove(); document.querySelector(".danceText").remove();}
        else if (!document.querySelector(".dance")) {
          const dance = document.createElement("div");
          dance.style.backgroundImage = "url(./assets/characters/dance.gif)";
          dance.style.backgroundRepeat = "no-repeat";
          dance.style.backgroundSize = "cover";
          dance.style.left = "-15%";
          dance.style.position = "absolute";
          dance.style.width = "100vw";
          dance.style.height = "100vh";
          dance.style.zIndex = "1";
          dance.classList.add("dance");
          document.querySelector("#main").appendChild(dance);

          const danceText = document.createElement("h1");
          danceText.style.position = "absolute";
          danceText.style.zIndex = "2";
          danceText.textContent = "COME BACK LATER!";
          danceText.style.color = "white";
          danceText.style.fontSize = "4vw";
          danceText.style.left = "30%";
          danceText.style.bottom = "30%";
          danceText.classList.add("danceText");
          document.querySelector("#main").appendChild(danceText);
        }
        playSound(buttonSelectMP3);
      }
      else if(buttonListMain['buttonNumber3'].dataset.selected === '1'){
        main.style.display = 'none';
        credits.style.display = 'grid';
        buttonBack.style.display = 'block';
        gameState = 'credits';
        playSound(buttonSelectMP3);
      }
    }
    
    if(event.target === buttonListMain.buttonNumber0){
      main.style.display = 'none';
      characterSelection.style.display = 'grid';
      characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
      buttonBack.style.display = 'block';
      gameState = 'characterSelection';
      supposedNumber = 0;
      currentNumber = 0;
      singleplayer = false;
      playSound(charSelectMP3);
      const randomNumber = Math.floor(Math.random() * 18) + 1;
      document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
    }
    else if(event.target === buttonListMain.buttonNumber1){
      main.style.display = 'none';
      characterSelection.style.display = 'grid';
      characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
      buttonBack.style.display = 'block';
      gameState = 'characterSelection';
      supposedNumber = 1;
      currentNumber = 0;
      singleplayer = true; keyConfigSPBot();
      playSound(charSelectMP3);
      p2SelectedChar = true;
      const randomNumber = Math.floor(Math.random() * 18) + 1;
      document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
    }
    else if(event.target === buttonListMain.buttonNumber2){
      console.log('Page doesnt exist yet!');
      playSound(buttonSelectMP3);
    }
    else if(event.target === buttonListMain.buttonNumber3){
      main.style.display = 'none';
      credits.style.display = 'grid';
      buttonBack.style.display = 'block';
      gameState = 'credits';
      playSound(buttonSelectMP3);
    }
  }
  else if(gameState === 'characterSelection'){
    if(event.key === ' ' && !p1SelectedChar){
      characterList['characterNumber' + currentNumber].style.filter = 'none';
      
      currentNumber += 1;
      
      if(currentNumber >= characterCount){
        currentNumber = 0;
      }
      
      characterList['characterNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin gold)';
    }
    
    else if (event.key === ' ' && p1SelectedChar && !p2SelectedChar){
      if(characterList['characterNumber' + currentNumber].dataset.selected === '1'){
        characterList['characterNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin blue)';
      }
      else characterList['characterNumber' + currentNumber].style.filter = 'none';
      
      currentNumber += 1;
      
      if(currentNumber >= characterCount){
        currentNumber = 0;
      }
      
      if(characterList['characterNumber' + currentNumber].dataset.selected === '1'){
        characterList['characterNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin blue) drop-shadow(0 0 2vmin magenta)';
      }
      else characterList['characterNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin gold)';
    }
    
    else if (event.key === 'Enter' && p1SelectedChar && p2SelectedChar){
      menu.style.display = 'none';
      game.style.display = 'block';
      announceRound();
      
      for(let i = 0; i < characterCount; i++){
        if(characterList['characterNumber' + i].dataset.selected === '1'){
          player1.src = `./assets/characters/${characterList['characterNumber' + i].dataset.character}/idle.gif`;
          player1.dataset.character = characterList['characterNumber' + i].dataset.character;
          applyCharacterStats(player1, characterList['characterNumber' + i].dataset.character);
          character1 = player1.dataset.character;
          player1.style.width = `${player1.dataset.idle}vmin`;
        }
        else if(characterList['characterNumber' + i].dataset.selected === '2' && !singleplayer){
          player2.src = `./assets/characters/${characterList['characterNumber' + i].dataset.character}/idle.gif`;
          player2.dataset.character = characterList['characterNumber' + i].dataset.character;
          applyCharacterStats(player2, characterList['characterNumber' + i].dataset.character);
          character2 = player2.dataset.character;
          player2.style.width = `${player2.dataset.idle}vmin`;
        }
        else if(characterList['characterNumber' + i].dataset.selected === '3' && !singleplayer){
          player1.src = `./assets/characters/${characterList['characterNumber' + i].dataset.character}/idle.gif`;
          player2.src = `./assets/characters/${characterList['characterNumber' + i].dataset.character}/idle.gif`;
          player1.dataset.character = characterList['characterNumber' + i].dataset.character;
          player2.dataset.character = characterList['characterNumber' + i].dataset.character;
          applyCharacterStats(player1, characterList['characterNumber' + i].dataset.character);
          applyCharacterStats(player2, characterList['characterNumber' + i].dataset.character);
          character1 = player1.dataset.character;
          character2 = player2.dataset.character;
          player1.style.width = `${player1.dataset.idle}vmin`;
          player2.style.width = `${player2.dataset.idle}vmin`;
        }
        else if(p1SelectedChar && p2SelectedChar && singleplayer){
          const randomNumber = Math.floor(Math.random() * 4) + 1;
          player2.src = `./assets/characters/${characterList['characterNumber' + randomNumber].dataset.character}/idle.gif`;
          player2.dataset.character = characterList['characterNumber' + randomNumber].dataset.character;
          applyCharacterStats(player2, characterList['characterNumber' + randomNumber].dataset.character);
          character2 = player2.dataset.character;
          player2.style.width = `${player2.dataset.idle}vmin`;
        }
      }
      for(let i = 0; i < characterCount; i++){
        characterList['characterNumber' + i].style.filter = 'none';
        characterList['characterNumber' + i].dataset.selected = '0';
      }
      currentNumber = 0;
      
      gameState = 'game';
    }
    
    else if (event.code === 'Enter'){
      if (p1SelectedChar && !p2SelectedChar){
        p2SelectedChar = true;
        if(characterList['characterNumber' + currentNumber].dataset.selected === '1'){
          characterList['characterNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin blue) drop-shadow(0 0 2vmin magenta)';
          characterList['characterNumber' + currentNumber].dataset.selected = '3';
        }
        else{
          characterList['characterNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin red)';
          characterList['characterNumber' + currentNumber].dataset.selected = '2';
        }
        charSelTextPlayer.textContent = 'ARE YOU READY?';
        charSelTextBottom.textContent = '[enter]';
      }
      
      else if (!p2SelectedChar || singleplayer){
        p1SelectedChar = true;
        characterList['characterNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin blue)';
        characterList['characterNumber' + currentNumber].dataset.selected = '1';
        if (singleplayer == false){
          currentNumber = (currentNumber + 1) % characterCount;
          characterList['characterNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin gold)';
          charSelTextPlayer.textContent = 'PLAYER 2';
        }
      }
    }
    
    else if(event.key === 'Backspace'){
      for(let i = 0; i < characterCount; i++){
        characterList['characterNumber' + i].style.filter = 'none';
        characterList['characterNumber' + i].dataset.selected = '0';
      }
      p1SelectedChar = false;
      p2SelectedChar = false;
      singleplayer = false;
      characterSelection.style.display = 'none';
      main.style.display = 'grid';
      buttonBack.style.display ='none';
      gameState = 'main';
      currentNumber = supposedNumber;
      stopSound(charSelectMP3);
    }
    
    if(event.target.classList.contains('char-sel-char') && !p1SelectedChar){
      characterList['characterNumber0'].style.filter = 'none'; //clear preselected char
      event.target.dataset.selected = '1';
      event.target.style.filter = 'drop-shadow(0 0 2vmin blue)';
      p1SelectedChar = true;
    }
    else if(event.target.classList.contains('char-sel-char') && p1SelectedChar && !p2SelectedChar && event.target.dataset.selected === '0'){
      characterList['characterNumber0'].style.filter = 'none'; //clear preselected char
      event.target.dataset.selected = '2';
      event.target.style.filter = 'drop-shadow(0 0 2vmin red)';
      p2SelectedChar = true;
    }
    else if(event.target.classList.contains('char-sel-char') && p1SelectedChar && !p2SelectedChar && event.target.dataset.selected === '1'){
      characterList['characterNumber0'].style.filter = 'none'; //clear preselected char
      event.target.dataset.selected = '3';
      event.target.style.filter = 'drop-shadow(0 0 2vmin blue) drop-shadow(0 0 2vmin magenta)';
      p2SelectedChar = true;
    }
    else if (event.target.classList.contains('char-sel-char') && p1SelectedChar && p2SelectedChar){
      menu.style.display = 'none';
      game.style.display = 'block';
      announceRound();
      
      for(let i = 0; i < characterCount; i++){
        if(characterList['characterNumber' + i].dataset.selected === '1'){
          player1.src = `./assets/characters/${characterList['characterNumber' + i].dataset.character}/idle.gif`;
          player1.dataset.character = characterList['characterNumber' + i].dataset.character;
          applyCharacterStats(player1, characterList['characterNumber' + i].dataset.character);
          character1 = player1.dataset.character;
          player1.style.width = `${player1.dataset.idle}vmin`;
        }
        else if(characterList['characterNumber' + i].dataset.selected === '2'){
          player2.src = `./assets/characters/${characterList['characterNumber' + i].dataset.character}/idle.gif`;
          player2.dataset.character = characterList['characterNumber' + i].dataset.character;
          applyCharacterStats(player2, characterList['characterNumber' + i].dataset.character);
          character2 = player2.dataset.character;
          player2.style.width = `${player2.dataset.idle}vmin`;
        }
        else if(characterList['characterNumber' + i].dataset.selected === '3'){
          player1.src = `./assets/characters/${characterList['characterNumber' + i].dataset.character}/idle.gif`;
          player2.src = `./assets/characters/${characterList['characterNumber' + i].dataset.character}/idle.gif`;
          player1.dataset.character = characterList['characterNumber' + i].dataset.character;
          player2.dataset.character = characterList['characterNumber' + i].dataset.character;
          applyCharacterStats(player1, characterList['characterNumber' + i].dataset.character);
          applyCharacterStats(player2, characterList['characterNumber' + i].dataset.character);
          character1 = player1.dataset.character;
          character2 = player2.dataset.character;
          player1.style.width = `${player1.dataset.idle}vmin`;
          player2.style.width = `${player2.dataset.idle}vmin`;
        }
        else if(p1SelectedChar && p2SelectedChar && singleplayer){
          const randomNumber = Math.floor(Math.random() * 4) + 1;
          player2.src = `./assets/characters/${characterList['characterNumber' + randomNumber].dataset.character}/idle.gif`;
          player2.dataset.character = characterList['characterNumber' + randomNumber].dataset.character;
          applyCharacterStats(player2, characterList['characterNumber' + randomNumber].dataset.character);
          character2 = player2.dataset.character;
          player2.style.width = `${player2.dataset.idle}vmin`;
        }
      }
      for(let i = 0; i < characterCount; i++){
        characterList['characterNumber' + i].style.filter = 'none';
        characterList['characterNumber' + i].dataset.selected = '0';
      }
      characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
      currentNumber = 0;
      
      gameState = 'game';
    }
  }
  else if(gameState === 'credits'){
    if(event.key === 'Backspace'){
      credits.style.display = 'none';
      main.style.display = 'grid';
      buttonBack.style.display ='none';
      gameState = 'main';
      currentNumber = 3;
    }
  }
  else if(gameState === 'over'){
    if (event.key === ' '){
      buttonListOver['buttonNumber' + currentNumber].style.filter = 'none';
      buttonListOver['buttonNumber' + currentNumber].dataset.selected = '0';
      
      currentNumber += 1;
      
      if(currentNumber >= buttonCountOver){
        currentNumber = 0;
      }
      
      buttonListOver['buttonNumber' + currentNumber].style.filter = 'drop-shadow(0 0 2vmin gold)';
      buttonListOver['buttonNumber' + currentNumber].dataset.selected = '1';
    }
    else if (event.key === 'Enter'){
      if(buttonListOver['buttonNumber0'].dataset.selected === '1'){
        over.style.display = 'none';
        game.style.display = 'block';
        gameState = 'game';
        currentNumber = 0;
        const randomNumber = Math.floor(Math.random() * 18) + 1;
        document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
        announceRound();
      }
      else if(buttonListOver['buttonNumber1'].dataset.selected === '1'){
        menu.style.display = 'grid';
        over.style.display = 'none';
        characterSelection.style.display = 'grid';
        characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonBack.style.display = 'block';
        gameState = 'characterSelection';
        buttonListOver['buttonNumber' + currentNumber].style.filter = 'none';
        buttonListOver['buttonNumber' + currentNumber].dataset.selected = '0';
        p1SelectedChar = false;
        if(singleplayer === true){p2SelectedChar = true;}
        else{p2SelectedChar = false;}
        currentNumber = 0;
        const randomNumber = Math.floor(Math.random() * 18) + 1;
        document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
        charSelTextPlayer.textContent = 'PLAYER 1';
        charSelTextBottom.textContent = 'SELECT YOUR CHAMPION';
        playSound(charSelectMP3);
      }
      else if(buttonListOver['buttonNumber2'].dataset.selected === '1'){
        game.style.display = 'none';
        buttonBack.style.display = 'none';
        menu.style.display = 'grid';
        main.style.display = 'grid';
        charSelTextPlayer.textContent = 'PLAYER 1';
        charSelTextBottom.textContent = 'SELECT YOUR CHAMPION!';
        characterSelection.style.display = 'none';
        gameState = 'main';
        buttonListOver['buttonNumber' + currentNumber].style.filter = 'none';
        buttonListOver['buttonNumber' + currentNumber].dataset.selected = '0';
        buttonListMain.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonListMain.buttonNumber0.dataset.selected = '1';
        buttonListOver.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonListOver.buttonNumber0.dataset.selected = '1';
        wincounter1.textContent = "0";
        wincounter2.textContent = "0";
        over.style.display = 'none';
        p1SelectedChar = false;
        p2SelectedChar = false;
        singleplayer = false;
        currentNumber = 0;
        playSound(roundMP3.round4);
      }
    }
    
    if(event.target === buttonListOver.buttonNumber0){
      over.style.display = 'none';
      game.style.display = 'block';
      gameState = 'game';
      currentNumber = 0;
      const randomNumber = Math.floor(Math.random() * 18) + 1;
      document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
      announceRound();
    }
    else if(event.target === buttonListOver.buttonNumber1){
      menu.style.display = 'grid';
      over.style.display = 'none';
      characterSelection.style.display = 'grid';
      characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
      buttonBack.style.display = 'block';
      gameState = 'characterSelection';
      buttonListOver['buttonNumber' + currentNumber].style.filter = 'none';
      buttonListOver['buttonNumber' + currentNumber].dataset.selected = '0';
      p1SelectedChar = false;
      if(singleplayer === true){p2SelectedChar = true;}
      else{p2SelectedChar = false;}
      currentNumber = 0;
      const randomNumber = Math.floor(Math.random() * 18) + 1;
      document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
      charSelTextPlayer.textContent = 'PLAYER 1';
      charSelTextBottom.textContent = 'SELECT YOUR CHAMPION';
      playSound(charSelectMP3);
    }
    else if(event.target === buttonListOver.buttonNumber2){
        game.style.display = 'none';
        buttonBack.style.display = 'none';
        menu.style.display = 'grid';
        main.style.display = 'grid';
        charSelTextPlayer.textContent = 'PLAYER 1';
        charSelTextBottom.textContent = 'SELECT YOUR CHAMPION';
        characterSelection.style.display = 'none';
        gameState = 'main';
        buttonListOver['buttonNumber' + currentNumber].style.filter = 'none';
        buttonListOver['buttonNumber' + currentNumber].dataset.selected = '0';
        buttonListMain.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonListMain.buttonNumber0.dataset.selected = '1';
        buttonListOver.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonListOver.buttonNumber0.dataset.selected = '1';
        wincounter1.textContent = "0";
        wincounter2.textContent = "0";
        over.style.display = 'none';
        p1SelectedChar = false;
        p2SelectedChar = false;
        singleplayer = false;
        currentNumber = 0;
        playSound(roundMP3.round4);
    }
  }
}

function buttonBackFunc(){
  characterSelection.style.display = 'none';
  credits.style.display = 'none';
  main.style.display = 'grid';
  buttonBack.style.display ='none';
  buttonListMain.buttonNumber0.style.filter = 'none';
  gameState = 'main';
  currentNumber = 0;
  stopSound(charSelectMP3);
}

function randomBackground(){
  const randomNumber1 = Math.floor(Math.random() * 18) + 1;
  document.querySelector('#menu').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber1}.gif)`;
}

const numpadKeys = [ //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    { key: "7", code: "Numpad7", keyCode: 103 },
    { key: "8", code: "Numpad8", keyCode: 104 },
    { key: "9", code: "Numpad9", keyCode: 105 },
    { key: "+", code: "NumpadAdd", keyCode: 107 }
];

function keyConfigSPBot() { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(singleplayer === true){
    singleplayer = false;
    const { key, code, keyCode } = numpadKeys[Math.floor(Math.random() * numpadKeys.length)];
  
    const keyDownEvent = new KeyboardEvent("keydown", {
        key,
        code,
        keyCode,
        charCode: keyCode,
        bubbles: true
    });
  
    const keyUpEvent = new KeyboardEvent("keyup", {
        key,
        code,
        keyCode,
        charCode: keyCode,
        bubbles: true
    });
  
    const target = document.activeElement || document.body;
    target.dispatchEvent(keyDownEvent);
    target.dispatchEvent(keyUpEvent);
    
    singleplayer = true;
    console.log(`Fired numpad key: ${code}`);
    const delay = Math.floor(Math.random() * (1500 - 100 + 1)) + 100;
    setTimeout(keyConfigSPBot, delay);
  }
}

window.scrollTo(0, document.body.scrollHeight);

window.addEventListener('load', randomBackground);

window.addEventListener('keyup', stateManager);
window.addEventListener('touchstart', stateManager);