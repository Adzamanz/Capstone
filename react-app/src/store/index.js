import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import feeds from './feeds'
import posts from './posts'
import replies from './replies'
import transactions from './transactions'
import postTags from './postTags'
import tags from './tags'
import users from './users'
import images from './images'

const rootReducer = combineReducers({
  session,
  feeds,
  posts,
  replies,
  transactions,
  postTags,
  tags,
  users,
  images,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
