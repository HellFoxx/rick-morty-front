import axios from 'axios';
import { CharactersOptionsI } from '../components/characters/Characters';
import { CharacterI, EpisodeI, LocationI, PaginationI } from '../types';

export const getCharacters = async (options: CharactersOptionsI): Promise<PaginationI<CharacterI>> => {
  const { page, gender, status, name } = options;
  let result;
  try {
    result = (await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page || 1}` +
      `${name ? `&name=${name}` : ''}` + 
      `${status ? `&status=${status}` : ''}` +
      `${gender ? `&gender=${gender}` : ''}`
    )).data; 
  } catch (error) {
    result = { 
      info: { count: 0, pages: 0, next: null, prev: null }, 
      results: [] 
    };
  }
  return result as PaginationI<CharacterI>;
};

export const getSingleCharacter = async (id: number) => {
  const result = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  return result.data as CharacterI;
};

export const getLocations = async (id: number) => {
  const result = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
  return result.data as LocationI;
};

export const getEpisodes = async (ids: number[]) => {
  const result = await axios.get(`https://rickandmortyapi.com/api/location/${ids}`);
  return result.data as EpisodeI[];
};

export const findCharacterNames = async (name: string) => {
  const result = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
  return (result.data as PaginationI<CharacterI>).results.map((character) => character.name);
}
