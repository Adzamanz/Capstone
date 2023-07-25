const GET_REPLIES = 'replies/GET_REPLIES'
const ADD_REPLY = 'replies/ADD_REPLY'
const DELETE_REPLY = 'replies/DELETE_REPLY'

export const getReplies = (replies) => {
    return {
        type: GET_REPLIES,
        payload: replies
    }
}
export const addReply = (reply) => {
    return {
        type: ADD_REPLY,
        payload: reply
    }
}
export const deleteReply = (reply) => {
    return {
      type: DELETE_REPLY,
      payload: reply,
    };
};
export const getAllReplies = () => async (dispatch) => {
    const response = await fetch(`/api/replies/`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(getReplies(details));
        return details;
    }
}
export const getReplyById = (id) => async (dispatch) => {
    const response = await fetch(`api/replies/${id}`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(addReply(details));
        return details;
    }
}
export const deleteReplyThunk = (reply) => async (dispatch) => {
    const response = await fetch(`/api/replies/${reply.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reply),
    });
    if (response.ok) {
      const details = await response.json();

      dispatch(deleteReply(reply));
    }
};
export const createReplyThunk = (reply) => async (dispatch) => {

    const response = await fetch(`/api/replies/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reply),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addReply(details));
      return details;
    }
  };
  export const updateReplyThunk = (reply, id) => async (dispatch) => {
    const response = await fetch(`/api/replies/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reply),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addReply(details));
      return details;
    }
  };

  export default function repliesReducer(state = {}, action) {
    let newState = {};
    switch(action.type){
        case GET_REPLIES:
            newState = {...state};
            action.payload.forEach(reply => {
                newState[reply.id] = reply;
            })
            return newState;
        case ADD_REPLY:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_REPLY:
            newState = {...state};
            delete newState[action.payload.id];
            return newState
        default:
            return state;
    }
  }
