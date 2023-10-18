const GET_USERS = 'users/GET_USERS'

export const getUsers = (users) => {
    return {
        type: GET_USERS,
        payload: users
    }
}

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/users/');
    if(response.ok){
        const details = await response.json();
        await dispatch(getUsers(details));
        return details;
    }
}
export default function usersReducer(state = {}, action) {
    let newState = {};
    switch(action.type){
        case GET_USERS:
            newState = {...state};
            action.payload.forEach(user => {
                newState[user?.id] = user;
            })
            return newState;
        default:
            return state;
    }
}
