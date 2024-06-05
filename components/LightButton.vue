<template>
  <div>
    <p title="Cambiar iluminación de la página" class="light-mode-button" @click="switchLightMode()">{{ appLightMode == "light" ? "🌚" : "🌞" }}</p>
  </div>
</template>

<script lang="ts" setup>
  //const lightMode = useLightMode();
  const c_appLightMode = useCookie('appLightMode', { default: () => "light" });
  const appLightMode = useState('appLightMode', () => c_appLightMode.value);

  function switchLightMode() {
    switch(appLightMode.value){
      case "light":
        appLightMode.value = "dark";
        break;
      case "dark":
        appLightMode.value = "light";
        break;
    }

    c_appLightMode.value = appLightMode.value;
  }

</script>