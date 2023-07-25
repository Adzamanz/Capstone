const GET_TAGS = 'tags/GET_TAGS'
const ADD_TAG = 'tags/ADD_TAG'
const DELETE_TAG = 'tags/DELETE_TAG'

export const getTags = (tags) => {
    return {
        type: GET_TAGS,
        payload: tags
    }
}
export const addTag = (tag) => {
    return {
        type: ADD_TAG,
        payload: tag
    }
}
export const deleteTag = (tag) => {
    return {
      type: DELETE_TAG,
      payload: tag,
    };
};
export const getAllTags = () => async (dispatch) => {
    const response = await fetch(`/api/tags/current`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(getTags(details));
        return details;
    }
}
export const getTagById = (id) => async (dispatch) => {
    const response = await fetch(`api/tags/${id}`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(addTag(details));
        return details;
    }
}
export const deleteTagThunk = (tag) => async (dispatch) => {
    const response = await fetch(`/api/tags/${tag.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    });
    if (response.ok) {
      const details = await response.json();

      dispatch(deleteTag(tag));
    }
};
export const createTagThunk = (tag) => async (dispatch) => {

    const response = await fetch(`/api/tags/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addTag(details));
      return details;
    }
  };

  export default function tagsReducer(state = {}, action) {
    let newState = {};
    switch(action.type){
        case GET_TAGS:
            newState = {...state};
            action.payload.forEach(tag => {
                newState[tag.id] = tag;
            })
            return newState;
        case ADD_TAG:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_TAG:
            newState = {...state};
            delete newState[action.payload.id];
            return newState
            return
        default:
            return state;
    }
  }
