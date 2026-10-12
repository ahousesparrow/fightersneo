const menu = document.querySelector('#menu');
const main = document.querySelector('#main');

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

const healthbar1 = document.querySelector('.hbar-p1-meter');
const healthbar1Text = document.querySelector('.hbar-p1-meter-txt');
const ultimate1 = document.querySelector('.ulti-p1-meter');
const healthbar2 = document.querySelector('.hbar-p2-meter');
const healthbar2Text = document.querySelector('.hbar-p2-meter-txt');
const ultimate2 = document.querySelector('.ulti-p2-meter');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

let character1;
let character2;

let emoteTimerPlayer1 = null; let blockTimerPlayer1 = null;
let emoteTimerPlayer2 = null; let blockTimerPlayer2 = null;
let actionTimerPlayer1 = null; let ultimateTimerPlayer1 = null;
let actionTimerPlayer2 = null; let ultimateTimerPlayer2 = null;

let isAttacked1 = false;
let isAttacked2 = false;

let player1AbilityName = '';
let player2AbilityName = '';

const player1KeysAction = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'Space'];
const player1KeysEmote = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6'];
const player2KeysAction = ['Numpad7', 'Numpad8', 'Numpad9', 'NumpadAdd', 'Numpad0'];
const player2KeysEmote = ['Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6'];

const characterData = {
  'character1A': {
    // Basic States
    idle: '50',
    baseHP: '120',
    currentHP: '120',
    
    // Ability 1 (Heavy Attack)
    ability1: '140',
    ability1Damage: '16.5',
    ability1Length: '1700',
    ability1TranslateXStart: '15',
    ability1TranslateYStart: '0',
    
    // Ability 2 (Dash/Fast Attack)
    ability2: '45',
    ability2Damage: '12.5',
    ability2Length: '1500',
    ability2TranslateXStart: '80',
    ability2TranslateYStart: '-5',
    
    // Ability 3 (Medium Attack)
    ability3: '105',
    ability3Damage: '21.5',
    ability3Length: '1600',
    ability3TranslateXStart: '30',
    ability3TranslateYStart: '-2',
    
    // Ultimate (The 5-Hit Move)
    ultimate: '175',
    ultimateDamage: '50',
    ultimateCount: '0', // Starts at 0, goes to 100
    ultimateLength: '2980',
    ultimateLengthEnd: '500',
    ultimateTranslateXStart: '25',
    ultimateTranslateXEnd: '-20',
    ultimateTranslateYStart: '5',
    ultimateTranslateYEnd: '5',
    
    // Defensive Mechanics
    block: '50',
    blockLength: '500',
    blocking: '0', // 1/0
    blockCount: '1',
    penalty: '105',
    penaltyLength: '800',
    penaltyTranslateXStart: '5',
    penaltyTranslateYStart: '0',
    
    // Emotes (Visuals/Taunts)
    emote4: '45',
    emote4Length: '2100',
    emote5: '62',
    emote5Length: '1200',
    emote6: '50',
    emote6Length: '2500',
    emote7: '70',
    emote7Length: '2700',
    emote8: '45',
    emote8Length: '600',
    emote9: '',
    emote9Length: '',
    
    // Over screen
    overWin: '50',
    overLose: '50'
  },
  'character2A': {
    // Basic States
    idle: '50',
    baseHP: '100',
    currentHP: '100',
    
    // Ability 1 (Heavy Attack)
    ability1: '120',
    ability1Damage: '25',
    ability1Length: '1700',
    ability1TranslateXStart: '15',
    ability1TranslateYStart: '-2',
    
    // Ability 2 (Dash/Fast Attack)
    ability2: '85',
    ability2Damage: '20',
    ability2Length: '1500',
    ability2TranslateXStart: '90',
    ability2TranslateYStart: '-5',
    
    // Ability 3 (Medium Attack)
    ability3: '85',
    ability3Damage: '35',
    ability3Length: '1600',
    ability3TranslateXStart: '80',
    ability3TranslateYStart: '-2',
    
    // Ultimate (The 5-Hit Move)
    ultimate: '110',
    ultimateDamage: '40',
    ultimateCount: '0', // Starts at 0, goes to 100
    ultimateLength: '2980',
    ultimateLengthEnd: '500',
    ultimateTranslateXStart: '60',
    ultimateTranslateXEnd: '60',
    ultimateTranslateYStart: '-2',
    ultimateTranslateYEnd: '-2',
    
    // Defensive Mechanics
    block: '50',
    blockLength: '500',
    blocking: '0', // 1/0
    blockCount: '1',
    penalty: '80',
    penaltyLength: '800',
    penaltyTranslateXStart: '5',
    penaltyTranslateYStart: '-2',
    
    // Emotes (Visuals/Taunts)
    emote4: '60',
    emote4Length: '1100',
    emote5: '65',
    emote5Length: '2550',
    emote6: '60',
    emote6Length: '1650',
    emote7: '35',
    emote7Length: '2100',
    emote8: '50',
    emote8Length: '1050',
    emote9: '55',
    emote9Length: '800', //400 x2
        
    // Over screen
    overWin: '50',
    overLose: '50'
  },
  'character3A': {
    // Basic States
    idle: '60',
    baseHP: '80',
    currentHP: '80',
    
    // Ability 1 (Heavy Attack)
    ability1: '120',
    ability1Damage: '5',
    ability1Length: '1700',
    ability1TranslateXStart: '15',
    ability1TranslateYStart: '0',
    
    // Ability 2 (Dash/Fast Attack)
    ability2: '120',
    ability2Damage: '5',
    ability2Length: '1400',
    ability2TranslateXStart: '0',
    ability2TranslateYStart: '2',
    
    // Ability 3 (Medium Attack)
    ability3: '105',
    ability3Damage: '10',
    ability3Length: '1600',
    ability3TranslateXStart: '30',
    ability3TranslateYStart: '-2',
    
    // Ultimate (The 5-Hit Move)
    ultimate: '120',
    ultimateDamage: '80',
    ultimateCount: '0', // Starts at 0, goes to 100
    ultimateLength: '12000',
    ultimateLengthEnd: '500',
    ultimateTranslateXStart: '10',
    ultimateTranslateXEnd: '10',
    ultimateTranslateYStart: '0',
    ultimateTranslateYEnd: '0',
    
    // Defensive Mechanics
    block: '60',
    blockLength: '500',
    blocking: '0', // 1/0
    blockCount: '1',
    penalty: '40',
    penaltyLength: '800',
    penaltyTranslateXStart: '0',
    penaltyTranslateYStart: '-10',
    
    // Emotes (Visuals/Taunts)
    emote4: '',
    emote4Length: '',
    emote5: '',
    emote5Length: '',
    emote6: '',
    emote6Length: '',
    emote7: '',
    emote7Length: '',
    emote8: '',
    emote8Length: '',
    emote9: '',
    emote9Length: '',
        
    // Over screen
    overWin: '60',
    overLose: '60'
  },
  'character4A': {
    // Basic States
    idle: '38',
    baseHP: '80',
    currentHP: '80',
    
    // Ability 1 (Heavy Attack)
    ability1: '167',
    ability1Damage: '10',
    ability1Length: '1700',
    ability1TranslateXStart: '25',
    ability1TranslateYStart: '0',
    
    // Ability 2 (Dash/Fast Attack)
    ability2: '97',
    ability2Damage: '15',
    ability2Length: '2000',
    ability2TranslateXStart: '50',
    ability2TranslateYStart: '0',
    
    // Ability 3 (Medium Attack)
    ability3: '122',
    ability3Damage: '25',
    ability3Length: '3400',
    ability3TranslateXStart: '25',
    ability3TranslateYStart: '-2',
    
    // Ultimate (The 5-Hit Move)
    ultimate: '120',
    ultimateDamage: '45',
    ultimateCount: '0', // Starts at 0, goes to 100
    ultimateLength: '3800',
    ultimateLengthEnd: '500',
    ultimateTranslateXStart: '10',
    ultimateTranslateXEnd: '10',
    ultimateTranslateYStart: '0',
    ultimateTranslateYEnd: '0',
    
    // Defensive Mechanics
    block: '38',
    blockLength: '500',
    blocking: '0', // 1/0
    blockCount: '1',
    penalty: '80',
    penaltyLength: '800',
    penaltyTranslateXStart: '0',
    penaltyTranslateYStart: '-10',
    
    // Emotes (Visuals/Taunts)
    emote4: '38',
    emote4Length: '2100',
    emote5: '65',
    emote5Length: '720',
    emote6: '',
    emote6Length: '',
    emote7: '',
    emote7Length: '',
    emote8: '',
    emote8Length: '',
    emote9: '',
    emote9Length: '',
        
    // Over screen
    overWin: '38',
    overLose: '38'
  },
  'character5A': {
    // Basic States
    idle: '50',
    baseHP: '100',
    currentHP: '100',
    
    // Ability 1 (Heavy Attack)
    ability1: '125',
    ability1Damage: '17',
    ability1Length: '1700',
    ability1TranslateXStart: '15',
    ability1TranslateYStart: '-2',
    
    // Ability 2 (Dash/Fast Attack)
    ability2: '85',
    ability2Damage: '15',
    ability2Length: '1500',
    ability2TranslateXStart: '80',
    ability2TranslateYStart: '-5',
    
    // Ability 3 (Medium Attack)
    ability3: '130',
    ability3Damage: '10',
    ability3Length: '1400',
    ability3TranslateXStart: '35',
    ability3TranslateYStart: '-2',
    
    // Ultimate (The 5-Hit Move)
    ultimate: '170',
    ultimateDamage: '55',
    ultimateCount: '0', // Starts at 0, goes to 100
    ultimateLength: '3600',
    ultimateLengthEnd: '500',
    ultimateTranslateXStart: '40',
    ultimateTranslateXEnd: '40',
    ultimateTranslateYStart: '8',
    ultimateTranslateYEnd: '8',
    
    // Defensive Mechanics
    block: '50',
    blockLength: '500',
    blocking: '0', // 1/0
    blockCount: '1',
    penalty: '70',
    penaltyLength: '800',
    penaltyTranslateXStart: '5',
    penaltyTranslateYStart: '-2',
    
    // Emotes (Visuals/Taunts)
    emote4: '160',
    emote4Length: '5700',
    emote5: '70',
    emote5Length: '6100',
    emote6: '85',
    emote6Length: '6700',
    emote7: '75',
    emote7Length: '6140',
    emote8: '90',
    emote8Length: '4400',
    emote9: '0',
    emote9Length: '0',
        
    // Over screen
    overWin: '50',
    overLose: '50'
  },
};

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
  characterNumber2: document.querySelector('#char-sel-img-p1-n3'),
  characterNumber3: document.querySelector('#char-sel-img-p1-n4'),
  characterNumber4: document.querySelector('#char-sel-img-p1-n5')
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

function overScreen(){
  if(player1.dataset.currentHP <= 0){
    endText.textContent = 'PLAYER 2 WON';
    endText.style.filter = 'drop-shadow(0 0 4vmin red)';
    overP1.style.filter = 'brightness(30%)';
    overP2.style.filter = 'drop-shadow(0 0 20vmin red)';
  }
  else if(player2.dataset.currentHP <= 0){
    endText.textContent = 'PLAYER 1 WON';
    endText.style.filter = 'drop-shadow(0 0 4vmin blue)';
    overP2.style.filter = 'brightness(30%)';
    overP1.style.filter = 'drop-shadow(0 0 20vmin blue)';
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
      console.log('Wowww!');
      if(buttonListMain['buttonNumber0'].dataset.selected === '1'){
        main.style.display = 'none';
        characterSelection.style.display = 'grid';
        characterList.characterNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonBack.style.display = 'block';
        gameState = 'characterSelection';
        supposedNumber = 0;
        currentNumber = 0;
        singleplayer = false;
        const randomNumber = Math.floor(Math.random() * 12) + 1;
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
        p2SelectedChar = true;
        const randomNumber = Math.floor(Math.random() * 12) + 1;
        document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
      }
      else if(buttonListMain['buttonNumber2'].dataset.selected === '1'){
        console.log('Page doesnt exist yet!');
      }
      else if(buttonListMain['buttonNumber3'].dataset.selected === '1'){
        main.style.display = 'none';
        credits.style.display = 'grid';
        buttonBack.style.display = 'block';
        gameState = 'credits';
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
      const randomNumber = Math.floor(Math.random() * 12) + 1;
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
      p2SelectedChar = true;
      const randomNumber = Math.floor(Math.random() * 12) + 1;
      document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
    }
    else if(event.target === buttonListMain.buttonNumber2){
      console.log('Page doesnt exist yet!');
    }
    else if(event.target === buttonListMain.buttonNumber3){
      main.style.display = 'none';
      credits.style.display = 'grid';
      buttonBack.style.display = 'block';
      gameState = 'credits';
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
    }
    
    if(event.target.classList.contains('char-sel-char') && !p1SelectedChar){
      characterList['characterNumber0'].style.filter = 'none'; //clear preselected char
      event.target.dataset.selected = '1';
      event.target.style.filter = 'drop-shadow(0 0 2vmin blue)';
      p1SelectedChar = true;
      console.log('tried picking');
    }
    else if(event.target.classList.contains('char-sel-char') && p1SelectedChar && !p2SelectedChar && event.target.dataset.selected === '0'){
      characterList['characterNumber0'].style.filter = 'none'; //clear preselected char
      event.target.dataset.selected = '2';
      event.target.style.filter = 'drop-shadow(0 0 2vmin red)';
      p2SelectedChar = true;
      console.log('tried picking');
    }
    else if(event.target.classList.contains('char-sel-char') && p1SelectedChar && !p2SelectedChar && event.target.dataset.selected === '1'){
      characterList['characterNumber0'].style.filter = 'none'; //clear preselected char
      event.target.dataset.selected = '3';
      event.target.style.filter = 'drop-shadow(0 0 2vmin blue) drop-shadow(0 0 2vmin magenta)';
      p2SelectedChar = true;
      console.log('tried picking');
    }
    else if (event.target.classList.contains('char-sel-char') && p1SelectedChar && p2SelectedChar){
      menu.style.display = 'none';
      game.style.display = 'block';
      
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
        const randomNumber = Math.floor(Math.random() * 12) + 1;
        document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
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
        p2SelectedChar = false;
        currentNumber = 0;
        const randomNumber = Math.floor(Math.random() * 12) + 1;
        document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
      }
      else if(buttonListOver['buttonNumber2'].dataset.selected === '1'){
        game.style.display = 'none';
        buttonBack.style.display = 'none';
        menu.style.display = 'grid';
        main.style.display = 'grid';
        charSelTextPlayer.textContent = 'PLAYER 1';
        charSelTextBottom.textContent = 'CHOOSE YOUR FIGHTER!';
        characterSelection.style.display = 'none';
        gameState = 'main';
        buttonListOver['buttonNumber' + currentNumber].style.filter = 'none';
        buttonListOver['buttonNumber' + currentNumber].dataset.selected = '0';
        buttonListMain.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonListMain.buttonNumber0.dataset.selected = '1';
        buttonListOver.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonListOver.buttonNumber0.dataset.selected = '1';
        over.style.display = 'none';
        p1SelectedChar = false;
        p2SelectedChar = false;
        currentNumber = 0;
      }
    }
    
    if(event.target === buttonListOver.buttonNumber0){
      over.style.display = 'none';
      game.style.display = 'block';
      gameState = 'game';
      currentNumber = 0;
      const randomNumber = Math.floor(Math.random() * 12) + 1;
      document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
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
      p2SelectedChar = false;
      currentNumber = 0;
      const randomNumber = Math.floor(Math.random() * 12) + 1;
      document.querySelector('#screen').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber}.gif)`;
    }
    else if(event.target === buttonListOver.buttonNumber2){
        game.style.display = 'none';
        buttonBack.style.display = 'none';
        menu.style.display = 'grid';
        main.style.display = 'grid';
        charSelTextPlayer.textContent = 'PLAYER 1';
        charSelTextBottom.textContent = 'CHOOSE YOUR FIGHTER!';
        characterSelection.style.display = 'none';
        gameState = 'main';
        buttonListOver['buttonNumber' + currentNumber].style.filter = 'none';
        buttonListOver['buttonNumber' + currentNumber].dataset.selected = '0';
        buttonListMain.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonListMain.buttonNumber0.dataset.selected = '1';
        buttonListOver.buttonNumber0.style.filter = 'drop-shadow(0 0 2vmin gold)';
        buttonListOver.buttonNumber0.dataset.selected = '1';
        over.style.display = 'none';
        p1SelectedChar = false;
        p2SelectedChar = false;
        currentNumber = 0;
    }
  }
}

// credits
function buttonBackFunc(){
  characterSelection.style.display = 'none';
  credits.style.display = 'none';
  main.style.display = 'grid';
  buttonBack.style.display ='none';
  buttonListMain.buttonNumber0.style.filter = 'none';
  gameState = 'main';
  currentNumber = 0;
}

// event functions
function randomBackground(){
  const randomNumber1 = Math.floor(Math.random() * 12) + 1;
  document.querySelector('#menu').style.backgroundImage = `url(./assets/backgrounds/background${randomNumber1}.gif)`;
}

const numpadKeys = [ //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    { key: "7", code: "Numpad7", keyCode: 103 },
    { key: "8", code: "Numpad8", keyCode: 104 },
    { key: "9", code: "Numpad9", keyCode: 105 },
    { key: "+", code: "NumpadAdd", keyCode: 107 }
];

function keyConfigSPBot() { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(singleplayer == true){
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
    
    console.log(`Fired numpad key: ${code}`);
    const delay = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    setTimeout(keyConfigSPBot, delay);
  }
}

function keyConfigMobile(event){
  if (event.target.id === 'p1mobile-button-q'){
    player1AbilityName = 'ability1';
    actionPlayer({ code: 'KeyQ' });
  }
  else if (event.target.id === 'p1mobile-button-w'){
    player1AbilityName = 'ability2';
    actionPlayer({ code: 'KeyW' });
  }
  else if (event.target.id === 'p1mobile-button-e'){
    player1AbilityName = 'ability3';
    actionPlayer({ code: 'KeyE' });
  }
  else if (event.target.id === 'p1mobile-button-r'){
    player1AbilityName = 'ultimate';
    actionPlayer({ code: 'KeyR' });
  }
  else if (event.target.id === 'p1mobile-button-block'){
    player1AbilityName = 'block';
    actionPlayer({ code: 'Space' });
  }
  else if (event.target.id === 'p2mobile-button-q'){
    player2AbilityName = 'ability1';
    actionPlayer({ code: 'Numpad7' });
  }
  else if (event.target.id === 'p2mobile-button-w'){
    player2AbilityName = 'ability2';
    actionPlayer({ code: 'Numpad8' });
  }
  else if (event.target.id === 'p2mobile-button-e'){
    player2AbilityName = 'ability3';
    actionPlayer({ code: 'Numpad9' });
  }
  else if (event.target.id === 'p2mobile-button-r'){
    player2AbilityName = 'ultimate';
    actionPlayer({ code: 'NumpadAdd' });
  }
  else if (event.target.id === 'p2mobile-button-block'){
    player2AbilityName = 'block';
    actionPlayer({ code: 'Numpad0' });
  }
}

function keyConfig(event){
  if (gameState !== 'game') {
    return; 
  }
  
  if (event.code === player1KeysAction[0] && actionTimerPlayer1 === null) {
    player1AbilityName = 'ability1';
  }
  else if (event.code === player1KeysAction[1] && actionTimerPlayer1 === null) {
    player1AbilityName = 'ability2';
  }
  else if (event.code === player1KeysAction[2] && actionTimerPlayer1 === null) {
    player1AbilityName = 'ability3';
  }
  else if (event.code === player1KeysAction[3] && actionTimerPlayer1 === null) {
    player1AbilityName = 'ultimate';
  }
  else if (event.code === player1KeysEmote[0] && actionTimerPlayer1 === null) {
    player1AbilityName = 'emote4';
  }
  else if (event.code === player1KeysEmote[1] && actionTimerPlayer1 === null) {
    player1AbilityName = 'emote5';
  }
  else if (event.code === player1KeysEmote[2] && actionTimerPlayer1 === null) {
    player1AbilityName = 'emote6';
  }
  else if (event.code === player1KeysEmote[3] && actionTimerPlayer1 === null) {
    player1AbilityName = 'emote7';
  }
  else if (event.code === player1KeysEmote[4] && actionTimerPlayer1 === null) {
    player1AbilityName = 'emote8';
  }
  else if (event.code === player1KeysEmote[5] && actionTimerPlayer1 === null) {
    player1AbilityName = 'emote9';
  }
  else if (event.code === player1KeysAction[4] && actionTimerPlayer1 === null) {
    player1AbilityName = 'block';
  }
  else if (event.code === player2KeysAction[0] && actionTimerPlayer2 === null) {
    player2AbilityName = 'ability1';
  }
  else if (event.code === player2KeysAction[1] && actionTimerPlayer2 === null) {
    player2AbilityName = 'ability2';
  }
  else if (event.code === player2KeysAction[2] && actionTimerPlayer2 === null) {
    player2AbilityName = 'ability3';
  }
  else if (event.code === player2KeysAction[3] && actionTimerPlayer2 === null) {
    player2AbilityName = 'ultimate';
  }
  else if (event.code === player2KeysEmote[0] && actionTimerPlayer2 === null) {
    player2AbilityName = 'emote4';
  }
  else if (event.code === player2KeysEmote[1] && actionTimerPlayer2 === null) {
    player2AbilityName = 'emote5';
  }
  else if (event.code === player2KeysEmote[2] && actionTimerPlayer2 === null) {
    player2AbilityName = 'emote6';
  }
  else if (event.code === player2KeysEmote[3] && actionTimerPlayer2 === null) {
    player2AbilityName = 'emote7';
  }
  else if (event.code === player2KeysEmote[4] && actionTimerPlayer2 === null) {
    player2AbilityName = 'emote8';
  }
  else if (event.code === player2KeysEmote[5] && actionTimerPlayer2 === null) {
    player2AbilityName = 'emote9';
  }
  else if (event.code === player2KeysAction[4] && actionTimerPlayer2 === null) {
    player2AbilityName = 'block';
  }
}

function emotePlayer(event){
  if (gameState !== 'game') {
    return; 
  }
  
  let activePlayer = 0;
  
  if (player1KeysEmote.includes(event.code)) activePlayer = 1;
  else if (player2KeysEmote.includes(event.code)) activePlayer = 2;
  if (activePlayer === 0) return;
  
  if (activePlayer === 1 && actionTimerPlayer1 === null && ultimateTimerPlayer1 === null) {
    if(player1.dataset[player1AbilityName] !== ''){
      if (emoteTimerPlayer1) {
        clearTimeout(emoteTimerPlayer1);
      }
      player1.src = `./assets/characters/${character1}/${player1AbilityName}.gif`;
      player1.style.width = `${parseInt(player1.dataset[player1AbilityName], 10)}vmin`;
      
      let duration = parseInt(player1.dataset[`${player1AbilityName}Length`], 10);

      emoteTimerPlayer1 = setTimeout(() => {
        player1.src = `./assets/characters/${character1}/idle.gif`;
        player1.style.width = `${parseInt(player1.dataset.idle, 10)}vmin`;
        player1.style.setProperty('--translatex', '0');
        player1.style.setProperty('--translatey', '0');
        player1.style.zIndex = '100';
        emoteTimerPlayer1 = null;
        player1AbilityName = '';
      }, duration);
    } else {return;}
  }
  
  if (activePlayer === 2 && actionTimerPlayer2 === null && ultimateTimerPlayer2 === null) {
    if (player2.dataset[player2AbilityName] !== '') {
      if (emoteTimerPlayer2) {
        clearTimeout(emoteTimerPlayer2);
      }
      player2.src = `./assets/characters/${character2}/${player2AbilityName}.gif`;
      player2.style.width = `${parseInt(player2.dataset[player2AbilityName], 10)}vmin`;
      
      let duration = parseInt(player2.dataset[`${player2AbilityName}Length`], 10);
      
      emoteTimerPlayer2 = setTimeout(() => {
        player2.src = `./assets/characters/${character2}/idle.gif`;
        player2.style.width = `${parseInt(player2.dataset.idle, 10)}vmin`;
        player2.style.setProperty('--translatex', '0');
        player2.style.setProperty('--translatey', '0');
        player2.style.zIndex = '100';
        emoteTimerPlayer2 = null;
        player2AbilityName = '';
      }, duration);
    } else { return; }
  }
}

function actionPlayer(event){
  if (gameState !== 'game') {
    return; 
  }
  
  let cooldownLength = 500; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  let player1Cooldown = false; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let player2Cooldown = false; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  let activePlayer = 0;
  
  if (player1KeysAction.includes(event.code)) activePlayer = 1;
  else if (player2KeysAction.includes(event.code)) activePlayer = 2;
  if (activePlayer === 0) return;
  
  if (activePlayer === 1 && player1Cooldown == false){ //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(player1.dataset[`${player1AbilityName}`] !== ''){
      
      if (emoteTimerPlayer1) {
        clearTimeout(emoteTimerPlayer1);
        emoteTimerPlayer1 = null;
      }
      
      const moveDistanceXStart = player1.dataset[`${player1AbilityName}TranslateXStart`];
      const moveDistanceXEnd = player1.dataset[`${player1AbilityName}TranslateXEnd`];
      const moveDistanceYStart = player1.dataset[`${player1AbilityName}TranslateYStart`];
      const moveDistanceYEnd = player1.dataset[`${player1AbilityName}TranslateYEnd`];
      
      let currentHP = parseInt(player2.dataset.currentHP);
      let baseHP = parseInt(player2.dataset.baseHP);
      let currentXP = parseInt(player1.dataset.ultimateCount);
      let damageValue = parseInt(player1.dataset[player1AbilityName + 'Damage']);
      
      function abilityRestart(abilityLength){
        actionTimerPlayer1 = setTimeout(() => {
          
          player1.src = `./assets/characters/${character1}/idle.gif`;
          player1.style.width = `${parseInt(player1.dataset.idle, 10)}vmin`;
          player1.style.setProperty('--translatex', '0');
          player1.style.setProperty('--translatey', '0');
          player1.style.zIndex = '100';
          
          emoteTimerPlayer1 = null;
          
          actionTimerPlayer1 = null;
          ultimateTimerPlayer1 = null;
          
          actionTimerPlayer2 = null;
          ultimateTimerPlayer2 = null;
          
          player1AbilityName = '';
          
          player1.dataset.blocking = '0';
          
          isAttacked2 = false;
          
          player1Cooldown = true; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setTimeout(() => { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            player1Cooldown = false; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          }, cooldownLength); //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        }, parseInt(abilityLength, 10));
      }
      
      if (player1AbilityName === 'block') {
        if(player1.dataset.blockCount === '1'){
          player1.src = `./assets/characters/${character1}/${player1AbilityName}.gif`;
          player1.style.width = `${parseInt(player1.dataset[player1AbilityName], 10)}vmin`;
          player1.dataset.blocking = '1';
          player1.dataset.blockCount = '0';
          
          abilityRestart(player1.dataset[`${player1AbilityName}Length`]);
        } else return;
      }
      else if (player1AbilityName !== 'ultimate' && actionTimerPlayer1 === null && isAttacked1 === false) {
        isAttacked2 = true;
        actionTimerPlayer1 = "locked";
        player1.dataset.blockCount = '1';
        
        setTimeout(() => {
          player2.style.filter = 'brightness(0) invert(1)';
          
          setTimeout(() => {
            player2.style.filter = 'brightness(1) invert(0)';
  
            setTimeout(() => {
              player2.style.filter = 'brightness(0) invert(1)';
  
              setTimeout(() => {
                player2.style.filter = 'brightness(1) invert(0)';
                
                setTimeout(() =>{
                  player2.style.filter = 'brightness(0) invert(1)';
                  
                  setTimeout(() => {
                    player2.style.filter = 'brightness(1) invert(0)';
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 1500);
        
        if(player1AbilityName !== 'ultimate' && player2.dataset.blocking === '1'){  
          player1.src = `./assets/characters/${character1}/penalty.gif`;
          player1.style.width = `${parseInt(player1.dataset.penalty, 10)}vmin`;
          player1.style.setProperty('--translatex', player1.dataset.penaltyTranslateXStart);
          player1.style.setProperty('--translatey', player1.dataset.penaltyTranslateYStart);
          player1.style.zIndex = '100';
          
          let newXP = 0;
          player1.dataset.ultimateCount = newXP;
          ultimate1.style.width = `${newXP}%`;
          
          
          let newHP = currentHP - damageValue * 0.25;
          if (newHP < 0) {
            newHP = 0;
          }
          player2.dataset.currentHP = newHP;
          if(player2.dataset.currentHP <= 0){ overScreen();}
          healthbar2.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
          healthbar2Text.textContent = `${Math.floor((newHP/baseHP)*100)}%`;
          
          abilityRestart(player1.dataset[`${player1AbilityName}Length`]);
        }
        else if (player1AbilityName !== 'ultimate' && player2.dataset.blocking === '0') {
          player1.src = `./assets/characters/${character1}/${player1AbilityName}.gif`;
          player1.style.width = `${parseInt(player1.dataset[player1AbilityName], 10)}vmin`;
          player1.style.setProperty('--translatex', moveDistanceXStart);
          player1.style.setProperty('--translatey', moveDistanceYStart);
          player1.style.zIndex = '150';
          
          setTimeout(() => {
            if(player2.dataset.blocking === '1'){
              player1.src = `./assets/characters/${character1}/penalty.gif`;
              player1.style.width = `${parseInt(player1.dataset.penalty, 10)}vmin`;
              player1.style.setProperty('--translatex', player1.dataset.penaltyTranslateXStart);
              player1.style.setProperty('--translatey', player1.dataset.penaltyTranslateYStart);
              player1.style.zIndex = '100';
              
              let newXP = 0;
              player1.dataset.ultimateCount = newXP;
              ultimate1.style.width = `${newXP}%`;
              
              let newHP = currentHP - damageValue * 0.25;
              if (newHP < 0) {
                newHP = 0;
              }
              player2.dataset.currentHP = newHP;
              if(player2.dataset.currentHP <= 0){ overScreen();}
              healthbar2.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
              healthbar2Text.textContent = `${Math.floor((newHP/baseHP)*100)}%`;

              abilityRestart(parseInt(player1.dataset.penaltyLength));
            }
            else {
              let newXP = currentXP + 20;
              if (newXP > 100) {newXP = 100;}
              player1.dataset.ultimateCount = newXP;
              ultimate1.style.width = `${newXP}%`;
              
              let newHP = currentHP - damageValue;
              if (newHP < 0) {
                newHP = 0;
              }
              player2.dataset.currentHP = newHP;
              if(player2.dataset.currentHP <= 0){ overScreen();}
              healthbar2.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
              healthbar2Text.textContent = `${Math.floor((newHP/baseHP)*100)}%`;
              
              abilityRestart('0');
            }
          }, player1.dataset[`${player1AbilityName}Length`]);
        }
      }
      else if (player1AbilityName === 'ultimate' && actionTimerPlayer1 === null && isAttacked1 === false){
        if(player1.dataset.ultimateCount === '100'){
          isAttacked2 = true;
          actionTimerPlayer1 = "locked";
          player1.dataset.blockCount = '1';
          
          setTimeout(() => {
            player2.style.filter = 'brightness(0) invert(1)';
            
            setTimeout(() => {
              player2.style.filter = 'brightness(1) invert(0)';
    
              setTimeout(() => {
                player2.style.filter = 'brightness(0) invert(1)';
    
                setTimeout(() => {
                  player2.style.filter = 'brightness(1) invert(0)';
                  
                  setTimeout(() =>{
                    player2.style.filter = 'brightness(0) invert(1)';
                    
                    setTimeout(() => {
                      player2.style.filter = 'brightness(1) invert(0)';
                    }, 100);
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 1500);
          
          player1.src = `./assets/characters/${character1}/${player1AbilityName}.gif`;
          player1.style.width = `${parseInt(player1.dataset[player1AbilityName], 10)}vmin`;
          player1.style.setProperty('--translatex', moveDistanceXStart);
          player1.style.setProperty('--translatey', moveDistanceYStart);
          player1.style.zIndex = '150';
          
          ultimateTimerPlayer1 = setTimeout(() => {
            player1.style.setProperty('--translatex', moveDistanceXEnd);
            player1.style.setProperty('--translatey', moveDistanceYEnd);
            
            let newXP = 0;
            player1.dataset.ultimateCount = newXP;
            ultimate1.style.width = `${newXP}%`;
            
            let newHP = currentHP - damageValue;
            if (newHP < 0) {
              newHP = 0;
            }
            player2.dataset.currentHP = newHP;
            if(player2.dataset.currentHP <= 0){ overScreen();}
            healthbar2.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
            healthbar2Text.textContent = `${Math.floor((newHP/baseHP)*100)}%`;
            
            abilityRestart(player1.dataset.ultimateLengthEnd);
          }, parseInt(player1.dataset.ultimateLength - player1.dataset.ultimateLengthEnd, 10));
        }
      }
    }
  }

  if (activePlayer === 2 && player2Cooldown == false){ //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(player2.dataset[`${player2AbilityName}`] !== ''){
      
      if (emoteTimerPlayer2) {
        clearTimeout(emoteTimerPlayer2);
        emoteTimerPlayer2 = null;
      }
      
      const moveDistanceXStart = player2.dataset[`${player2AbilityName}TranslateXStart`];
      const moveDistanceXEnd = player2.dataset[`${player2AbilityName}TranslateXEnd`];
      const moveDistanceYStart = player2.dataset[`${player2AbilityName}TranslateYStart`];
      const moveDistanceYEnd = player2.dataset[`${player2AbilityName}TranslateYEnd`];
      
      let currentHP = parseInt(player1.dataset.currentHP);
      let baseHP = parseInt(player1.dataset.baseHP);
      let currentXP = parseInt(player2.dataset.ultimateCount);
      let damageValue = parseInt(player2.dataset[player2AbilityName + 'Damage']);
      
      function abilityRestart(abilityLength){
        actionTimerPlayer2 = setTimeout(() => {
          
          player2.src = `./assets/characters/${character2}/idle.gif`;
          player2.style.width = `${parseInt(player2.dataset.idle, 10)}vmin`;
          player2.style.setProperty('--translatex', '0');
          player2.style.setProperty('--translatey', '0');
          player2.style.zIndex = '100';
          
          emoteTimerPlayer2 = null;
          
          actionTimerPlayer2 = null;
          ultimateTimerPlayer2 = null;
          
          actionTimerPlayer1 = null;
          ultimateTimerPlayer1 = null;
          
          player2AbilityName = '';
          
          player2.dataset.blocking = '0';
          
          isAttacked1 = false;
          
          player2Cooldown = true; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setTimeout(() => { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            player2Cooldown = false; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          }, cooldownLength); //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        }, parseInt(abilityLength, 10));
      }
      
      if (player2AbilityName === 'block') {
        if(player2.dataset.blockCount === '1'){
          player2.src = `./assets/characters/${character2}/${player2AbilityName}.gif`;
          player2.style.width = `${parseInt(player2.dataset[player2AbilityName], 10)}vmin`;
          player2.dataset.blocking = '1';
          player2.dataset.blockCount = '0';
          
          abilityRestart(player2.dataset[`${player2AbilityName}Length`]);
        } else return;
      }
      else if (player2AbilityName !== 'ultimate' && actionTimerPlayer2 === null && isAttacked2 === false) {
        isAttacked1 = true;
        actionTimerPlayer2 = "locked";
        player2.dataset.blockCount = '1';
        
        setTimeout(() => {
          player1.style.filter = 'brightness(0) invert(1)';
          
          setTimeout(() => {
            player1.style.filter = 'brightness(1) invert(0)';
  
            setTimeout(() => {
              player1.style.filter = 'brightness(0) invert(1)';
  
              setTimeout(() => {
                player1.style.filter = 'brightness(1) invert(0)';
                
                setTimeout(() =>{
                  player1.style.filter = 'brightness(0) invert(1)';
                  
                  setTimeout(() => {
                    player1.style.filter = 'brightness(1) invert(0)';
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 1500);
        
        if(player2AbilityName !== 'ultimate' && player1.dataset.blocking === '1'){  
          player2.src = `./assets/characters/${character2}/penalty.gif`;
          player2.style.width = `${parseInt(player2.dataset.penalty, 10)}vmin`;
          player2.style.setProperty('--translatex', player2.dataset.penaltyTranslateXStart * -1);
          player2.style.setProperty('--translatey', player2.dataset.penaltyTranslateYStart);
          player2.style.zIndex = '100';
          
          let newXP = 0;
          player2.dataset.ultimateCount = newXP;
          ultimate2.style.width = `${newXP}%`;
          
          
          let newHP = currentHP - damageValue * 0.25;
          if (newHP < 0) {
            newHP = 0;
          }
          player1.dataset.currentHP = newHP;
          if(player1.dataset.currentHP <= 0){ overScreen();}
          healthbar1.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
          healthbar1Text.textContent = `${Math.floor((newHP/baseHP)*100)}%`;
          
          abilityRestart(player2.dataset[`${player2AbilityName}Length`]);
        }
        else if (player2AbilityName !== 'ultimate' && player1.dataset.blocking === '0') {
          player2.src = `./assets/characters/${character2}/${player2AbilityName}.gif`;
          player2.style.width = `${parseInt(player2.dataset[player2AbilityName], 10)}vmin`;
          player2.style.setProperty('--translatex', moveDistanceXStart * -1);
          player2.style.setProperty('--translatey', moveDistanceYStart);
          player2.style.zIndex = '150';
          
          setTimeout(() => {
            if(player1.dataset.blocking === '1'){
              player2.src = `./assets/characters/${character2}/penalty.gif`;
              player2.style.width = `${parseInt(player2.dataset.penalty, 10)}vmin`;
              player2.style.setProperty('--translatex', player2.dataset.penaltyTranslateXStart * -1);
              player2.style.setProperty('--translatey', player2.dataset.penaltyTranslateYStart);
              player2.style.zIndex = '100';
              
              let newXP = 0;
              player2.dataset.ultimateCount = newXP;
              ultimate2.style.width = `${newXP}%`;
              
              let newHP = currentHP - damageValue * 0.25;
              if (newHP < 0) {
                newHP = 0;
              }
              player1.dataset.currentHP = newHP;
              if(player1.dataset.currentHP <= 0){ overScreen();}
              healthbar1.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
              healthbar1Text.textContent = `${Math.floor((newHP/baseHP)*100)}%`;

              abilityRestart(parseInt(player2.dataset.penaltyLength));
            }
            else {
              let newXP = currentXP + 20;
              if (newXP > 100) {newXP = 100;}
              player2.dataset.ultimateCount = newXP;
              ultimate2.style.width = `${newXP}%`;
              
              let newHP = currentHP - damageValue;
              if (newHP < 0) {
                newHP = 0;
              }
              player1.dataset.currentHP = newHP;
              if(player1.dataset.currentHP <= 0){ overScreen();}
              healthbar1.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
              healthbar1Text.textContent = `${Math.floor((newHP/baseHP)*100)}%`;
              
              abilityRestart('0');
            }
          }, player2.dataset[`${player2AbilityName}Length`]);
        }
      }
      else if (player2AbilityName === 'ultimate' && actionTimerPlayer2 === null && isAttacked2 === false){
        if(player2.dataset.ultimateCount === '100'){
          isAttacked1 = true;
          actionTimerPlayer2 = "locked";
          player2.dataset.blockCount = '1';
          
          setTimeout(() => {
            player1.style.filter = 'brightness(0) invert(1)';
            
            setTimeout(() => {
              player1.style.filter = 'brightness(1) invert(0)';
    
              setTimeout(() => {
                player1.style.filter = 'brightness(0) invert(1)';
    
                setTimeout(() => {
                  player1.style.filter = 'brightness(1) invert(0)';
                  
                  setTimeout(() =>{
                    player1.style.filter = 'brightness(0) invert(1)';
                    
                    setTimeout(() => {
                      player1.style.filter = 'brightness(1) invert(0)';
                    }, 100);
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 1500);
          
          player2.src = `./assets/characters/${character2}/${player2AbilityName}.gif`;
          player2.style.width = `${parseInt(player2.dataset[player2AbilityName], 10)}vmin`;
          player2.style.setProperty('--translatex', moveDistanceXStart * -1);
          player2.style.setProperty('--translatey', moveDistanceYStart);
          player2.style.zIndex = '150';
          
          ultimateTimerPlayer2 = setTimeout(() => {
            player2.style.setProperty('--translatex', moveDistanceXEnd * -1);
            player2.style.setProperty('--translatey', moveDistanceYEnd);
            
            let newXP = 0;
            player2.dataset.ultimateCount = newXP;
            ultimate2.style.width = `${newXP}%`;
            
            let newHP = currentHP - damageValue;
            if (newHP < 0) {
              newHP = 0;
            }
            player1.dataset.currentHP = newHP;
            if(player1.dataset.currentHP <= 0){ overScreen();}
            healthbar1.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
            healthbar1Text.textContent = `${Math.floor((newHP/baseHP)*100)}%`;
            
            abilityRestart(player2.dataset.ultimateLengthEnd);
          }, parseInt(player2.dataset.ultimateLength - player2.dataset.ultimateLengthEnd, 10));
        }
      }
    }
  }
}

window.scrollTo(0, document.body.scrollHeight);

window.addEventListener('load', randomBackground);

window.addEventListener('keyup', stateManager);
window.addEventListener('touchstart', stateManager);

window.addEventListener('keyup', keyConfig);
window.addEventListener('touchstart', keyConfigMobile);
window.addEventListener('keyup', emotePlayer);
window.addEventListener('keyup', actionPlayer);
window.addEventListener('touchstart', actionPlayer);