
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Componente que se encarga de mostrar las peliculas y series 
import Summary from './components/Summary'; // Componente para la descripcion de las peliculas 
import SeriesSummary from './components/SeriesSummary'; // Componente para la descripcion de las series 
import Header from './components/Header'; //Header de la pagina 


function App() {
  const [filter, setFilter] = useState('top_rated');
  const [genres, setGenres] = useState('');
  const [mediaType, setMediaType] = useState('movie'); 
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setResetPageTrigger((prev) => prev + 1);
  };

  const handleGenresChange = (newGenres) => {
    setGenres(newGenres);
    setResetPageTrigger((prev) => prev + 1);
  };

  const handleMediaTypeChange = (newType) => {
    setMediaType(newType);
    setResetPageTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <Header
        currentFilter={filter} 
        onFilterChange={handleFilterChange} 
        onGenresChange={handleGenresChange}
        mediaType={mediaType}
        onMediaTypeChange={handleMediaTypeChange}
      />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              filter={filter} 
              genres={genres} 
              mediaType={mediaType} 
              resetPageTrigger={resetPageTrigger} 
            />
          } 
        />
        
        {/* Rutas diferenciadas para cada tipo de contenido */}

        <Route path="/movie/:id" element={<Summary />} />
        <Route path="/tv/:id" element={<SeriesSummary />} />
        
      </Routes>
    </Router>
  );
}

export default App;