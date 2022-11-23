import { useState, useEffect } from "react";

export default function FilmsList(props) {
    
    const [list, setList] = useState([]);

    function getFilms() {
        fetch ("https://ghibliapi.herokuapp.com/films")
        .then((response) => response.json())
        .then((films) => setList(films))
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        getFilms();
    }, []);

        return (
            <ul>
                {list.map((film) => {
                    return <li key={film.id}>{film.title}</li>;
                })}
            </ul>
        );
    }