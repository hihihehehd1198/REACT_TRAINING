import { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
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
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
