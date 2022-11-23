import { useState, useEffect } from "react";
import { filterFilmsByDirector } from "../helpers/film.helpers.js";
import { getUniqueListOf } from "../helpers/film.helpers.js";

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
                <ul>
                {filmsByDirector.length > 0?
                filmsByDirector.map((element) => {
                    return (
                    <li key={element.id}>{element.title}</li>
                    );
                })
                :
                list.map((element) => {
                    return (
                    <li key={element.id}>{element.title}</li>
                    );
                })
                }
                </ul>
            </div>
        );
    }