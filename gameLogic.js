let character1;
let character2;

let emoteTimerPlayer1 = null; let blockTimerPlayer1 = null;
let emoteTimerPlayer2 = null; let blockTimerPlayer2 = null;
let ultimateTimerPlayer1 = null;
let ultimateTimerPlayer2 = null;

let player1AbilityName = '';
let player2AbilityName = '';

let player1Score = 0;
let player2Score = 0;
let roundCount = 0;

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

    // Cooldown and attack
    playerCooldown: '0',
    attacked: '0',
    actionTimerPlayer: '0',
    
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
        
    // Cooldown and attack
    playerCooldown: '0',
    attacked: '0',
    actionTimerPlayer: '0',

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

    // Cooldown and attack
    playerCooldown: '0',
    attacked: '0',
    actionTimerPlayer: '0',
        
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

    // Cooldown and attack
    playerCooldown: '0',
    attacked: '0',
    actionTimerPlayer: '0',
        
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

    // Cooldown and attack
    playerCooldown: '0',
    attacked: '0',
    actionTimerPlayer: '0',
        
    // Over screen
    overWin: '50',
    overLose: '50'
  },
  'character6A': {
    // Basic States
    idle: '85',
    baseHP: '100',
    currentHP: '100',
    
    // Ability 1 (Heavy Attack)
    ability1: '135',
    ability1Damage: '25',
    ability1Length: '1400',
    ability1TranslateXStart: '-5',
    ability1TranslateYStart: '-2',
    
    // Ability 2 (Dash/Fast Attack)
    ability2: '180',
    ability2Damage: '10',
    ability2Length: '1720',
    ability2TranslateXStart: '-10',
    ability2TranslateYStart: '-5',
    
    // Ability 3 (Medium Attack)
    ability3: '85',
    ability3Damage: '15',
    ability3Length: '1200',
    ability3TranslateXStart: '35',
    ability3TranslateYStart: '-2',
    
    // Ultimate (The 5-Hit Move)
    ultimate: '135',
    ultimateDamage: '35',
    ultimateCount: '0', // Starts at 0, goes to 100
    ultimateLength: '3000',
    ultimateLengthEnd: '500',
    ultimateTranslateXStart: '15',
    ultimateTranslateXEnd: '15',
    ultimateTranslateYStart: '0',
    ultimateTranslateYEnd: '0',
    
    // Defensive Mechanics
    block: '85',
    blockLength: '500',
    blocking: '0', // 1/0
    blockCount: '1',
    penalty: '70',
    penaltyLength: '1000',
    penaltyTranslateXStart: '5',
    penaltyTranslateYStart: '-2',
    
    // Emotes (Visuals/Taunts)
    emote4: '160',
    emote4Length: '900',
    emote5: '70',
    emote5Length: '2600',
    emote6: '85',
    emote6Length: '3610',
    emote7: '75',
    emote7Length: '1400',
    emote8: '',
    emote8Length: '',
    emote9: '',
    emote9Length: '',

    // Cooldown and attack
    playerCooldown: '0',
    attacked: '0',
    actionTimerPlayer: '0',
        
    // Over screen
    overWin: '50',
    overLose: '50'
  },
};


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
  else if (event.target.id === 'p2mobile-button-q' && singleplayer === false){
    player2AbilityName = 'ability1';
    actionPlayer({ code: 'Numpad7' });
  }
  else if (event.target.id === 'p2mobile-button-w' && singleplayer === false){
    player2AbilityName = 'ability2';
    actionPlayer({ code: 'Numpad8' });
  }
  else if (event.target.id === 'p2mobile-button-e' && singleplayer === false){
    player2AbilityName = 'ability3';
    actionPlayer({ code: 'Numpad9' });
  }
  else if (event.target.id === 'p2mobile-button-r' && singleplayer === false){
    player2AbilityName = 'ultimate';
    actionPlayer({ code: 'NumpadAdd' });
  }
  else if (event.target.id === 'p2mobile-button-block' && singleplayer === false){
    player2AbilityName = 'block';
    actionPlayer({ code: 'Numpad0' });
  }
}

function keyConfig(event){
  if (gameState !== 'game') {
    return; 
  }
  
  if (event.code === player1KeysAction[0] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'ability1';
  }
  else if (event.code === player1KeysAction[1] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'ability2';
  }
  else if (event.code === player1KeysAction[2] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'ability3';
  }
  else if (event.code === player1KeysAction[3] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'ultimate';
  }
  else if (event.code === player1KeysEmote[0] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'emote4';
  }
  else if (event.code === player1KeysEmote[1] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'emote5';
  }
  else if (event.code === player1KeysEmote[2] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'emote6';
  }
  else if (event.code === player1KeysEmote[3] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'emote7';
  }
  else if (event.code === player1KeysEmote[4] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'emote8';
  }
  else if (event.code === player1KeysEmote[5] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'emote9';
  }
  else if (event.code === player1KeysAction[4] && player1.dataset.actionTimerPlayer == '0') {
    player1AbilityName = 'block';
  }
  else if (event.code === player2KeysAction[0] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'ability1';
  }
  else if (event.code === player2KeysAction[1] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'ability2';
  }
  else if (event.code === player2KeysAction[2] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'ability3';
  }
  else if (event.code === player2KeysAction[3] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'ultimate';
  }
  else if (event.code === player2KeysEmote[0] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'emote4';
  }
  else if (event.code === player2KeysEmote[1] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'emote5';
  }
  else if (event.code === player2KeysEmote[2] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'emote6';
  }
  else if (event.code === player2KeysEmote[3] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'emote7';
  }
  else if (event.code === player2KeysEmote[4] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'emote8';
  }
  else if (event.code === player2KeysEmote[5] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'emote9';
  }
  else if (event.code === player2KeysAction[4] && player2.dataset.actionTimerPlayer == '0' && singleplayer === false) {
    player2AbilityName = 'block';
  }
}


function calcHP(playerN, healthbarN, healthbarNText, playerM, playerMAbilityName, portion){
  let damageValue = parseInt(playerM.dataset[playerMAbilityName + 'Damage']);

  let currentHP = parseInt(playerN.dataset.currentHP);
  let baseHP = parseInt(playerN.dataset.baseHP);
  let newHP = currentHP - damageValue * portion;
  
  if (newHP < 0) {
    newHP = 0;
  }
  
  playerN.dataset.currentHP = newHP;
  
  if(playerN.dataset.currentHP <= 0){
    overScreen();
    
    if(singleplayer === false){
      const randomNumber = Math.floor(Math.random() * 8) + 1;
      playSound(deathMP3[`death${randomNumber}`]);
    }
    else {
      const randomNumber = Math.floor(Math.random() * 4) + 1;
      playSound(deathSpMP3[`death${randomNumber}`]);
    }
  }
  
  healthbarN.style.width = `${Math.floor((newHP/baseHP)*100)}%`;
  healthbarNText.textContent = `${Math.floor((newHP/baseHP)*100)}%`;
}


function enemyFlash(playerN){
    setTimeout(() => {
    const playerNScaleX = getComputedStyle(playerN).getPropertyValue('--scalex');
    playerN.style.filter = 'brightness(0) invert(1)';
    playerN.style.setProperty('--translatex', (10 * parseInt(playerNScaleX, 10) * -1));
    
    setTimeout(() => {
      playerN.style.filter = 'brightness(1) invert(0)';

      setTimeout(() => {
        playerN.style.filter = 'brightness(0) invert(1)';

        setTimeout(() => {
          playerN.style.filter = 'brightness(1) invert(0)';
          
          setTimeout(() =>{
            playerN.style.filter = 'brightness(0) invert(1)';
            
            setTimeout(() => {
              playerN.style.filter = 'brightness(1) invert(0)';
              playerN.style.setProperty('--translatex', (0 * 1));
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }, 1500);
}


function emotePlayer(event){
  if (gameState !== 'game') {
    return; 
  }
  
  let activePlayer = 0;
  
  if (player1KeysEmote.includes(event.code)) activePlayer = 1;
  else if (player2KeysEmote.includes(event.code)) activePlayer = 2;
  if (activePlayer === 0) return;
  
  if (activePlayer === 1 && player1.dataset.actionTimerPlayer == '0' && ultimateTimerPlayer1 === null) {
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
  
  if (activePlayer === 2 && player2.dataset.actionTimerPlayer == '0' && ultimateTimerPlayer2 === null) {
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

function playerPlayer(player1, character1, player1AbilityName, emoteTimerPlayer1, ultimateTimerPlayer1, ultimate1, healthbar1, healthbar1Text, blockTimerPlayer1, player2, character2, player2AbilityName, emoteTimerPlayer2, ultimateTimerPlayer2, ultimate2, healthbar2, healthbar2Text, blockTimerPlayer2, cooldownLength, multiplier)
{
  if(player1.dataset[`${player1AbilityName}`] !== ''){

    if (emoteTimerPlayer1) {
      clearTimeout(emoteTimerPlayer1);
      emoteTimerPlayer1 = null;
    }
    
    const moveDistanceXStart = player1.dataset[`${player1AbilityName}TranslateXStart`];
    const moveDistanceXEnd = player1.dataset[`${player1AbilityName}TranslateXEnd`];
    const moveDistanceYStart = player1.dataset[`${player1AbilityName}TranslateYStart`];
    const moveDistanceYEnd = player1.dataset[`${player1AbilityName}TranslateYEnd`];
    
    let currentXP = parseInt(player1.dataset.ultimateCount);
    
    function abilityRestart(abilityLength){
      player1.dataset.actionTimerPlayer = setTimeout(() => {
        
        player1.src = `./assets/characters/${character1}/idle.gif`;
        player1.style.width = `${parseInt(player1.dataset.idle, 10)}vmin`;
        player1.style.setProperty('--translatex', '0');
        player1.style.setProperty('--translatey', '0');
        player1.style.zIndex = '100';
        
        emoteTimerPlayer1 = null;
        
        player1.dataset.actionTimerPlayer = '0';
        ultimateTimerPlayer1 = null;
        
        player2.dataset.actionTimerPlayer = '0';
        ultimateTimerPlayer2 = null;
        
        player1AbilityName = '';
        
        player1.dataset.blocking = '0';
        
        player2.dataset.attacked = '0';
        
        player1.dataset.playerCooldown = '1'; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setTimeout(() => { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          player1.dataset.playerCooldown = '0'; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    else if (player1AbilityName !== 'ultimate' && player1.dataset.actionTimerPlayer == '0' && player1.dataset.attacked == '0') {
      player2.dataset.attacked = '1';
      player1.dataset.actionTimerPlayer = '1';
      player1.dataset.blockCount = '1';
      
      enemyFlash(player2);
      
      if(player1AbilityName !== 'ultimate' && player2.dataset.blocking === '1'){  
        player1.src = `./assets/characters/${character1}/penalty.gif`;
        player1.style.width = `${parseInt(player1.dataset.penalty, 10)}vmin`;
        player1.style.setProperty('--translatex', player1.dataset.penaltyTranslateXStart * multiplier);
        player1.style.setProperty('--translatey', player1.dataset.penaltyTranslateYStart);
        player1.style.zIndex = '100';
        
        let newXP = 0;
        player1.dataset.ultimateCount = newXP;
        ultimate1.style.width = `${newXP}%`;
        
        calcHP(player2, healthbar2, healthbar2Text, player1, player1AbilityName, 0.25);
        
        abilityRestart(player1.dataset[`${player1AbilityName}Length`]);
      }
      else if (player1AbilityName !== 'ultimate' && player2.dataset.blocking === '0') {
        player1.src = `./assets/characters/${character1}/${player1AbilityName}.gif`;
        player1.style.width = `${parseInt(player1.dataset[player1AbilityName], 10)}vmin`;
        player1.style.setProperty('--translatex', moveDistanceXStart * multiplier);
        player1.style.setProperty('--translatey', moveDistanceYStart);
        player1.style.zIndex = '150';
        
        setTimeout(() => {
          if(player2.dataset.blocking === '1'){
            player1.src = `./assets/characters/${character1}/penalty.gif`;
            player1.style.width = `${parseInt(player1.dataset.penalty, 10)}vmin`;
            player1.style.setProperty('--translatex', player1.dataset.penaltyTranslateXStart * multiplier);
            player1.style.setProperty('--translatey', player1.dataset.penaltyTranslateYStart);
            player1.style.zIndex = '100';
            
            let newXP = 0;
            player1.dataset.ultimateCount = newXP;
            ultimate1.style.width = `${newXP}%`;
            
            calcHP(player2, healthbar2, healthbar2Text, player1, player1AbilityName, 0.25);

            abilityRestart(parseInt(player1.dataset.penaltyLength));
          }
          else {
            let newXP = currentXP + 20;
            if (newXP > 100) {newXP = 100;}
            player1.dataset.ultimateCount = newXP;
            ultimate1.style.width = `${newXP}%`;
            
            calcHP(player2, healthbar2, healthbar2Text, player1, player1AbilityName, 1);
            
            abilityRestart('0');
          }
        }, player1.dataset[`${player1AbilityName}Length`]);
      }
    }
    else if (player1AbilityName === 'ultimate' && player1.dataset.actionTimerPlayer == '0' && player1.dataset.attacked == '0'){
      if(player1.dataset.ultimateCount === '100'){
        player2.dataset.attacked = '1';
        player1.dataset.actionTimerPlayer = '1'
        player1.dataset.blockCount = '1';
        
        enemyFlash(player2);
        
        player1.src = `./assets/characters/${character1}/${player1AbilityName}.gif`;
        player1.style.width = `${parseInt(player1.dataset[player1AbilityName], 10)}vmin`;
        player1.style.setProperty('--translatex', moveDistanceXStart * multiplier);
        player1.style.setProperty('--translatey', moveDistanceYStart);
        player1.style.zIndex = '150';
        
        ultimateTimerPlayer1 = setTimeout(() => {
          player1.style.setProperty('--translatex', moveDistanceXEnd * multiplier);
          player1.style.setProperty('--translatey', moveDistanceYEnd);
          
          let newXP = 0;
          player1.dataset.ultimateCount = newXP;
          ultimate1.style.width = `${newXP}%`;
          
          calcHP(player2, healthbar2, healthbar2Text, player1, player1AbilityName, 1);
          
          abilityRestart(player1.dataset.ultimateLengthEnd);
        }, parseInt(player1.dataset.ultimateLength - player1.dataset.ultimateLengthEnd, 10));
      }
    }
  }
}

function actionPlayer(event){
  if (gameState !== 'game') {
    return; 
  }
  
  let cooldownLength = 500; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  let activePlayer = 0;
  
  if (player1KeysAction.includes(event.code)) activePlayer = 1;
  else if (player2KeysAction.includes(event.code)) activePlayer = 2;
  if (activePlayer === 0) return;
  
  if (activePlayer === 1 && player1.dataset.playerCooldown == '0'){ //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    playerPlayer(player1, character1, player1AbilityName, emoteTimerPlayer1, ultimateTimerPlayer1, ultimate1, healthbar1, healthbar1Text, blockTimerPlayer1, player2, character2, player2AbilityName, emoteTimerPlayer2, ultimateTimerPlayer2, ultimate2, healthbar2, healthbar2Text, blockTimerPlayer2, cooldownLength, 1)
  }

  if (activePlayer === 2 && player2.dataset.playerCooldown == '0'){ //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    playerPlayer(player2, character2, player2AbilityName, emoteTimerPlayer2, ultimateTimerPlayer2, ultimate2, healthbar2, healthbar2Text, blockTimerPlayer2, player1, character1, player1AbilityName, emoteTimerPlayer1, ultimateTimerPlayer1, ultimate1, healthbar1, healthbar1Text, blockTimerPlayer1, cooldownLength, -1)
  }
}

window.addEventListener('keyup', keyConfig);
window.addEventListener('touchstart', keyConfigMobile);
window.addEventListener('keyup', emotePlayer);
window.addEventListener('keyup', actionPlayer);
window.addEventListener('touchstart', actionPlayer);