const reducer = (state: any, { type, payload }: any) => {
    switch (type) {
        case "SET_LOGIN":
            return { ...state, ...payload };
        case "SET_LOGOUT":
            return { ...state, user: {}, isLoggedIn: false };

        default:
            return state;
    }
};

export default reducer;