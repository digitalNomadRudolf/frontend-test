import React, { useState, useEffect } from 'react';
import { APIsettings } from '../APIsettings';
import axios from 'axios';
import Loading from './UIelems/Loading';
import MovieItems from './MovieItems';
import SearchInputField from './UIelems/SearchInputField';
import ViewToggle from './UIelems/ViewToggle';
import ErrorButton from './UIelems/ErrorButton';


// holds the load timeout of the items
let asyncLoad;

export default function Search() {
    let [searchField, setSearchField] = useState({
        searchText: ''
    });

    let [items, setItems] = useState({
        totalResults: -1,
        totalPages: 0,
        currentPage: 1,
        movieList: []
    });

    let [loadState, setLoadState] = useState('');

    let [view, setView] = useState('row');

    // update the items list with a 1s delay
    useEffect(() => {
        setItems({...items, currentPage: 1})
        if(asyncLoad) {
            clearTimeout(asyncLoad);
        }
        asyncLoad = setTimeout(updItems, 1000);
    }, [searchField]);

    useEffect(() => {
        if (window.outerWidth < 768) {
            setView('grid');
        }
    }, []);


    // loading and errors
    let result;
    if (loadState === 'error') {
        result = <ErrorButton color="danger" btnText='retry' message='An error occurred while connecting to server' onBtnClick={updItems} />
    } else if (loadState === 'loading') {
        result = <Loading visible={true} />
    } else {
        result = <MovieItems view={view} movieList={items.movieList} notfound={items.totalResults === 0 ? true : false} resultsNumber={items.totalResults} />
    }


    return (
        <div className="search">

            <SearchInputField value={searchField.searchText} onChange={handleSearch} />

            {/* toggle the movie items view */}
                <ViewToggle view={view} onChange={(switchView) => setView(switchView)} />
            
            {result}

            {items.totalResults > 10 && items.totalPages > 1 && items.currentPage !== items.totalPages ? <button onClick={() => {
                setItems({...items, currentPage: items.currentPage += 1})
                updItems(true);
            }} className='btn btn-lg bg-black text-center d-block mx-auto load-more' disabled={loadState === 'loading' || loadState === 'newpage' ? true : false} >
                {loadState === 'loading' || loadState === 'newpage' ? 'Loading' : 'Load More'}
            </button> : ''
            }
        </div>
    );

    function updItems(nextPage) {
        if (searchField.searchText !== '') {
            // show the loading animation and set the loading state
            if (nextPage) {
                setLoadState('nextpage');
            } else {
                setLoadState('loading');
            }

        const searchQuery = searchField.searchText.split(' ').join('%20');
        
        let URI = `${APIsettings.url}&s=${searchQuery}&i=&page=${items.currentPage}`;
        console.log(URI)
        
        // fetch the movie items from the API
        axios.get(URI)
        .then(response => {
            setLoadState('')
            const totalPages = response.data.totalPages;
            const totalResults = response.data.totalResults;
            const results = response.data.Search;
            console.log(response.data)
            console.log(response)
            
        // load more movie items on load more button click
        if (nextPage) {
            let movieResults = [...items.movieList];

            for (let item of results) {
               movieResults.push(item);
            }
            setItems({...items, movieList: movieResults});

        } else if (!results) {
            setItems({...items, totalResults: 0});
        } else {
        setItems({...items, totalResults: totalResults, totalPages: totalResults / 10, movieList: results});
     }
            
        }).catch(error => {
            setLoadState('error');
            console.log(error);
        })

    } else {     
        setItems({
            totalResults: -1,
            totalPages: 0,
            currentPage: 1,
            movieList: []
        });
     }
  }

  // handle the search input
  function handleSearch(text) {
      setSearchField({...searchField, searchText: text});
  }

}
