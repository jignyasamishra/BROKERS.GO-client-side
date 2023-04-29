
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Create from './Components/Create'
import Save from './Components/Save'
import Auth  from './Components/Auth'
import Home from './Components/Home'
import Modals from './Components/Modals';

function App() {
  return (
  
<Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/create-recipe" element={<Create/>}/>
          <Route path="/saved-recipes" element={<Save/>}/>
          <Route path="/show-modals" element={<Modals/>}/>
          
        </Routes>
      </Router>
 
  );
}

export default App;
