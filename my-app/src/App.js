import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Game from './MiniGamePage'
import Dashboard from './Dashboard';
import useAuth from './useAuth';
import SimpleCanvas from './SimpleCanvas';
const code = new URLSearchParams(window.location.search).get("code");
function App() {

const accessToken = useAuth(code);
  return code ? <Dashboard accessToken={accessToken}/>:<Game/>
}

export default App;
