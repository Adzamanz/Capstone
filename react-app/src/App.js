import React, { useState, useEffect,useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";
import { getAllFeeds } from "./store/feeds";
import { getAllPosts } from "./store/posts";
import { getAllReplies } from "./store/replies";
import { getAllUsers } from "./store/users";
import { getAllPostTags } from "./store/postTags";
import { getAllTags } from "./store/tags";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const targetRef = useRef(0)

  useEffect(() => {
    dispatch(getAllFeeds())
    dispatch(getAllPosts())
    dispatch(getAllReplies())
    dispatch(getAllPostTags())
    dispatch(getAllTags())
    dispatch(getAllUsers())
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div >
      <Navigation isLoaded={isLoaded} />
      <div className="main_app">
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      </div>
    </div>
  );
}

export default App;
