/*
======================================================================================================
TheMoovieLazer -
archivo: SeriesSummary.jsx
Proposito: Vista detallada de una serie. Gestiona la obtención de 
           datos desde múltiples endpoints de la API y presenta la información 
           con un diseño responsivo y efectos visuales.
======================================================================================================
*/

import { 
Box, Heading, Text, Spinner, Container, Button, Flex, Badge, Stack, Image as ChakraImage, Divider, AspectRatio, useColorMode, IconButton, useBreakpointValue 
} from '@chakra-ui/react'; // Importación de componentes de diseño y feedback visual de Chakra UI

import { useEffect, useState } from 'react'; // Hook para almacenar y actualizar datos 
import { useParams, useNavigate } from 'react-router-dom'; // Hook que permite la interaccion de los componentes
import { LuArrowLeft } from 'react-icons/lu'; // Importacion de icono de retroceso
import Streaming from './Streaming'; // Componente encargo de mostrar las plataformas Streaming
import CastCarousel from './CastCarousel'; // Componente encargo de mostrar el Carousel del reparto y Streaming
 

const SeriesSummary = () => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Obtención del ID de la serie desde la URL y configuración de navegación

  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados para datos de la serie y control de carga

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const baseUrl = `https://api.themoviedb.org/3/tv/${id}`;
    
    // Peticiones paralelas para obtener detalles, elenco, videos y plataformas de streaming

  Promise.all([
      fetch(`${baseUrl}?api_key=${API_KEY}&language=es-MX`).then(res => res.json()),
      fetch(`${baseUrl}/credits?api_key=${API_KEY}&language=es-MX`).then(res => res.json()),
      fetch(`${baseUrl}/videos?api_key=${API_KEY}&language=es-MX`).then(res => res.json()),
      fetch(`${baseUrl}/watch/providers?api_key=${API_KEY}`).then(res => res.json())
  ])

  .then(([details, credits, videos, providers]) => {
      setData({ 
      details, 
      credits, 
      videos: videos.results || [],
      providers: providers.results?.MX || {} 

      });
      setLoading(false);
    })
    .catch(err => {
      console.error("Error al cargar serie:", err);
      setLoading(false);
    });
  }, [id]);


  // Pantalla de carga mientras se obtienen los datos de la API

  if (loading) return (
    <Flex w="100%" minH="100vh" align="center" justify="center">
      <Spinner size="xl" thickness="4px" />
    </Flex>
  );

  // Desestructuración y procesamiento de variables para la vista

  const { details, credits, videos, providers } = data;
  const trailer = videos?.find(v => v.type === "Trailer" && v.site === "YouTube");
  
  const title = details?.name;
  const releaseYear = details?.first_air_date ? details.first_air_date.split('-')[0] : null;
  const posterUrl = details?.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+portada';
  const backdropUrl = details?.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : '';

  return (

    // Contenedor principal con fondo dinámico e imagen de fondo

    <Box 
     w="100%" minH="100vh" 
     bgImage={backdropUrl ? `url(${backdropUrl})` : 'none'} 
     bgPosition="center" bgRepeat="no-repeat" bgSize="cover" bgAttachment="fixed"
     position="relative" textAlign="justify"

    >

      {/* Capa de contraste para mejorar legibilidad sobre la imagen de fondo */}

      <Box 
      position="absolute" top={0} left={0} w="100%" h="100%" 
      bg="linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.95) 100%)" 
      _dark={{ bg: "linear-gradient(to bottom, rgba(26, 32, 44, 0.9) 30%, rgba(26, 32, 44, 0.95) 100%)" }} 
      backdropFilter="blur(6px)" zIndex={1}

      />

      { /* Boton para regresar al catalogo principal del componente Home */ }

      <Box position="relative" zIndex={2} w="100%" py={10}>
      <Container maxW="container.lg">
      {/* Botón responsivo: circular en móvil, con texto en desktop */}
      {isMobile ? (
        <IconButton
          aria-label="Volver al catálogo"
          icon={<LuArrowLeft />}
          onClick={() => navigate('/')}
          mb={6}
          bg={colorMode === "light" ? "black" : "white"}
          color={colorMode === "light" ? "white" : "black"}
          borderRadius="full"
          size="md"
          shadow="md"
          position="static"
          zIndex={3}
          transition="all 0.3s ease"
          _hover={{
            bg: colorMode === "light" ? "gray.800" : "gray.200",
            shadow: "lg",
            transform: "scale(1.1)"
          }}
        />
      ) : (
        <Button
          leftIcon={<LuArrowLeft className="back-arrow" />}
          onClick={() => navigate('/')}
          mb={0}
          bg={colorMode === "light" ? "black" : "white"}
          color={colorMode === "light" ? "white" : "black"}
          borderRadius="full"
          px={6}
          shadow="md"
          position="absolute"
          top={6}
          left={6}
          zIndex={3}
          transition="all 0.3s ease"
          _hover={{
            bg: colorMode === "light" ? "gray.800" : "gray.200",
            shadow: "lg",
            transform: "translateY(-2px)",
            "& .back-arrow": {
              transform: "translateX(-4px)"
            }
          }}
          sx={{
            "& .back-arrow": {
              transition: "transform 0.2s ease"
            }
          }}
        >
          Volver al catálogo
        </Button>
      )}
          
      {/* Layout principal: Póster y descripción */}

      <Flex direction={{ base: "column", md: "row" }} gap={12} align={{ base: "center", md: "start" }} mb={10}>
      <Box flexShrink={0} maxW={{ base: "280px", md: "300px" }} w="100%">
      <ChakraImage src={posterUrl} alt={title} borderRadius="xl" shadow="2xl" />
      </Box>

      { /* Mostrar el año en el que se estreno la serie */ }

      <Box flex="1" color="gray.800" _dark={{ color: "white" }}>
      <Heading size="xl" mb={2}>{title} {releaseYear && `(${releaseYear})`}</Heading>


      {/* Seccion para enseñar la calificacion de la serie y el genero correspondiente */}

      <Stack direction="row" spacing={2} mb={4} flexWrap="wrap">
      {details?.vote_average && <Badge colorScheme="yellow" px={2} borderRadius="md">⭐ {details.vote_average.toFixed(1)}</Badge>}
      {details?.genres?.map(g => <Badge key={g.id} colorScheme="purple" variant="solid" px={2} borderRadius="md">{g.name}</Badge>)}
      </Stack>

      {/* Texto para enseñar que no hay descripcion de la serie disponible */}

      <Text fontSize="lg" lineHeight="tall">{details?.overview || "Sin descripción."}</Text>
      </Box>
      </Flex>

      {/* Linea que se encarga de separar la portada del reparto de la serie */}

      <Divider borderColor="black" _dark={{ borderColor: "white" }} opacity={0.2} my={8} />

      {/* Carrusel de reparto */}

      <CastCarousel cast={credits?.cast?.slice(0, 15)} />

      {/* Linea que se encarga de separar el reparto de la seccion Donde ver la serie (solo si existe en la API) */}
      
      <Divider borderColor="black" _dark={{ borderColor: "white" }} opacity={0.2} my={8} />

       {/* Sección de disponibilidad en plataformas de Streaming */}

      <Box mb={10}><Streaming providers={providers} /></Box>

          {/* Renderizado opcional del tráiler */}

        {trailer && (
            <>
              <Divider borderColor="black" _dark={{ borderColor: "white" }} opacity={0.2} my={8} />
              <Box mb={10}>
              <Heading size="lg" mb={6} textAlign="center">Tráiler</Heading>
              <AspectRatio ratio={16 / 9} w="100%" maxW="800px" mx="auto" borderRadius="lg" overflow="hidden" shadow="lg">
                <iframe 
                  src={`https://www.youtube.com/embed/${trailer.key}`} 
                  title="Tráiler" 
                  frameBorder="0" 
                  allowFullScreen 
                />
              </AspectRatio>

                   </Box>

                </>

              )}

            </Container>

          </Box>

      </Box>

  );

};

export default SeriesSummary;