import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCharacters, setTotalCharacters] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const apiUrl = `https://anapioficeandfire.com/api/characters?page=${currentPage}&pageSize=${pageSize}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCharacters(data);
        setTotalCharacters(response.headers.get('Total-Count'));
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [currentPage, pageSize]);

  return (
    <div className="characters-container">
      {characters.map((character) => (
        <div key={character.url} className="character-card">
          {character.name || character.aliases}
        </div>
      ))}

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          {'<'}
        </button>
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalCharacters}
          onPageChange={(newPage) => setCurrentPage(newPage)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
        />
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Characters;