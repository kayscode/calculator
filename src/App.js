import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import Connexion from './components/Connexion';
import AdminConnexion from './components/AdminConnexion';
import DashBoard from './components/DashBoard';

function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
            <Route path="/" exact>
              <Connexion/>
            </Route>
            <Route path="/adminConnexion">
              <AdminConnexion/>
            </Route>
            <Route path="/dashboard">
              <DashBoard/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
