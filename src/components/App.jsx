import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';
import { SharedLayout } from "./SharedLayout/SharedLayout";

const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));
const Home = lazy(() => import('components/Home/Home'));
const MovieDetails = lazy(() => import('components/MovieDetails/MovieDetails'));
const Movies = lazy(() => import('components/Movies/Movies'));


export const App = () => {
  return (
    
          
    <Routes>
    <Route path="/" element={<SharedLayout />}>
      <Route index element={<Home />} />
      <Route path="/movies" element={<Movies />} />

      <Route path="movies/:movieId" element={<MovieDetails />}>
        <Route path="cast" element={<Cast/>} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
      <Route path="*" element={<Home />} />
    </Route>
  </Routes>
  );
};