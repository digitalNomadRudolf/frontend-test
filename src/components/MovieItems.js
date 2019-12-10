import React, { useContext } from 'react';
import noimage from '../images/noimage.jpg';
import { NavLink } from 'react-router-dom';


export default function MovieItems(props) {

    // map through movielist and display those movies
    let movieList;

    if (props.view === 'row') {
        movieList = props.movieList.map((movie, index) => {
            return <MovieRowItem 
                key={index}
                id={movie.imdbID}
                title={movie.Title}
                img={`${movie.Poster}`}
                    />
        })
    } else {
        movieList = props.movieList.map((movie, index) => {
            return <div key={index} className="col-6 col-md-4 col-lg-3 mt-5">
                <MovieGridItem  
                id={movie.imdbID}
                title={movie.Title}
                img={`${movie.Poster}`}
                    />
                </div>
        })
    }
    
    
    if (!props.notfound) {
        if (props.view === 'row') {
            return (
                <div className="items-row mt-3">
                    {movieList}
                </div>
            )
        } else {
            return (
                <div className="items-grid row mt-3">
                    {movieList}
                </div>
            )
        }
    } else {
        return (
            <p className="mt-3 text-white text-center" style={{fontSize: "2em"}}>
                No movies found. Please try again...
            </p>
        )
    }

}   

    // function to display the movie in a row 
    function MovieRowItem(props) {
        return (
            <div id={`item-${props.id}`} className="row-item mt-5 mx-auto row" onClick={props.onClick}>
                <NavLink to={`/movies/${props.id}`}>
                <img src={props.img.includes('N/A') ? noimage : props.img} alt={props.title} className="movie-image" />
                </NavLink>

                
                <div className="row-content p-3">
                    <a href={`/movies/${props.id}`}>
                    <h3>{props.title}</h3>
                    </a>
                </div>
            </div>
        );
    }

    // function to display the movie in a grid
    function MovieGridItem(props) {
        return (
            <div id={`item-${props.id}`} className="grid-item" onClick={props.onClick} style={{backgroundImage: `url(${props.img.includes('N/A') ? noimage : props.img})`}}>
                <NavLink to={`/movies/${props.id}`}>
                <div className="grid-bg"></div>
                    <div className="grid-details">
                        <p className="grid-title">{props.title}</p>
                    </div>
                </NavLink>
            </div>
        );
    }
