export const useUtils = () => {
  return {
    getLightModeClassName: (className : string) => {
      return `${className}-${useLightMode().lightMode.value}`;
    }
  }
}
