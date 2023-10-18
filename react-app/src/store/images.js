const GET_IMAGES = 'images/GET_IMAGES'
const ADD_IMAGE = 'images/ADD_IMAGE'
const DELETE_IMAGE = 'images/DELETE_IMAGE'

export const getImages = (images) => {
    return {
        type: GET_IMAGES,
        payload: images
    }
}
export const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        payload: image
    }
}
export const deleteImage = (image) => {
    return {
      type: DELETE_IMAGE,
      payload: image,
    };
};
export const getAllImages = () => async (dispatch) => {
  const response = await fetch(`/api/images/`);
  if(response.ok) {
      const details = await response.json();
      await dispatch(getImages(details));
      return details;
  }
}
export const getMyImages = () => async (dispatch) => {
    const response = await fetch(`/api/images/current`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(getImages(details));
        return details;
    }
}
export const getImageById = (id) => async (dispatch) => {
    const response = await fetch(`api/images/${id}`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(addImage(details));
        return details;
    }
}
export const deleteImageThunk = (image) => async (dispatch) => {
    const response = await fetch(`/api/images/${image.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image),
    });
    if (response.ok) {
      const details = await response.json();

      dispatch(deleteImage(image));
    }
};
export const createImageThunk = (data) => async (dispatch) => {
    const formData  = new FormData();
    for(const name in data) {
      formData.append(name, data[name]);
    }
    const response = await fetch(`/api/images/new`, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addImage(details));
      return details;
    }
  };
  export const updateImageThunk = (image, id) => async (dispatch) => {
    const response = await fetch(`/api/images/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addImage(details));
      return details;
    }
  };

  export default function imagesReducer(state = {}, action) {
    let newState = {};
    switch(action.type){
        case GET_IMAGES:
            newState = {...state};
            action.payload.forEach(image => {
                newState[image.id] = image;
            })
            return newState;
        case ADD_IMAGE:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_IMAGE:
            newState = {...state};
            delete newState[action.payload.id];
            return newState
        default:
            return state;
    }
  }
