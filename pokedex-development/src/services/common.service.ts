
import { LIMIT, baseURL } from "../constants/apiUrls";

export const initialURL = `${baseURL}/pokemon?limit=${LIMIT}`;
export const allPokemonURL = `${baseURL}/pokemon?limit=1100`;


export const getPokemonData = async () => {
  const response = await fetch(`${initialURL}`);
  const result = response.json();
  return result;
};

export const getSpeciesDataById = async (id: number | string) => {
  const response = await fetch(`${baseURL}/pokemon-species/${id}/`);
  const result = await response.json();
  return result;
};

export const getPokemonTypesById = async (id: number | string) => {
  const response = await fetch(`${baseURL}/type/${id}/`);
  const result = await response.json();
  return result;
};

export const getPokemonTypes = async () => {
  const response = await fetch(`${baseURL}/type`);
  const result = await response.json();
  return result;
};

export const getPokemonGenders = async () => {
  const response = await fetch(`${baseURL}/gender`);
  const result = await response.json();
  return result;
};


export const getPokemonDataById = async (id: number | string) => {
  const response = await fetch(`${baseURL}/pokemon/${id}/`);
  const result = response.json();
  return result;
};


export const getPokemonDataByURL = async (URL: string) => {
  const response = await fetch(URL);
  const result = response.json();
  return result;
}

export const numberFormation = (number: number | string) => {
  if (Number(number) < 10) number = `00${number}`;
  if (Number(number) > 10 && Number(number) < 100) number = `0${number}`;
  return number;
}

export const getAllParallelCall = async (ApiUrls: string[]) => {
  return await Promise.all(
    ApiUrls.map(async (url: string) => {
      const res = await fetch(url);
      return res.json(); // Send request for each id
    }));
}

export const removeDuplicateBy = <T>(arr: T[], prop: keyof T) => {
  return [...new Map(arr.map((m: T) => [m[prop], m])).values()];
}