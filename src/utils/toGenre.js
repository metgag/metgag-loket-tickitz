export default function toGenre(id, genres) {
  const genreMap = new Map();
  genres.forEach((e) => { genreMap.set(e.id, e.name) });
  return genreMap.get(id);
}