import React, { useState, useMemo } from 'react';
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

function TableRowInner({ character }) {
  return (
    <>
      <td className="table-cell">{character.name}</td>
      <td className="table-cell">{character.house}</td>
    </>
  );
}

const OptimizedTableRowInner = React.memo(TableRowInner);

function Table(props) {
  console.log('render: Table');
  const { charactersList, shouldCharacterDisplays } = props;
  return (
    <table className="table">
      <thead className="table-head">
        <tr className="table-row">
          <th className="table-cell">Name</th>
          <th className="table-cell">House</th>
        </tr>
      </thead>
      <tbody>
        {charactersList.map((character, index) => (
          <tr key={character.name} style={{ display: shouldCharacterDisplays[index] ? '' : 'none' }}>
            <OptimizedTableRowInner character={character} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const OptimizedTable = React.memo(Table);

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

  const shouldCharacterDisplays = useMemo(
    () =>
      charactersData.map(
        (character) =>
          stateActiveHouseId === 'all' ||
          character.houseId === stateActiveHouseId
      ),
    [stateActiveHouseId]
  );

  return (
    <div className={cn('app', `theme-${stateTheme}`)}>
      <Header>
        <button className="theme-switch-btn" onClick={handleChangeTheme}>
          {stateTheme === 'light' ? 'Nox' : 'Lumos'}
        </button>
      </Header>
      <main className="main">
        <Picker activeHouseId={stateActiveHouseId} onChange={handleFilter} />
        <p>List starts with {charactersData[shouldCharacterDisplays.indexOf(true)].name}</p>
        <OptimizedTable charactersList={charactersData} shouldCharacterDisplays={shouldCharacterDisplays} />
      </main>
    </div>
  );
}

export default App;
