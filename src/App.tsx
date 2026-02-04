import { useEffect, useState } from 'react'; // importa ferramentas do React
import { Header } from './components/Header'; 
import { Footer } from './components/Footer';
import { Formulario } from './components/Formulario';
import { api } from './services/api';  // importa configuração axios


// dizer ao TS o que esperar do banco
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

function App() {
  // a memória começa com lista vazia []
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // o gatilho: roda uma vez quando a tela abre
  useEffect(() => {
    api.get('/usuarios')
    .then(resposta => { //Guarda o que veio do backend na memória
      setUsuarios(resposta.data); // guarda o que veio do backend na memória
    });
  }, []);
  return(
    <>
    <Header /> 

    <main>
      <Formulario />
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
          </li>
        ))}
      </ul>
    </main>

    <Footer /> {/* Forma curta: abre e fecha aqui */}
    </>
  )
}

export default App