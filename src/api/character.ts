import axios from 'axios';
import { CharacterI, EpisodeI, LocationI, PaginationI } from '../types';

export const getCharacters = async (page?: number) => {
  const result = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page || 1}`);
  return result.data as PaginationI<CharacterI>;
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
