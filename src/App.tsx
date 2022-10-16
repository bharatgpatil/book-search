import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "./pages/Home/Home";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="*">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
