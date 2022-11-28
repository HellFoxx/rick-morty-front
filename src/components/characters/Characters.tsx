import { useEffect, useState } from 'react';
import { getCharacters } from '../../api/character';
import { CharacterI, PaginationI } from '../../types';
import ItemsPage from '../itemsPage/ItemsPage';
import CharacterItem from './charachterItem/CharacterItem';

const Characters = () => {
  const [characters, setCharacters] = useState<PaginationI<CharacterI>>({
    info: { count: 0, pages: 0, next: null, prev: null },
    results: []
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCharacters(page).then((value) => {
      setCharacters(value);
      setLoading(false);
    });
  }, [page]);

  return (
    <ItemsPage
      items={characters.results}
      ItemRender={CharacterItem}
      title='Characters'
      pagination={{
        total: characters.info.count,
        current: page,
        onPaginate: (newPage) => setPage(newPage)
      }}
      loading={loading}
    />
  );
};

export default Characters;
