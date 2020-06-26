import React, { useState } from 'react';
import cn from 'clsx';

import { housesData, charactersData } from './staticData';
import './styles.css';

function Header(props) {
  console.log('render: Header');
  const { children } = props;
  return (
    <header className="app-header">
      <h1 className="app-name">Potter World</h1>
      {children}
    </header>
  );
}

function Picker(props) {
  console.log('render: Picker');
  const { activeHouseId, onChange } = props;
  return (
    <div className="house-picker">
      <h3>Filter by House</h3>
      <ul className="house-list">
        {housesData.map((house) => (
          <li key={house.id}>
            <button
              className={cn('house', activeHouseId === house.id && 'active')}
              onClick={(event) => onChange(house.id, event)}
            >
              <span>{house.name}</span>
              <img src={house.imageUrl} alt={house.name} className="house-logo" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Table(props) {
  console.log('render: Table');
  const { charactersList } = props;
  return (
    <table className="table">
      <thead className="table-head">
        <tr className="table-row">
          <th className="table-cell">Name</th>
          <th className="table-cell">House</th>
        </tr>
      </thead>
      <tbody>
        {charactersList.map((character) => (
          <tr key={character.name}>
            <td className="table-cell">{character.name}</td>
            <td className="table-cell">{character.house}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const OptimizedTable = React.memo(Table);

function filterByHouse(houseId) {
  return charactersData.filter((character) => {
    if (houseId === 'all') {
      return true;
    }
    return character.houseId === houseId;
  });
}

function App() {
  console.log('render: App');
  const [stateTheme, setStateTheme] = useState('dark');
  const [stateActiveHouseId, setStateActiveHouseId] = useState('all');

  function handleChangeTheme() {
    setStateTheme((oldTheme) => (oldTheme === 'dark' ? 'light' : 'dark'));
  }

  function handleFilter(houseId) {
    setStateActiveHouseId(houseId);
  }

  const filteredCharacters = filterByHouse(stateActiveHouseId);

  return (
    <div className={cn('app', `theme-${stateTheme}`)}>
      <Header>
        <button className="theme-switch-btn" onClick={handleChangeTheme}>
          {stateTheme === 'light' ? 'Nox' : 'Lumos'}
        </button>
      </Header>
      <main className="main">
        <Picker activeHouseId={stateActiveHouseId} onChange={handleFilter} />
        <p>List starts with {filteredCharacters[0].name}</p>
        <OptimizedTable charactersList={filteredCharacters} />
      </main>
    </div>
  );
}

export default App;
