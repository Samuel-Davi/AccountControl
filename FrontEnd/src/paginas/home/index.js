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
    const [userId, setUserId] = useState(0);
    const [renda, setRenda] = useState(0);

    //style
    const [valueClassButton, setValueClassButton] = useState("buttonView")
    const [classButtonView, setClassButtonView] = useState("divButtonView");
    const [classUl, setClassUl] = useState("none");
    const [isBlurred, setIsBlurred] = useState(true);

    //extrato
    const [extrato, setExtrato] = useState([])

    //inserirExtrato
    const [valor, setValor] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [saldoApos, setSaldoApos] = useState(0.0);
    const [desc, setDesc] = useState("");
    const [formaPag, setFormaPag] = useState("");
    const [sinal, setSinal] = useState("");

    //dom
    var containerAdd;
    

    //functions
    const getData = async () =>{
        await api.get('/users')
        .then((response) =>{
            for(let i=0; i<response.data.length; i++){
                if(response.data[i].nome === nomeUser){
                    setUserId(response.data[i].id);
                    setUsername(response.data[i].nome);
                }
            }
        })
    }

    const getExtrato = () =>{
        fetch(`http://localhost:8080/users/${userId}/extrato`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setExtrato(data);
        })
        .catch(err => {
            console.log("erro: " + err.message)
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

    const addExtrato = (sinalMudado) =>{
        setSinal(sinalMudado)
        console.log(sinal)
        containerAdd.showModal()
    }

    async function confirmaExtrato(){
        if(valor === null || desc === ""){
            alert("Preencha os Campos")
        }else{
            console.log("sinal: " + sinal)
            if(sinal === "positivo"){
                api.put(`users/${userId}/inserirExtrato`,{
                    valor: valor,
                    descricao: desc,
                    tipo_transacao: formaPag,
                    categoria: categoria,
                    saldo_apos_transacao: parseFloat(renda) + parseFloat(valor)
                })
                api.post(`users/${userId}/`, {
                    renda: parseFloat(renda) + parseFloat(valor)
                })
                setRenda(parseFloat(renda) + parseFloat(valor))
            }else{
                api.put(`users/${userId}/inserirExtrato`,{
                    valor: valor,
                    descricao: desc,
                    tipo_transacao: formaPag,
                    categoria: categoria,
                    saldo_apos_transacao: parseFloat(renda) - parseFloat(valor)
                })
                api.post(`users/${userId}/`, {
                    renda: parseFloat(renda) - parseFloat(valor)
                })
                setRenda(parseFloat(renda) - parseFloat(valor))
                setValor(parseFloat(valor)*-1)
            }
            
        }   
    }


    async function toggleBlur(){
        if(isBlurred){
            await api.get(`/users/${userId}`)
            .then((response) =>{
                setRenda(response.data[0].renda);
            })

        }
        setIsBlurred(prevState => !prevState);
    };

    return(
        <div className="AllPage">
            <header>
            <div className="headerLeft">
                <p>Usuário: {Username}</p>
            </div>
                <div className="headerRight">
                    <img alt="olho" id="imgOlho" onClick={toggleBlur}/>
                    <p style={{filter: isBlurred ? 'blur(5px)' : 'none'}}> renda: {renda} R$</p>
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
                                <option value="debito">Débito</option>
                                <option value="credito">Crédito</option>
                            </select>
                            <label for="categoria">Categoria:</label>
                                <select id="categoria" name="categoria" onChange={(e) => {setCategoria(e.target.value)}}>
                                    <option value="" disabled selected>Selecione uma categoria</option>
                                    <option value="alimentacao">Alimentação</option>
                                    <option value="transporte">Transporte</option>
                                    <option value="moradia">Moradia</option>
                                    <option value="saude">Saúde</option>
                                    <option value="educacao">Educação</option>
                                    <option value="lazer">Lazer</option>
                                    <option value="outras">Outras</option>
                                </select>

                            <div><button onClick={() => {confirmaExtrato()}}>Confirmar</button></div>
                        </form>
                    </dialog>
                <div>
                    <button onClick={() => {addExtrato("positivo")}} className="buttonAdd">+</button>
                </div>
                <div class="blockExtrato">
                    <div className="title">
                        <div><p>Valor:</p></div>
                        <div><p>Descrição:</p></div>
                        <div><p>Tipo:</p></div>
                    </div>
                    <div className={classButtonView}>
                        <button className={valueClassButton} onClick={() =>{changeClass()}}>View</button>
                    </div>
                    <ul className={classUl}>
                        {extrato.map((extrato) => {
                            return(
                                <div className="linha" key={extrato.id}>
                                    <div><p className={extrato.optionValue}>{extrato.valor} R$</p></div>
                                    <div><p>{extrato.descricao}</p></div>
                                    <div><p>{extrato.tipo_transacao}</p></div>
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