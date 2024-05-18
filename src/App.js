import React from 'react';
import './App.css';
import Form from './Components/Form';
import { BrowserRouter as Router, Routes,  Route} from "react-router-dom";
/*import LoginButton from './Components/LoginButton';*/
import Dashboard from './Components/Dashboard';
import SingForm from './Components/SingForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
      <Routes>
       <Route path='/'element={<Form />} />
       <Route path='/dashboard'element={<Dashboard />} />
       <Route path='/singform'element={<SingForm />} />
      </Routes>
       </Router>
       
      </header>
    </div>
  );
}

export default App;
