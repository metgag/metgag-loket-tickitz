export function fixGenres(genres) {
    const genreRegex = /^(Action|Adventure|Animation|Comedy|Crime|Documentary|Drama|Family|Fantasy|History|Horror|Music|Mystery|Romance|Science Fiction|SciFi|Sci-Fi|Science-Fiction|TV Movie|Thriller|War|Western)$/i;

    // const genres = input.split(',').map(g => g.trim());

    return genres.filter((e) => {
        return genreRegex.test(e)
    })
}

export function convLocation(location) {
    switch (location.toLowerCase()) {
        case "jakarta":
            return 1;
        case "bogor":
            return 2;
        case "bandung":
            return 3;
    }

    return 0;
}

export function convLocations(input) {
  return input
    .split(",")
    .map(e => convLocation(e.trim()))
    .filter(e => e);
}

export function convTime(time) {
    switch (time) {
        case "03:40 AM":
            return 1;
        case "08:30 PM":
            return 2;
        case "01:15 PM":
            return 3;
    }

    return 0;
}