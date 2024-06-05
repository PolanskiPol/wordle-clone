<script setup>
  const props = defineProps(["boxid", "letterid"]);

  const chosenWord = useState('chosenWord', () => "ABCDE");

  const c_boxColorClass = useCookie(`boxColorClass${props.boxid}${props.letterid}`, { default: () => "" });
  const c_letter = useCookie(`letter${props.boxid}${props.letterid}`, { default: () => "" });
  const c_writtenWords = useCookie('writtenWords', { default: () => "" });
  const c_gameState = useCookie('gameState', { default: () => 0 });
  const c_appLightMode = useCookie('appLightMode', { default: () => "light" });

  const appLightMode = useState('appLightMode', () => c_appLightMode.value);
  const gameState = useState('gameState', () => c_gameState.value);
  const boxColorClass = useState(`boxColorClass${props.boxid}${props.letterid}`, () => c_boxColorClass.value);
  const letter = useState(`letter${props.boxid}${props.letterid}`, () => c_letter.value);
  const writtenWords = useState('writtenWords', () => c_writtenWords.value);

  watch(gameState, (newGameState) => {
    if(newGameState == 0){
      boxColorClass.value = "";
      c_boxColorClass.value = boxColorClass.value;

      letter.value = "";
      c_letter.value = letter.value;
    }
  })

  watch(writtenWords, (newWrittenWords) => {
    let writtenWordsSplit = newWrittenWords.split("|@|");
    if(writtenWordsSplit[parseInt(props.boxid)] != "" && writtenWordsSplit[parseInt(props.boxid)] != null) {
      letter.value = writtenWordsSplit[parseInt(props.boxid)][parseInt(props.letterid)].toUpperCase();
      c_letter.value = letter.value;

      if(chosenWord.value[props.letterid].toUpperCase() == writtenWordsSplit[parseInt(props.boxid)][parseInt(props.letterid)].toUpperCase()){
        boxColorClass.value = "letter-box-correct";
      } else if(chosenWord.value.toUpperCase().includes(writtenWordsSplit[parseInt(props.boxid)][parseInt(props.letterid)].toUpperCase())){
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