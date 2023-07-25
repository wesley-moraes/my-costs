//import logo from './logo.svg';
//import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';

import Container from './components/layout/Container';


function App() {
  return (
    
      //<div className="App">
      //<p>Costs</p>
      //</div>*/    
    

    <Router>
      <ul>
        <Link to="/" >Home</Link>
        <Link to="/contact" >Contato</Link>
        <Link to="/company" >Empresa</Link>
        <Link to="/newproject" >Novo Projeto</Link>
        
      </ul>
      <Container customClass="min_height">
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/company' element={<Company />}></Route>
          <Route exact path='/contact' element={<Contact />}></Route>
          <Route exact path='/newproject' element={<NewProject />}></Route>
        </Routes>
      </Container>
      <p>Footer</p>
    </Router>

    
  );
}

export default App;
