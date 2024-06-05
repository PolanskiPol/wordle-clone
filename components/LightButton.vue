<script lang="ts" setup>
  const { c_appLightMode, appLightMode, setAppLightMode } = useAppLightMode();

  function switchLightMode() {
    switch(appLightMode.value){
      case "light":
        setAppLightMode("dark");
        break;
      case "dark":
        setAppLightMode("light");
        break;
    }
  }
</script>

<template>
  <div>
    <p title="Cambiar iluminación de la página" class="light-mode-button" @click="switchLightMode()">{{ appLightMode == "light" ? "🌚" : "🌞" }}</p>
  </div>
</template>