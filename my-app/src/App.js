import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Login from './Login';
import Game from './MiniGamePage'
import Dashboard from './Dashboard';
import AboutUsPage from './AboutUs';
import useAuth from './useAuth';
import SimpleCanvas from './SimpleCanvas';
const code = new URLSearchParams(window.location.search).get("code");
function App() {

const accessToken = useAuth(code);
const start =code ? <Dashboard accessToken={accessToken}/>:<Login/>
  return (

<Router>

<Routes>
<Route path="/" element={start } />
<Route path="/Home" element={<Dashboard  />} />
<Route path="/AboutUs" element={<AboutUsPage />} />
<Route path="/Game" element={<Game />} />
</Routes>
</Router>


  )
  

  
}

export default App;
