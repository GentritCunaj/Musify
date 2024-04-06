import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import useAuth from './useAuth';
const code = new URLSearchParams(window.location.search).get("code");
function App() {

const accessToken = useAuth(code);
  return code ? <Dashboard accessToken={accessToken}/>:<Login/>
}

export default App;
