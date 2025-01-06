/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './home.css';
import api from '../../services/api';

export const Home = () =>{

    //react
    const location = useLocation();
    const navigate = useNavigate();
    const nomeUser = location.state.nome;

    //user
    const [Username, setUsername] = useState("")
    const [dinheiro, setDinheiro] = useState(0);
    const [pix, setPix] = useState(0);

    //style
    const [valueClassButton, setValueClassButton] = useState("buttonView")
    const [classButtonView, setClassButtonView] = useState("divButtonView");
    const [classUl, setClassUl] = useState("none");

    //extrato
    const [extrato, setExtrato] = useState([])

    //inserirExtrato
    const [valor, setValor] = useState(0);
    const [desc, setDesc] = useState("");
    const [formaPag, setFormaPag] = useState("");
    const [sinal, setSinal] = useState("");

    //update
    const [novoDinheiro, setNovoDinheiro] = useState(0);
    const [novoPix, setNovoPix] = useState(0);

    //dom
    var containerAdd;
    

    //functions
    const getData = async () =>{
        await api.get('/users')
        .then((response) =>{
            for(let i=0; i<response.data.length; i++){
                if(response.data[i].username === nomeUser){
                    setUsername(response.data[i].username);
                    setDinheiro(response.data[i].dinheiro)
                    setPix(response.data[i].pix)
                }
            }
        })
    }

    const getExtrato = () =>{
        fetch("http://localhost:8080/users/extrato")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setExtrato(data);
        })
        .catch(err => {
            console.log(err.message)
        });
    }

    useEffect(() =>{
        if(location.state == null){
            navigate('/')
        }else{
            getData();
        }
        containerAdd = document.querySelector(".containerAdd");
    })

    const changeClass = () =>{
        setValueClassButton("none");
        setClassButtonView("none");
        setClassUl("")
        getExtrato();
    }

    const addExtrato = (sinal) =>{
        setSinal(sinal)
        console.log("add")
        containerAdd.showModal()
    }

    const confirmaExtrato = () =>{
        /*if(valor === null || desc === ""){
            alert("Preencha os Campos")
        }else{
            console.log(valor);
            console.log(desc);
            console.log(formaPag);
            api.post("users/inserirExtrato", {
                username: nomeUser,
                valor: valor,
                desc: desc,
                optionValue: sinal,
                formaPag: formaPag,
            }) */
            console.log(dinheiro.valueOf() + valor.valueOf())
        //}   
    }

    const updateUserData = () =>{
        console.log(novoDinheiro + " " + novoPix)
            api.post("users/updateData", {
                username: nomeUser,
                dinheiro: novoDinheiro,
                pix: novoPix
            })
    }

    return(
        <div className="AllPage">
            <header>
            <div className="headerLeft">
                <p>Username: {Username}</p>
            </div>
                <div className="headerRight">
                    <p>Dinheiro: {dinheiro} R$</p>
                    <p>Pix: {pix} R$</p>
                    <p>Renda Total: {dinheiro + pix} R$</p>
                </div>
            </header>
            <main>
                <div class="containerMain">
                    <dialog  className="containerAdd">
                        <button className="buttonCloseModal" onClick={()=>{containerAdd.close()}}>X</button>
                        <form method='dialog'>
                            <label>Valor (R$):</label>
                            <input type="number" placeholder="Digite aqui" value={valor} onChange={(e)=>{setValor(e.target.value)}}/>
                            <label>Descrição:</label>
                            <input type="text" placeholder="Digite aqui" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                            <label>Forma de Pagamento:</label>
                            <select onChange={(e)=>{setFormaPag(e.target.value)}} name="work_days" className="id_work_days" multiple>
                                <option value="pix">Pix</option>
                                <option value="dinheiro">Dinheiro</option>
                            </select>
                            <div><button onClick={() => {confirmaExtrato()}}>Confirmar</button></div>
                        </form>
                    </dialog>
                <div>
                    <button onClick={() => {addExtrato("positivo")}} class="buttonAdd">+</button>
                </div>
                <div class="blockExtrato">
                    <div className="title">
                        <div><p>Valor:</p></div>
                        <div><p>Descrição:</p></div>
                        <div><p>Forma de Pag:</p></div>
                    </div>
                    <div className={classButtonView}>
                        <button className={valueClassButton} onClick={() =>{changeClass()}}>View</button>
                    </div>
                    <ul className={classUl}>
                        {extrato.map((extrato) => {
                            return(
                                <div className="linha" key={extrato.id}>
                                    <div><p className={extrato.optionValue}>{extrato.valor}</p></div>
                                    <div><p>{extrato.descr}</p></div>
                                    <div><p>{extrato.formaPag}</p></div>
                                </div>
                            )
                        })

                        }
                    </ul>
                </div>
                <div>
                    <button onClick={() => {addExtrato("negativo")}} className='buttonAdd'>-</button>
                </div>
                </div>
            </main>
        </div>
    )
}