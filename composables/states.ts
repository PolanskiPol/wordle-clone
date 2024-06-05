export const useChosenWord = () => {
    // Any va value starting with c_ is a cookie
    const c_chosenWord = useCookie<string>('chosenWord', { default: () => "" });
    const chosenWord = useState<string>('chosenWord', () => c_chosenWord.value);

    const setChosenWord = (newValue : string) => {
        chosenWord.value = newValue;
        c_chosenWord.value = newValue;
    }

    return {
        c_chosenWord,
        chosenWord,
        setChosenWord
    }
};

export const useGameState = () => {
    // Any va value starting with c_ is a cookie
    const c_gameState = useCookie<number>('gameState', { default: () => gameStates.NOT_STARTED });
    const gameState = useState<number>('gameState', () => c_gameState.value);

    const setGameState = (newValue : number) => {
        gameState.value = newValue;
        c_gameState.value = newValue;
    }

    return {
        c_gameState,
        gameState,
        setGameState
    }
};

export const useWrittenWord = () => {
    // Any va value starting with c_ is a cookie
    const c_writtenWord = useCookie<string>('writtenWord', { default: () => "" });
    const writtenWord = useState<string>('writtenWord', () => c_writtenWord.value);

    const setWrittenWord = (newValue : string) => {
        writtenWord.value = newValue.toUpperCase();
        c_writtenWord.value = newValue.toUpperCase();
    }

    return {
        c_writtenWord,
        writtenWord,
        setWrittenWord
    }
};

// WrittenWords is a string with concatenated words separated by |@| so I can save it as a cookie.
// Would be made as an array otherwise.
export const useWrittenWords = () => {
    // Any va value starting with c_ is a cookie
    const c_writtenWords = useCookie<string>('writtenWords', { default: () => "" });
    const writtenWords = useState<string>('writtenWords', () => c_writtenWords.value);

    const resetWrittenWords = () => {
        writtenWords.value = "";
        c_writtenWords.value = "";
    }

    const addWrittenWord = (addedValue : string) => {
        c_writtenWords.value += addedValue.toUpperCase() + "|@|";
        writtenWords.value += addedValue.toUpperCase() + "|@|";
    }

    return {
        c_writtenWords,
        writtenWords,
        resetWrittenWords,
        addWrittenWord
    }
};

export const useAppLightMode = () => {
    // Any va value starting with c_ is a cookie
    const c_appLightMode = useCookie<string>('appLightMode', { default: () => "light" });
    const appLightMode = useState<string>('appLightMode', () => c_appLightMode.value);

    const setAppLightMode = (newValue : "light"|"dark") => {
        appLightMode.value = newValue;
        c_appLightMode.value = newValue;
    }

    return {
        c_appLightMode,
        appLightMode,
        setAppLightMode
    }
};

export const useInitiated = () => useState<boolean>("initiated", () => true);