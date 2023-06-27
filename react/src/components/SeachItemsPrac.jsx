import React, { useRef, useState } from 'react';
// SearchTerm practice using ref and state. For learning purposes only

function SearchBar() {
  // const [searchTerm, setSearchTerm] = useState('');
  const [items] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
    { id: 4, name: 'Pear' },
  ]);
  const [searchedItems, setSearchItems] = useState([])
  const searchRef = useRef(null)

  const handleInputChange = (event) => {
    // const value = event.target.value;
    // setSearchTerm(value);
    const searchTerm = searchRef.current.value
    filterItems(searchTerm);
  };
  
  const filterItems = (searchTerm) => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchItems(filteredItems);
  };
  
  return (
    <div>
      <input type="text" ref={searchRef} onChange={handleInputChange} />
      <ul>
        {(searchTerm.length > 0 ? searchedItems : items ).map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;