import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Rotas from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <Rotas></Rotas>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

