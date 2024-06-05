<script lang="ts" setup>
  const props = defineProps(["box_id", "letter_id"]);

  const { c_gameState, gameState, setGameState } = useGameState();
  const { c_chosenWord, chosenWord, setChosenWord } = useChosenWord();
  const { c_writtenWord, writtenWord, setWrittenWord } = useWrittenWord();
  const { c_appLightMode, appLightMode, setAppLightMode } = useAppLightMode();
  const { c_writtenWords, writtenWords, resetWrittenWords, addWrittenWord } = useWrittenWords();

  watch(chosenWord, (newWord) => {
    if(newWord != "") {
      gameState.value = gameStates.STARTED;
      c_gameState.value = gameState.value;
    }
  });

  async function startGame() {
    const { data, pending, error, refresh } = await useFetch('https://random-word-api.vercel.app/api?words=1&length=5');
    setChosenWord(await data.value[0].toUpperCase());
    setGameState(gameStates.RETRIEVING_WORD);
  }

  function restartgame() {
    // Remove all cookies as many of them keep track of the state of the game
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });

    setChosenWord("");
    setWrittenWord("");
    resetWrittenWords();
    setGameState(gameStates.NOT_STARTED);
  }
  
  function wordInputChanged(e) {
    setWrittenWord(e.target.value);
    if(e.target.value.length == 5){
      addWrittenWord(e.target.value);
      console.log(writtenWords.value);

      if(e.target.value.toUpperCase() == chosenWord.value.toUpperCase()){
        setGameState(gameStates.WIN);
      }

      if(writtenWords.value.split("|@|").length >= 7 && gameState.value == gameStates.STARTED){
        setGameState(gameStates.LOSE);
      }

      e.target.value = "";
    }
  }
</script>

<template>
  <div class="game-initiator">
    <button :class="`game-initiator-button-${appLightMode}`" class="tr-750 game-initiator-button" :style="gameState == gameStates.NOT_STARTED ? '' : 'visibility: collapse'" @click="startGame()">Comenzar partida</button>

    <div class="game-initiator-searching" :style="gameState == gameStates.RETRIEVING_WORD ? '' : 'visibility: collapse'">
      <p class="tr-750" :class="`game-initiator-searching-${appLightMode}`">Buscando una palabra...</p>
    </div>

    <input @input="(e) => {
      wordInputChanged(e);
    }" :class="`game-initiator-input-${appLightMode}`" class="tr-750 game-initiator-input" :style="gameState == gameStates.STARTED ? '' : 'visibility: collapse'" type="text" placeholder="Escribe la palabra (5 letras)"></input>
  
    <div class="game-initiator-end" :style="gameState == gameStates.WIN || gameState == gameStates.LOSE ? '' : 'visibility: collapse'">
      <p class="game-initiator-searching tr-750" :class="`game-initiator-searching-${appLightMode}`">{{ gameState == gameStates.WIN ? '¡Enhorabuena! Has ganado.' : `La palabra era ${chosenWord}.` }}</p>
      <button @click="restartgame()" :class="`game-initiator-button-${appLightMode}`" class="tr-750 game-initiator-button">Reiniciar</button>
    </div>
  </div>
</template>