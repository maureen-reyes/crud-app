import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import Details from "./Details";
import NotFound from "./NotFound";
import Edit from "./Edit";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/users/:id" component={Details} />
            <Route path="/update/:id" component={Edit} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;