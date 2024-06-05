<script setup>
const c_appLightMode = useCookie('appLightMode', { default: () => "light" });
const appLightMode = useState('appLightMode', () => c_appLightMode.value);
</script>

<template>
  <div class="background tr-750" :class="`background-${appLightMode}`">
    <Header></Header>
    <slot />
  </div>
</template>