import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const name = `Repositorio ${Math.floor(Math.random() * 200)}`

    const response = await api.post('/repositories', {
      title: name,
      url: '',
      techs: [],
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const index = repositories.findIndex(r => r.id === id);

      let newRepositories = [...repositories];  

      newRepositories.splice(index, 1);

      setRepositories(newRepositories)
    } catch (error) {
      alert("Erro ao tentar deletar")
    } 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
