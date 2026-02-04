import { useState } from "react";  
import { api } from '../services/api';

export function Formulario() {
    // 1. Memória: Guardamos o que for digitado aqui
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    // 2. Ação: O que acontece ao clicar em "Cadastrar"
    async function handleSubmit(event: any) {
        event.preventDefault(); // Evite que a página recarregue do nada

        // Envia pro Backend (POST)
        await api.post('/usuarios', {
            nome: nome,
            email: email
        });

        // Limpa os campos e avisa
        setNome('');
        setEmail('')
        alert('Usuario cadastrado com sucesso!');
        window.location.reload(); // Truque rápido para atualizar a lista
        
    }

    // 3. Visual: O HTML que aparece na tela
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
