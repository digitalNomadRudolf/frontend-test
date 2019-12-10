import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import FadeAnims from './components/FadeAnims';
import MovieDetails from './components/DetailsPage/MovieDetails';


function MainContent() {
    const homeImage = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80";
    return (
        <div className="main-content" style={{ background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.93)), url(${homeImage}) no-repeat fixed center`, 
                                               height: "100%", 
                                               minHeight: "100vh",
                                               backgroundSize: "cover",
                                               backgroundAttachment: "fixed"}}>
            <Header />

            <div className="container">
                <div className="pt-5 pb-5">
                    <Switch>
                        <Route path="/search" component={FadeAnims(Search)} />
                        <Redirect exact from="/" to="/search" />
                        <Route exact path="/movies/:id" component={MovieDetails} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default MainContent;