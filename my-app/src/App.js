import './App.css';
import { Landing, Form, Chaco, Corrientes, Interior } from "./views/index.js";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/Form" render={() => <Form />} />
        <Route path="/corrientes" render={() => <Corrientes provincia="corrientes" />} />
        <Route path="/Chaco" render={() => <Chaco provincia="chaco" />} />
        <Route path="/Interior" render={() => <Interior provincia="Interior" />} />
      </Switch>
    </div>
  );
}

export default App;