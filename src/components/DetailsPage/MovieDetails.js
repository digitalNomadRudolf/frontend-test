import React, { useContext, useState, useEffect } from 'react';
import { APIsettings } from '../../APIsettings';
import axios from 'axios';
import Loading from '../UIelems/Loading';
import {NavLink} from 'react-router-dom';
import { filter } from 'minimatch';

export default function MovieDetails(props) {
    const { id } = props.match.params;
    let [movDetails, setMovDetails] = useState({});
    let [loading, setLoading] = useState(true);
    let [cast, setCast] = useState();
    let [genre, setGenre] = useState();
    let [direc, setDirec] = useState();
    let [highlight, setHighlight] = useState(false); // will return true or false depending on localStore contents
    
    // on load of the component get the movie details
    useEffect(() => {
        // call the method for retrieving the movie details
        retrieveMovie();
    }, []);
    
    // check if the movie is currently in the favourites
    useEffect(() => {
        console.log('{id}', id,  isFavourite(id))
        setHighlight(isFavourite(id))
    }, [id]);
    
    return (
        <>   

            <Loading visible={loading} />
            {
                <MovieDetailsContent movDetails={movDetails} />
            }       
        </>
    );

    function MovieDetailsContent({movDetails}) {
        console.log(movDetails)
        return (
                <div className="container movie-details">
                    <div className="row">
                {/* left part containing the movie information */}
                <div className="col-sm-12 col-md-7">
                    <div className="movie-title">
                        <div className="movie-title__heading">
                            <h5>Movie Title</h5>
                            <NavLink to="/">
                                Back to homepage
                            </NavLink>
                        <h1 className="move-title__heading--moviename">{movDetails.Title}</h1>
                        </div>
                        
                        <div className="like-button float-right">
                            <LikeButton 
                                icon="heart"
                                highlight={highlight}
                                hlColor="red"
                                    />

                        </div>
                    </div>

                    <div className="movie-plot">
                        <h5>Plot</h5>
                        <p>{movDetails.Plot}</p>
                    </div>

                    <ListMovieInfo title="Cast" type={cast} />                     

                    <ListMovieInfo title="Genre" type={genre} /> 

                    <ListMovieInfo title="Director" type={direc} />

                </div>
                {/* right part containing the image */}
                <div className="col-sm-12 col-md-5 movie-rightcol">
                    <img src={movDetails.Poster} alt="movie image" className="img-responsive movie-image"/>
                </div>
            </div>
        </div>
        )
    }

    function setFavMovies(id) {
      // get list of movies
      const movies = localStorage.getItem('favMov') || "[]";
      let moviesParsed = JSON.parse(movies);
      // is it already in the movie array then remove with filter
        if (moviesParsed.includes(id)) {
            moviesParsed = moviesParsed.filter(item => item !== id);
        }else {
    // otherwise, push the id into the array
            moviesParsed.push(id);
        }
            // at the end of this function use the localStorage.setItem('favMovies', JSON.stringify(favMovies));
            localStorage.setItem('favMov', JSON.stringify(moviesParsed));
            setHighlight(isFavourite(id))
    }

    function isFavourite(id) {
        console.log('isFavourite called')
        let favMovies = localStorage.getItem('favMov') || "[]";
        if (favMovies) {
            return JSON.parse(favMovies).includes(id);
        } else {
            return false
        }
    }


    function LikeButton(props) {
        console.log('like button props ',props)
        return (
            <span
                style={{
                    display: 'block',
                    width: 60,
                    fontSize: 30,
                    cursor: 'pointer',
                    color: props.highlight === true ? props.hlColor : "white"
                }}>
                <span className={`pr-2 fas fa-${props.icon} heart-icon`} onClick={() => setFavMovies(id)} />
                {/* is this page in localStorage? if it IS then we are going to add the red color */}
                {isFavourite(id) ? <span className="liked">liked!</span> : ''}
            </span>
        )
    }

    function ListMovieInfo(props) {
        return (
            <div className="movlist-info float-left">
                <div className="movlist-info__column col-sm-6">
                    <h3>{props.title}</h3>
                    <ul className="movlist-info__column__list">
                        {props.type !== undefined &&
                        props.type.map(item => (
                            <li key={item}>{item}</li>
                        ))
                        }                                  
                    </ul>
                </div>
            </div>
        )
    }

    function strToArr(str) {
        return str.split(', ');
    }

    // fetch the movie data
    function retrieveMovie() {
        setLoading(true);

        let url = `${APIsettings.url}&i=${id}`;

        axios.get(url)
        .then(response => {
            setLoading(false);
            const cast = strToArr(response.data.Actors);
            const genre = strToArr(response.data.Genre);
            const direc = strToArr(response.data.Director);
            setCast([...cast]);
            setGenre([...genre]);
            setDirec([...direc]);
            setMovDetails(response.data);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }

}
