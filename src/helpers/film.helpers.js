export function filterFilmsByDirector(list, searchDirector) {
    return list.filter(movie => movie.director == searchDirector);
}

export function getUniqueListOf(list, prop) {

    const prevSeenValues = [];

    list.forEach((item) => {
       if (!prevSeenValues.includes(item[prop])) {
        prevSeenValues.push(item[prop]);
       }
    });

    return prevSeenValues;

}