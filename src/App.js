import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Login" component={Login} />
  </Switch>
)

export default App
