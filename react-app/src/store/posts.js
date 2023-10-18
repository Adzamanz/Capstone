const GET_POSTS = 'posts/GET_POSTS'
const ADD_POST = 'posts/ADD_POST'
const DELETE_POST = 'posts/DELETE_POST'

export const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        payload: posts
    }
}
export const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post
    }
}
export const deletePost = (post) => {
    return {
      type: DELETE_POST,
      payload: post,
    };
};
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(getPosts(details));
        return details;
    }
}
export const getPostById = (id) => async (dispatch) => {
    const response = await fetch(`api/posts/${id}`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(addPost(details));
        return details;
    }
}
export const deletePostThunk = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (response.ok) {
      const details = await response.json();

      dispatch(deletePost(post));
    }
};
export const createPostThunk = (post) => async (dispatch) => {

    const response = await fetch(`/api/posts/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addPost(details));
      return details;
    }
  };
  export const updatePostThunk = (post, id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addPost(details));
      return details;
    }
  };

  export default function postsReducer(state = {}, action) {
    let newState = {};
    switch(action.type){
        case GET_POSTS:
            newState = {};
            action.payload.forEach(post => {
                newState[post.id] = post;
            })
            return newState;
        case ADD_POST:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_POST:
            newState = {...state};
            delete newState[action.payload.id];
            return newState
        default:
            return state;
    }
  }
