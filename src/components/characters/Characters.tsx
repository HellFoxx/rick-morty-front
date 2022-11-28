import { useEffect, useState } from 'react';
import { getCharacters, findCharacterNames } from '../../api/character';
import { CharacterI, PaginationI } from '../../types';
import ItemsPage from '../itemsPage/ItemsPage';
import CharacterItem from './charachterItem/CharacterItem';
import CharactersFilter, { FilterOptionsI } from './charactersFilter/CharactersFilter';

export interface CharactersOptionsI extends FilterOptionsI {
  page?: number;
}

const Characters = () => {
  const [characters, setCharacters] = useState<PaginationI<CharacterI>>({
    info: { count: 0, pages: 0, next: null, prev: null },
    results: []
  });
  const [characterOptions, setCharacterOptions] = useState<CharactersOptionsI>({ page: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCharacters(characterOptions).then((value) => {
      setCharacters(value);
      setLoading(false);
    });
  }, [characterOptions]);

  const onCharactersFilter = (options?: FilterOptionsI) => {
    setCharacterOptions({ ...characterOptions, ...options })
  }

  const onPaginate = (newPage: number) => {
    setCharacterOptions({...characterOptions, page: newPage})
  }

  return (
    <ItemsPage
      items={characters.results}
      ItemRender={CharacterItem}
      title='Characters'
      pagination={{
        total: characters.info.count,
        current: characterOptions.page || 1,
        onPaginate
      }}
      loading={loading}
      additionalContent={(
        <CharactersFilter
          fetchNames={findCharacterNames}
          onOptionsChange={onCharactersFilter}
        />
      )}
    />
  );
};

export default Characters;
