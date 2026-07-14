/*
======================================================================================================
TheMoovieLazer -
Archivo: Home.jsx
Proposito: Pantalla de inicio dinámica para la visualización, filtrado y paginación de contenidos 
           multimedia mediante la API de TMDB.
======================================================================================================
*/

import { useEffect, useState } from 'react';
import { SimpleGrid, Container, Spinner, Center, Box, useColorModeValue } from '@chakra-ui/react';
import PropertyCard from './PropertyCard';
import Pagination from './Pagination';
import Gustavo from './Gustavo';

const Home = ({ filter, genres, resetPageTrigger, mediaType = 'movie' }) => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [missingApiKey, setMissingApiKey] = useState(false);

  // Definir color dinámico para el SVG: Teal en modo claro, Blanco en modo oscuro
  const iconColor = useColorModeValue("teal.500", "white");

  useEffect(() => {
    setPage(1);
  }, [resetPageTrigger, filter, genres, mediaType]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    
    // Validación de existencia de API Key
    if (!API_KEY) {
      setMissingApiKey(true);
      setLoading(false);
      return;
    }

    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
    let url = '';

    if (genres) {
      url = `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=es-MX&with_genres=${genres}&page=${page}`;
      if (filter === 'revenue') url += `&sort_by=revenue.desc`;
    } else {
      if (filter === 'revenue') {
        url = `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=es-MX&sort_by=revenue.desc&page=${page}`;
      } else if (filter === 'top_rated') {
        url = `${BASE_URL}/${mediaType}/top_rated?api_key=${API_KEY}&language=es-MX&page=${page}`;
      } else {
        url = `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=es-MX&page=${page}`;
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar datos:", err);
        setLoading(false);
      });
  }, [page, filter, genres, mediaType]);

  return (
    <Container maxW="container.xl" py={10}>
      
      {missingApiKey ? (

      <Center my={20} h="50vh">
        
      <Box p={8} shadow="lg" borderWidth="1px" borderRadius="lg" textAlign="center">
      
      {/* SVG local con ruta integrada */}

   {/* Contenedor centralizado para el icono */}
      <Center mb={4}>
       <Box 
            color={useColorModeValue("red.500", "white")} 
            display="flex" 
            justifyContent="center"
         >
        <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >

     
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>

    </svg>

  </Box>

</Center>

      <Box mb={4} fontWeight="bold" fontSize="lg">¡Configuración necesaria!</Box>
      <p style={{ marginBottom: '1rem' }}>No se ha encontrado una API Key válida para TMDB.</p>
      <Box as="a" href="https://www.themoviedb.org/?language=mx" target="_blank" color="red.500" fontWeight="semibold" textDecoration="underline">
      Obtén tu API Key aquí
      </Box>
      </Box>
      </Center>

    ) : loading ? (
        // SPINNER DE CARGA
        <Center my={20} h="50vh">
          <Spinner size="xl" color="teal.500" thickness="4px" />
        </Center>
      ) : (
        // GRID DE PELÍCULAS
        <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing={{ base: 3, md: 6 }}>
          {movies.map((item) => (
            <PropertyCard key={item.id} movie={item} mediaType={mediaType} />
          ))}
        </SimpleGrid>
      )}

      {/* PAGINACIÓN */}
      {!missingApiKey && !loading && movies.length > 0 && (
        <Box mt={12}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              setLoading(true);
              setPage(newPage);
            }}
          />
          <Box display={{ base: "flex", md: "none" }} justifyContent="center" mt={6} pb={4}>
            <Gustavo />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Home;