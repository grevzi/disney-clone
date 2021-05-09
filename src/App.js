import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exect path='/' >
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
