const API_KEY = "36942232";
const API_URL = "https://www.omdbapi.com/";

export async function getData(parametro, page = 1) {
  try {
    const url = `${API_URL}?apikey=${API_KEY}&s=${parametro}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la respuesta");
    
    const data = await response.json();
    if (!data.Search) return [];
    
    const arraySearch = data.Search;
    return [...new Map(arraySearch.map(item => [item.imdbID, item])).values()];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getDataDescripcion(imdbID) {
  try {
    const url = `${API_URL}?apikey=${API_KEY}&i=${imdbID}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la descripción");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}