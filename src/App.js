import './css/App.css';
import { useState, useEffect } from 'react';

// const mock = [
//   {
//     "id": 1,
//     "name": "Rick Sanchez",
//     "status": "Alive",
//     "species": "Human",
//     "type": "",
//     "gender": "Male",
//     "origin": {
//       "name": "Earth",
//       "url": "https://rickandmortyapi.com/api/location/1"
//     },
//     "location": {
//       "name": "Earth",
//       "url": "https://rickandmortyapi.com/api/location/20"
//     },
//     "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//     "episode": [
//       "https://rickandmortyapi.com/api/episode/1",
//       "https://rickandmortyapi.com/api/episode/2",
//       // ...
//     ],
//     "url": "https://rickandmortyapi.com/api/character/1",
//     "created": "2017-11-04T18:48:46.250Z"
//   },
//   // ...
// ]

function App() {
  const [ conteudo, setConteudo ] = useState(<></>);

  async function carregarTodosOsPersonagens() {
    const result = await fetch(
      'https://rickandmortyapi.com/api/character/',

      {method: 'GET'}
    )

    .then (response => response.json())

    return result.results;
  }

  async function listaPersonagem(){
    const todosPersonagens = await carregarTodosOsPersonagens();

    return todosPersonagens.map(personagem => 
    <div className="card char">
      <div>
        <img src={personagem.image} />
      </div>
      <div>
        {personagem.name}
      </div>
      <div className="char-info">
        <span>Espécie: {personagem.species == "Human" ? "Humano" : "Não Humano"}</span>
      </div>
      <div className="char-info">
        <span>Gênero: {personagem.gender == "Male" ? "Masculino" : "Feminino"}</span>
      </div>
      <div className="lista-secundaria">
        <span>Participações: </span>
        {  personagem.episode.map(ep => (
        <span key={personagem.name + (ep.split('episode/')[1])} > EP:{(ep.split('episode/')[1])}</span>
        ))}
      </div>
      <div className="char-info">
        <span>Status: </span>{personagem.status == "Alive" ? "Vivo" : personagem.status == "Unknown" ? "Desconhecido" : "Morto"}
      </div>
    </div>)
  }

  useEffect(() => {
    async function carregar(){
      setConteudo (await listaPersonagem())
    }
    carregar()
  })

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className="lista-principal">
        {conteudo}
      </div>
    </div>
  );
}

export default App;
