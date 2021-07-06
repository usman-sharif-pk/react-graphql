import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import CreateBooking from "./pages/bookings/create";
import CreateEvent from "./pages/events/create";
import HomeComponent from "./pages/home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/auth/register" component={Register} />
        <Route path="/auth/login" component={Login} />
        <Route path="/events" component={CreateEvent} />
        <Route path="/bookings" component={CreateBooking} />
      </Switch>
    </Router>
  );
}

export default App;
