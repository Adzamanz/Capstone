const GET_FEEDS = 'feeds/GET_FEEDS'
const ADD_FEED = 'feeds/ADD_FEED'
const DELETE_FEED = 'feeds/DELETE_FEED'

export const getFeeds = (feeds) => {
    return {
        type: GET_FEEDS,
        payload: feeds
    }
}
export const addFeed = (feed) => {
    return {
        type: ADD_FEED,
        payload: feed
    }
}
export const deleteFeed = (feed) => {
    return {
      type: DELETE_FEED,
      payload: feed,
    };
};
export const getAllFeeds = () => async (dispatch) => {
    const response = await fetch(`/api/feeds/current`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(getFeeds(details));
        return details;
    }
}
export const getFeedById = (id) => async (dispatch) => {
    const response = await fetch(`api/feeds/${id}`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(addFeed(details));
        return details;
    }
}
export const deleteFeedThunk = (feed) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${feed.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feed),
    });
    if (response.ok) {
      const details = await response.json();

      dispatch(deleteFeed(feed));
    }
};
export const createFeedThunk = (feed) => async (dispatch) => {

    const response = await fetch(`/api/feeds/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feed),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addFeed(details));
      return details;
    }
  };
  export const updateFeedThunk = (feed, id) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feed),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addFeed(details));
      return details;
    }
  };

  export default function feedsReducer(state = {}, action) {
    let newState = {};
    switch(action.type){
        case GET_FEEDS:
            newState = {...state};
            action.payload.forEach(feed => {
                newState[feed.id] = feed;
            })
            return newState;
        case ADD_FEED:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_FEED:
            newState = {...state};
            delete newState[action.payload.id];
            return newState
        default:
            return state;
    }
  }
