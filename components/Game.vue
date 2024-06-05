<script lang="ts" setup>
const gameStates = {
  "NOT_STARTED": 0,
  "RETRIEVING_WORD": 1,
  "STARTED": 2,
  "WIN": 3,
  "LOSE": 4,
}

const c_chosenWord = useCookie('chosenWord', { default: () => "ABCDE" });
const c_gameState = useCookie('gameState', { default: () => gameStates.NOT_STARTED });
const c_writtenWord = useCookie('writtenWord', { default: () => "" });
const c_writtenWords = useCookie('writtenWords', { default: () => "" });
const c_appLightMode = useCookie('appLightMode', { default: () => "light" });

const chosenWord = useState('chosenWord', () => c_chosenWord.value);
const gameState = useState('gameState', () => c_gameState.value);
const writtenWord = useState('writtenWord', () => c_writtenWord.value);
const writtenWords = useState('writtenWords', () => c_writtenWords.value);
const appLightMode = useState('appLightMode', () => c_appLightMode.value);

async function startGame() {
  const { data, pending, error, refresh } = await useFetch('https://random-word-api.vercel.app/api?words=1&length=5');
  chosenWord.value = await data.value[0].toUpperCase();
  c_chosenWord.value = chosenWord.value;
  
  gameState.value = gameStates.RETRIEVING_WORD;
  c_gameState.value = gameState.value;
}

watch(chosenWord, (newWord) => {
  if(newWord != "ABCDE") {
    gameState.value = gameStates.STARTED;
    c_gameState.value = gameState.value;
  }
});

function inputChanged(e) {
  writtenWord.value = e.target.value;
  if(e.target.value.length == 5){
    writtenWords.value += e.target.value.toUpperCase() + "|@|";
    c_writtenWords.value = writtenWords.value;

    if(e.target.value.toUpperCase() == chosenWord.value.toUpperCase()){
      gameState.value = gameStates.WIN;
      c_gameState.value = gameState.value;
    }

    if(writtenWords.value.split("|@|").length >= 7 && gameState.value == gameStates.STARTED){
      gameState.value = gameStates.LOSE;
      c_gameState.value = gameState.value;
    }

    e.target.value = "";
  }
}

function restart() {
  document.cookie.split(';').forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  gameState.value = 0;
  c_gameState.value = gameState.Value;

  writtenWords.value = "";
  c_writtenWords.value = writtenWords.value;

  chosenWord.value = "ABCDE";
  c_chosenWord.value = chosenWord.value;

  writtenWord.value = "";
}

</script>

<template>
  <div class="game-initiator">
    <button :class="`game-initiator-button-${appLightMode}`" class="tr-750 game-initiator-button" :style="gameState == gameStates.NOT_STARTED ? '' : 'visibility: collapse'" @click="startGame()">Comenzar partida</button>

    <div class="game-initiator-searching" :style="gameState == gameStates.RETRIEVING_WORD ? '' : 'visibility: collapse'">
      <p class="tr-750" :class="`game-initiator-searching-${appLightMode}`">Buscando una palabra...</p>
    </div>

    <input @input="(e) => {
      inputChanged(e);
    }" :class="`game-initiator-input-${appLightMode}`" class="tr-750 game-initiator-input" :style="gameState == gameStates.STARTED ? '' : 'visibility: collapse'" type="text" placeholder="Escribe la palabra (5 letras)"></input>
  
    <div class="game-initiator-end" :style="gameState == gameStates.WIN || gameState == gameStates.LOSE ? '' : 'visibility: collapse'">
      <p class="game-initiator-searching tr-750" :class="`game-initiator-searching-${appLightMode}`">{{ gameState == gameStates.WIN ? '¡Enhorabuena! Has ganado.' : `La palabra era ${chosenWord}.` }}</p>
      <button @click="restart()" :class="`game-initiator-button-${appLightMode}`" class="tr-750 game-initiator-button">Reiniciar</button>
    </div>
  </div>
</template>