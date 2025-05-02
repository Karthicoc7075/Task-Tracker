export const loadState = () => {
    try {
        const serializedUser = window.localStorage.getItem('auth');
        const serializedToken = window.localStorage.getItem('token');
        const serializedIsAuthenticated = window.localStorage.getItem('isAuthenticated');
      
        if (!serializedUser || !serializedToken) {
            return undefined;
        }

        return {
            auth: {
                user: JSON.parse(serializedUser),
                token: JSON.parse(serializedToken),
                isAuthenticated: JSON.parse(serializedIsAuthenticated),
            },
        }
    } catch (err) {
        console.error("Could not load user state", err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const { user, token,isAuthenticated } = state.auth;
        const theme = state.theme;
        const serializedUser = JSON.stringify(user);
        const serializedToken = JSON.stringify(token);
        const serializedIsAuthenticated = JSON.stringify(isAuthenticated);

        window.localStorage.setItem('auth', serializedUser);
        window.localStorage.setItem('token', serializedToken);
        window.localStorage.setItem('isAuthenticated', serializedIsAuthenticated);
    } catch (err) {
        console.error("Could not save user state", err);
    }
};