const GET_POSTTAGS = 'postTags/GET_POSTTAGS'
const ADD_POSTTAG = 'postTags/ADD_POSTTAG'
const DELETE_POSTTAG = 'postTags/DELETE_POSTTAG'

export const getPostTags = (postTags) => {
    return {
        type: GET_POSTTAGS,
        payload: postTags
    }
}
export const addPostTag = (postTag) => {
    return {
        type: ADD_POSTTAG,
        payload: postTag
    }
}
export const deletePostTag = (postTag) => {
    return {
      type: DELETE_POSTTAG,
      payload: postTag,
    };
};
export const getAllPostTags = () => async (dispatch) => {
    const response = await fetch(`/api/post_tags/current`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(getPostTags(details));
        return details;
    }
}
export const getPostTagById = (id) => async (dispatch) => {
    const response = await fetch(`api/post_tags/${id}`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(addPostTag(details));
        return details;
    }
}
export const deletePostTagThunk = (postTag) => async (dispatch) => {
    const response = await fetch(`/api/post_tags/${postTag.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postTag),
    });
    if (response.ok) {
      const details = await response.json();

      dispatch(deletePostTag(postTag));
    }
};
export const createPostTagThunk = (postTag) => async (dispatch) => {

    const response = await fetch(`/api/post_tags/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postTag),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addPostTag(details));
      return details;
    }
  };

  export default function postTagsReducer(state = {}, action) {
    let newState = {};
    switch(action.type){
        case GET_POSTTAGS:
            newState = {...state};
            action.payload.forEach(postTag => {
                newState[postTag.id] = postTag;
            })
            return newState;
        case ADD_POSTTAG:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_POSTTAG:
            newState = {...state};
            delete newState[action.payload.id];
            return newState
            return
        default:
            return state;
    }
  }
