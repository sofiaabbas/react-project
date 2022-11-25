import { useState, useEffect } from "react";
import { filterFilmsByDirector, getUniqueListOf, getFilmStats, } from "../helpers/film.helpers.js";
import { Link } from "react-router-dom";

export default function FilmsPage(props) {
    
    const [list, setList] = useState([]);
    const [searchDirector, setSearchDirector] = useState("");

    function getFilms() {
        fetch ("https://ghibliapi.herokuapp.com/films")
        .then((response) => response.json())
        .then((films) => setList(films))
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        getFilms();
    }, []);

    const filmsByDirector = filterFilmsByDirector(list, searchDirector);
    const directors = getUniqueListOf(list, "director");
    const { avg_score, total, latest } = getFilmStats(list);

        return (
            <div>
                <h1>Studio Ghibli Films</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="searchDirectorSelect">Select Directors</label>
                        <select 
                        name="searchDirectorSelect" 
                        id="searchDirectorSelect" 
                        value={searchDirector}
                        onChange={(e) => {
                            setSearchDirector(e.target.value)
                        }}
                        >
                        <option value="">All</option>
                        {directors.map((directorName, index) => {
                            return (
                                <option key={`${directorName}${index}`} value={directorName}>
                                    {directorName}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                </form>
                <div>
                    <div>
                        <span># Of Films: </span>
                        <span>{total}</span>
                    </div>
                    <div>
                        <span>Average Rating: </span>
                        <span>{avg_score.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Latest Film: </span>
                        <span>{latest}</span>
                    </div>
                </div>
                <ul>
                {filmsByDirector.length > 0
                ? filmsByDirector.map((film) => {
                    return (
                    <li key={film.id}>
                        <Link to={`film/${film.id}`}>
                        {film.title}
                        </Link>
                    </li>
                    );
                })
                :
                list.map((film) => {
                    return (
                    <li key={film.id}>
                        <Link to={`film/${film.id}`}>
                        {film.title}
                        </Link>
                    </li>
                    );
                })
                }
                </ul>
            </div>
        );
    }