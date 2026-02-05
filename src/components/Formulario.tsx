import { useState } from "react";
import { api } from '../services/api';
import './Formulario.css';

// 1. CONTRATO: Avisamos que vamos receber uma função
interface FormularioProps {
    aoCadastrar: (usuario: any) => void; 
}

// 2. RECEPÇÃO: Recebemos a função "aoCadastrar" aqui dentro das chaves {}
export function Formulario({ aoCadastrar }: FormularioProps) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(event: any) {
        event.preventDefault();

        const resposta = await api.post('/usuarios', {
            nome: nome,
            email: email
        });

        // 3. USO: Aqui a gente chama a função do Pai!
        aoCadastrar(resposta.data); 

        setNome('');
        setEmail('');
        alert('Usuário cadastrado com sucesso!');
        // Note que NÃO tem mais o reload aqui!
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                placeholder="Digite o nome"
                value={nome}
                onChange={e => setNome(e.target.value)} 
            />
            <input 
                placeholder="Digite o email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
        </form>
    )
}
