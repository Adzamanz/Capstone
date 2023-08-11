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
import { getAllTransactions } from "./store/transactions";
import FeedDisplay from "./components/FeedDisplay";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DonationList from "./components/DonationList";
import Menu from "./components/Menu";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import MyPosts from "./components/MyPosts";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const targetRef = useRef(0)

  useEffect(() => {
    dispatch(getAllTransactions())
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
        <div className="main_menu">
          {sessionUser && <Menu />}
        </div>
      <div className="main_display">


           {isLoaded && (sessionUser ? <Switch>
          <Route path="/feeds/:id">
            <FeedDisplay />
          </Route>
          <Route path="/feeds">
            <FeedDisplay />
          </Route>
          <Route path="/my_posts/:id">
            <MyPosts />
          </Route>
          <Route path="/my_posts">
            <MyPosts />
          </Route>
          <Route path="/donations">
            <DonationList />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="">
          <FeedDisplay />
          </Route>
          </Switch>
          :<Switch>
          <Route path="">
          <FeedDisplay />
          </Route>
          </Switch>
          )}

      </div>
      </div>
    </div>
  );
}

export default App;
