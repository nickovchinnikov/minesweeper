import React, { useState, FC, ChangeEventHandler } from 'react';

export const Search: FC = () => {
  const [search, setSearch] = useState<string>('');

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div>
      <SearchInput search={search} onChange={onChange} />
      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
};

interface SearchInputProps {
  search?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput: FC<SearchInputProps> = ({
  search = '',
  onChange,
}) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onChange} />
  </div>
);
