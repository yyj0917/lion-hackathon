import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
};