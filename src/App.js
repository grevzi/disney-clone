import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/home'>
                    <Home />
                </Route>
                <Route path='/detail/:id'>
                    <Detail />
                </Route>
                <Route exect path='/' >
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
