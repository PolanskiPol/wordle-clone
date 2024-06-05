export const useLightMode = () => {
    const lightMode = useState("lightMode", () => "light");
    const setLightMode = (newLightMode : "light"|"dark") => {
        lightMode.value = newLightMode;
    }

    return {
        lightMode,
        setLightMode
    }
};
export const useInitiated = () => useState<boolean>("initiated", () => true);