import './style.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../../services/api'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

export const Login = () =>{

  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const welcome = (nome) => {toast.success("Bem-vindo "+ nome); setTimeout(() => {
    navigate('home', {state:{
      nome: nome,
    }})
  }, 2000);}
  const campoVazio = () => {toast.warn("Preencha os campos")}
  const notExist = () => {toast.error("Usuário não existe")}
  const wrong = () => {toast.error("Usuário ou Senha incorretos")}
  

  const verificarLogin =  async () =>{
    if(nome === "" || password === ""){
      campoVazio()
      setNome("")
      setPassword("")
    }else{
      setNome("")
      setPassword("")
      var count = 0;
      await api.get('/users')
      .then((res) =>{
        for (let i = 0; i < res.data.length; i++) {
          const user = res.data[i];
          if(user.username === nome){
            count++
            if(user.password === password){
              welcome(nome)
              break;
            }else{
              wrong()
              break;
            }
          }else{
          }
        }
        if(count === 0){
          notExist()
        }
      })
    }
  }

  return(
    <div className='AllPage'>
      <form className='BlockLogin'>
        <div className='divTextLogin'>
          <h1>Login</h1>
        </div>
        <div className='divEditTexts'>
            <input type='text' className="editText" placeholder="Username" value={nome} onChange={(e) => {setNome(e.target.value)}}/>
            <input type='password' className="editText" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div className='divButton'>
          <input type="button" className='buttonEntrar' onClick={() =>{verificarLogin()}} value="Entrar"/>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={1000}/>
    </div>
  )
}