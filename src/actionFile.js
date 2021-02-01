import { userData } from "./action"

export const addUserData = (payload) => (dispatch) => {
    dispatch({ type: userData.personList, payload });
};