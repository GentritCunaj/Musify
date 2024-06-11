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
debugger;
// Retrieve code from URL
const code1 = new URLSearchParams(window.location.search).get("code");

// Retrieve code from local storage


// Set localStorage code to code1 if it exists, otherwise to code2 if it exists, otherwise to an empty string


function App() {
  // Use code1 if it exists, otherwise use code2
  const accessToken = useAuth(code1);

  // Use Dashboard if accessToken exists, otherwise show Login
  const start = accessToken ? <Dashboard accessToken={accessToken} /> : <Login />;


  return (
    <Router>
      <Routes>
        <Route path="/" element={start} />
        <Route path="/home" element={<Dashboard accessToken={accessToken} />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="/Game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
