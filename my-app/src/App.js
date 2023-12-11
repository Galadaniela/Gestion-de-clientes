import './App.css';
import {Landing,
  InteriorChaco,Form,Detail,Chaco,Corrientes, Interior} from "./views/index.js";
  import { Route , useLocation} from "react-router-dom"
function App() {
  return (
    <div >
      
      <Route path="/" exact component={Landing}/>
      {/* <Route path="/Home" render= {() => <Home/>} /> */}
      {/* <Route path="/Corrientes" render= {() => <Corrientes/>} /> */}
      <Route path="/Form" render= {() => <Form />}  />
      {/* <Route path="/Chaco" render= {() => <Chaco/>} /> */}
      
        <Route  path="/corrientes" render={() => <Corrientes provincia="corrientes" />} />

        <Route path="/Chaco" render={() => <Chaco provincia="chaco" />} />
        
<Route path="/Interior" render={() => <Interior provincia="Interior" />} />
    </div>
  );
}

export default App;
