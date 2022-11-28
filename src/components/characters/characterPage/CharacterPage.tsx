import { useParams } from 'react-router-dom';
import './CharacterPage.scss';
import { useEffect, useState } from 'react';
import { CharacterI, EpisodeI, LocationI } from '../../../types';
import { getEpisodes, getLocations, getSingleCharacter } from '../../../api/character';
import { List } from 'antd';

const CharacterPage = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState<CharacterI>();
  const [origin, setOrigin] = useState<LocationI>();
  const [location, setLocation] = useState<LocationI>();
  const [episodes, setEpisodes] = useState<EpisodeI[]>([]);

  useEffect(() => {
    if (!characterId) return;
    getSingleCharacter(parseInt(characterId)).then((value) => setCharacter(value));
  }, [characterId]);

  useEffect(() => {
    if (character?.origin) {
      getLocations(getIdsFromUrl([character.origin.url]).pop() || -1).then((result) => setOrigin(result));
    }
    if (character?.location) {
      getLocations(getIdsFromUrl([character.location.url]).pop() || -1).then((result) => setLocation(result));
    }
    if (character?.episode) {
      getEpisodes(getIdsFromUrl(character.episode)).then((value) => setEpisodes(value));
    }
  }, [character]);

  const getIdsFromUrl = (urls: string[]) => urls.map((url) => parseInt(url.split('/').pop() || '-1'));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return '#68B984';
      case 'Dead':
        return '#CE7777';
      default:
        return '#FED049';
    }
  };

  return (
    <div className='character-page-wrapper'>
      <div className='character-page-container'>
        {characterId ? (
          <>
            <div className='profile'>
              <div className='profile-image' style={{ backgroundImage: `url("${character?.image}")` }}></div>
              <div className='profile-data'>
                <h1>{character?.name}</h1>
                <span>
                  <span style={{ color: getStatusColor(character?.status || '') }}>{character?.status}</span>
                  {` - `}
                  <span>{character?.gender}</span>
                </span>
              </div>
            </div>
            {origin && (
              <div className='origin-wrapper'>
                <h1>Origin</h1>
                {`${origin.name} - ${origin.type} - ${origin.dimension}`}
              </div>
            )}
            {location && (
              <div className='location-wrapper'>
                <h1>Location</h1>
                {location?.name}
              </div>
            )}
            {episodes.length && (
              <div className='episode-wrapper'>
                <h1>Episodes</h1>
                <List
                  size='small'
                  bordered
                  dataSource={episodes.map((e) => e.name)}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </div>
            )}
          </>
        ) : (
          <h1>Ooops... Character not found</h1>
        )}
      </div>
    </div>
  );
};

export default CharacterPage;
