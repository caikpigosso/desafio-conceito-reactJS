import React, { useState, useEffect} from "react";


import "./styles.css";
import api from './services/api'

function App() {

  const [repositories,setRespositories] = useState([]);

  useEffect(() => {

    api.get('/repositories').then(result => {
      setRespositories(result.data)
    })

  }, []);

  async function handleAddRepository() {
    const result = await api.post("repositories",{
      title: `Project ReactJS ${Date.now()}`,
      owner: "Caik Pigosso",
    })

    const repository = result.data;

    setRespositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const respositoryIndex = repositories.findIndex((repository)=>repository.id ===id )

    repositories.splice(respositoryIndex, 1)

    setRespositories([...repositories])
  }

  return (
    <>
      <ul data-testid="repository-list">

        {
          repositories.map(repository => <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button></li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
  </>
  );
}

export default App;
