<script lang="ts" setup>
  const { c_appLightMode, appLightMode, setAppLightMode } = useAppLightMode();
</script>

<template>
  <div class="background tr-750" :class="`background-${appLightMode}`">
    <Header></Header>
    <slot />
    <WFooter></WFooter>
  </div>
</template>