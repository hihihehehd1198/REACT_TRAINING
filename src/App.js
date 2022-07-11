import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Login from "./app/component/auth/login";
import Register from "./app/component/auth/register";
import Landing from "./app/component/layout/Landing";
import Navbar from "./app/component/layout/Navbar";
import store from "./app/store";
import Alert from "./app/component/layout/Alert";
import { loadUser } from "./app/actions/auth";
// redux
import { Provider } from "react-redux";
import setAuthToken from "./app/utils/setAuthToken";
import DashBoard from "./app/component/dashboard/DashBoard";
import PrivateRoute from "./app/component/routing/PrivateRoute";
import CreateProfile from "./app/component/profile/CreateProfile";
import editExperience from "./app/component/profile/editExprience";
import ListProfile from "./app/component/profile/ListProfile";
import Profile from "./app/component/profile/Profile";
import listPost from "./app/component/posts/listPost";
import PostDetail from "./app/component/posts/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <section className="container">
          <Alert />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={DashBoard} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/create-profile" component={CreateProfile} />
            <Route exact path="/edit-profile" component={CreateProfile} />
            <Route exact path="/profile" component={ListProfile} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route
              exact
              path="/edit-experience"
              component={editExperience}
            ></Route>
            <PrivateRoute exact path="/post" component={listPost} />

            <PrivateRoute exact path="/post/:id" component={PostDetail} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
