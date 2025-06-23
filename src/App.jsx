import './App.css'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Routing from './Pages/Routing';
import Home from './Pages/Home';


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Routing/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
