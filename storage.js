const saveCredentials = (credentials) => {
    try {
        const safeCredentials = {
            username: credentials.username,
            serverUrl: credentials.serverUrl
        };
        localStorage.setItem('kohaCredentials', JSON.stringify(safeCredentials));
    } catch (error) {
        console.error('Error saving credentials:', error);
    }
};

const loadCredentials = () => {
    try {
        const stored = localStorage.getItem('kohaCredentials');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error loading credentials:', error);
        return null;
    }
};

const clearCredentials = () => {
    try {
        localStorage.removeItem('kohaCredentials');
    } catch (error) {
        console.error('Error clearing credentials:', error);
    }
};

const saveLoginData = (loginData) => {
    try {
        const dataToSave = {
            username: loginData.username,
            password: loginData.password,
            serverUrl: loginData.serverUrl
        };
        localStorage.setItem('savedLoginData', JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Error saving login data:', error);
    }
};

const loadSavedLoginData = () => {
    try {
        const stored = localStorage.getItem('savedLoginData');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error loading saved login data:', error);
        return null;
    }
};

const clearSavedLoginData = () => {
    try {
        localStorage.removeItem('savedLoginData');
    } catch (error) {
        console.error('Error clearing saved login data:', error);
    }
};
