import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import PaginationComponent from './Pagination';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CharacterInfo from './CharacterInfo';

const Character = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get('https://anapioficeandfire.com/api/characters');
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onCharacterClick = (name) => {
    console.log(`Character clicked: ${name}`);
    
  };

  return (
    <Router>
      <Container>
        {isLoading && <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
        {error && <div>{error}</div>}
        {!isLoading && !error && (
          <>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Height</th>
                      <th>Mass</th>
                      <th>Gender</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.name}>
                      <td><Link to={`/character/${item.name}`} onClick={() => onCharacterClick(item.name)}>{item.name}</Link></td>
                      <td>{item.height}</td>
                      <td>{item.mass}</td>
                      <td>{item.gender}</td>
                      <td><Link to={`/character/${item.name}`} onClick={() => onCharacterClick(item.name)}>View Details</Link></td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <PaginationComponent
                  itemsPerPage={itemsPerPage}
                  totalItems={data.length}
                  onPageChange={paginate}
                  onPageSizeChange={setItemsPerPage}
                />
              </Col>
            </Row>
            <Route path="/character/:name" render={({ match }) => {
              const character = data.find(item => item.name === match.params.name);
              return character ? <CharacterInfo character={character} /> : null;
            }} />
          </>
        )}
      </Container>
    </Router>
  );
};

export default Character;
