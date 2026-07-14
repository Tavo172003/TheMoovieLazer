/*
======================================================================================================
TheMoovieLazer -
Archivo: PropertyCard.jsx
Proposito: Componente visual de tarjeta que renderiza la portada de una película o serie, 
           gestionando la navegación a su página de detalle al hacer clic.
======================================================================================================
*/

import { Box, Image } from '@chakra-ui/react';  // Importación de componentes de diseño y feedback visual de Chakra UI
import { useNavigate } from 'react-router-dom'; // Hook que permite la interaccion de los componentes

const PropertyCard = ({ movie, mediaType }) => {

const navigate = useNavigate();
  
// Construcción de la URL de la imagen utilizando la API de TMDB

const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

// Determinación del tipo de medio (película o serie) para la correcta navegación
 
const type = movie.media_type || mediaType || 'movie';

  return (

      <Box 
          position="relative"
          w="100%"
          borderRadius="xl" 
          overflow="hidden"
          boxShadow="md"
          cursor="pointer"
      
      // Acción de clic para navegar a la ruta específica del detalle del contenido

      onClick={() => {

        const path = `/${type}/${movie.id}`;
        console.log("Navegando a:", path);
        navigate(path);

      }} 
      
      // Efectos visuales al pasar el cursor (interactividad)

      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "2xl"

      }}

      transition="all 0.3s ease"

    >
      <Image
            src={posterUrl}
            alt={movie.title || movie.name}
            w="100%"
            h="100%"
            objectFit="cover"
            // Imagen de respaldo en caso de que el póster no esté disponible en la API
            fallbackSrc="https://via.placeholder.com/500x750?text=Sin+Portada"

          />

      </Box>

    );

  };

export default PropertyCard;