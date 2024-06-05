<script lang="ts" setup>
  const props = defineProps(["box_id", "letter_id"]);

  const { c_gameState, gameState, setGameState } = useGameState();
  const { c_chosenWord, chosenWord, setChosenWord } = useChosenWord();
  const { c_appLightMode, appLightMode, setAppLightMode } = useAppLightMode();
  const { c_writtenWords, writtenWords, resetWrittenWords, addWrittenWord } = useWrittenWords();

  // The following states/cookies are only relevant to this unique component and I don't need to read/write them outside.
  // In the rare case that I'd need to, I'd reconsider adding them the the 'states' composable.
  const c_boxColorClass = useCookie(`boxColorClass${props.box_id}${props.letter_id}`, { default: () => "" });
  const boxColorClass = useState(`boxColorClass${props.box_id}${props.letter_id}`, () => c_boxColorClass.value);
  const c_letter = useCookie(`letter${props.box_id}${props.letter_id}`, { default: () => "" });
  const letter = useState(`letter${props.box_id}${props.letter_id}`, () => c_letter.value);

  watch(gameState, (newGameState) => {
    if(newGameState == gameStates.NOT_STARTED){
      boxColorClass.value = "";
      c_boxColorClass.value = boxColorClass.value;

      letter.value = "";
      c_letter.value = letter.value;
    }
  })

  watch(writtenWords, (newWrittenWords) => {
    let writtenWordsSplit = newWrittenWords.split("|@|");
    if(writtenWordsSplit[parseInt(props.box_id)] != "" && writtenWordsSplit[parseInt(props.box_id)] != null) {
      //console.log("writtenWordsSplit: ", writtenWordsSplit)
      letter.value = writtenWordsSplit[parseInt(props.box_id)][parseInt(props.letter_id)].toUpperCase();
      c_letter.value = letter.value;

      if(chosenWord.value[props.letter_id].toUpperCase() == writtenWordsSplit[parseInt(props.box_id)][parseInt(props.letter_id)].toUpperCase()){
        boxColorClass.value = "letter-box-correct";
      } else if(chosenWord.value.toUpperCase().includes(writtenWordsSplit[parseInt(props.box_id)][parseInt(props.letter_id)].toUpperCase())){
        boxColorClass.value = "letter-box-position";
      } else {
        boxColorClass.value = "letter-box-incorrect";
      }
      c_boxColorClass.value = boxColorClass.value;
    }
  })
</script>

<template>
  <div class="letter-box tr-750" :class="`letter-box-${appLightMode} ${boxColorClass}`">
    <p>{{ letter }}</p>
  </div>
</template>