import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home} from './paginas/home';
import {Login} from './paginas/login'
function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} exact path="/"/>
                <Route element={<Home/>} exact path="/home"/>
            </Routes>
        </BrowserRouter>
    );
  }
  
  export default Rotas;