import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef';

const limit = 50;
function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);//loadingマーク表示
useEffect(() => {
  fetchCharacters();
},{});

const fetchCharacters = async(page) =>{
  const apiUrl = 'https://narutodb.xyz/api/character';
  setIsLoading(true);
  const result = await axios.get(apiUrl,{ params : { page, limit }});//key value一緒なので省略
  setCharacters(result.data.characters);
  setIsLoading(false);
};
const handleNext = async () =>{
  const nextPage = page + 1 ;
  await fetchCharacters(nextPage);
  setPage(nextPage);
};

const handlePrev = async () =>{
  const prevPage = page - 1 ;
  await fetchCharacters(prevPage);
  setPage(prevPage);
};

return <div className='container'>
  <div className='header'>
    <div className='header-content'>
      <img src='logo.png' className='logo' />
    </div>
  </div>
  {isLoading ?<div>Now Loading...</div> : 
  <main>
    <div className='cards-container'>
      {characters.map((characters)=>{
        return <div className='card' key={characters.id}>
          <img src={characters.images[0] != null? characters.images[0] : 'dummy.png'}
              alt="character"
              className='card-image' />
              <div className='card-content'>
                <h3 className='card-title'>{characters.name}</h3>
                <p className='card-description'>{characters.debut != null ? characters.debut.appearsIn : 'nothing'}</p>
                <div className='affiliation'>{characters.personal?.affiliation ?? 'nothing'}</div>
              </div>
        </div>;
      })}
    </div>
    <div className='pager'>
      <button disabled={page === 1}className='prev' onClick={handlePrev}>Previous</button>
      <span className='page-number'>{page}</span>
      <button disabled={limit > characters.length} className='next'onClick={handleNext}>Next</button>
    </div>
  </main>}
</div>
}

export default App;
