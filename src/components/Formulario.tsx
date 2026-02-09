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

   // Novo estado: para guardar a mensagem de erro (se houver)
   const [erro, setErro] = useState('');
   
   async function handleSubmit(event:any) {
    event.preventDefault();
    setErro(''); // limpa erros antigos ao tentar de novo
        try {
            // tentativa: o código tenta fazer o post
            const resposta = await api.post('/usuarios', {
                nome: nome,
                email: email
            });

            // se chegou aqui deu certo (201 created)
            aoCadastrar(resposta.data);
            setNome('');
            setEmail('');
            alert('Usuário cadastrado com sucesso!');

        } catch (err: any) {
            // captura: se o backend devolver 400 ou 500, cai aqui

            // verifica se é erro do Zod (que tem "detalhes")
            if (err.response?.data?.detalhes) {
                // pega o primeiro erro da lista (ex: "o nome precisa ter 3 letras")
                const errosDoZod = err.response.data.detalhes;
                const primeiroErro = Object.values(errosDoZod)[0];
                setErro(primeiroErro as string);
            }
            // verifica se é erro genérico (ex: EMAIL JÁ EXISTE)
            else if (err.response?.data?.error) {
                setErro(err.response.data.error);
            }
            // se o servidor estiver desligado
            else {
                setErro("Erro ao conectar com o servidor.");
            }
        }
    
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
            {/* Exibição: só mostra essa linha se tiver erro  */}
            {erro && <p style={{ color: 'red', marginTop: '5px' }}>{erro}</p>}

            <button type="submit">Cadastrar</button>
        </form>
    )
}
 