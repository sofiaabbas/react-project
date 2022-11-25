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

export const getFilmStats = (list) => {
    const array = [...list];
    if (list.length <= 0) {
        return {
            sum: 0,
            avg_score: 0,
            total: 0,
            latest: 1600,
        };
    }

    const acc_score = array.reduce((a, c) => {
       return a + Number(c.rt_score);
    }, 0);

    const total = array.length;
    const avg_score = acc_score / total;

    //const latest = Math.max(...list.map(item => item.release_date));
    const latest = array.sort((a, b) => {
       return b.release_date - a.release_date;
    })[0];

    return {
        acc_score,
        avg_score, 
        total,
        latest: latest.release_date,
    };
};