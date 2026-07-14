/*
======================================================================================================
TheMoovieLazer -
archivo: Summary.jsx
Proposito: Vista detallada de una película. Gestiona la obtención de 
           datos desde múltiples endpoints de la API (detalles, créditos, videos y proveedores) 
           y presenta la información con un diseño responsivo y efectos visuales.
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


const Summary = () => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Obtención de parámetros de la URL (tipo de medio e ID) y hook para navegación

  const { mediaType: urlMediaType, id } = useParams();
  const navigate = useNavigate();
  
  // Estado para almacenar la información completa del recurso y control de carga

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Valor por defecto en caso de no especificarse el tipo en la ruta

  const mediaType = urlMediaType || 'movie';

  useEffect(() => {
    if (!id) return;

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
    const baseUrl = `https://api.themoviedb.org/3/${mediaType}/${id}`;
    
    // Ejecución paralela de peticiones para obtener toda la información necesaria simultáneamente

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
      console.error("Error al cargar detalles:", err);
      setLoading(false);
    });
  }, [id, mediaType]);

  // Indicador visual de carga

  if (loading) return (

    <Flex w="100%" minH="100vh" align="center" justify="center">
    <Spinner size="xl" color="black" thickness="4px" />
    </Flex>

  );

  if (!data) return <Text>No se pudo cargar la información.</Text>;

  // Desestructuración de datos procesados

  const { details, credits, videos, providers } = data;
  
  // Lógica para encontrar el primer tráiler disponible en YouTube

  const trailer = videos?.find(v => v.type === "Trailer" && v.site === "YouTube");

  // Formateo de títulos y fechas de las peliculas 

  const title = details?.title || details?.name;
  const releaseDate = details?.release_date || details?.first_air_date;
  const releaseYear = releaseDate ? releaseDate.split('-')[0] : null;

  // Construcción de rutas para imágenes (poster y fondo)

  const posterUrl = details?.poster_path 
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}` 
    : 'https://placehold.co/500x750?text=Sin+portada';

  const backdropUrl = details?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : '';

  
  return (
     
     // Contenedor principal con efecto de fondo desenfocado (Backdrop)  
  
    <Box 
        w="100%" 
        minH="100vh" 
        bgImage={backdropUrl ? `url(${backdropUrl})` : 'none'} 
        bgPosition="center" 
        bgRepeat="no-repeat" 
        bgSize="cover" 
        bgAttachment="fixed"
        position="relative"
      
    >

      { /*Capa de superposición para mejorar la legibilidad del texto */ }  
      
      <Box 
          position="absolute" 
          top={0} 
          left={0} 
          w="100%" 
          h="100%" 
          bg="linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.95) 100%)" 
          _dark={{ bg: "linear-gradient(to bottom, rgba(26, 32, 44, 0.9) 30%, rgba(26, 32, 44, 0.95) 100%)" }} 
          backdropFilter="blur(6px)"
          zIndex={1}
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
      <ChakraImage src={posterUrl} alt={title} borderRadius="xl" shadow="2xl"/>
      </Box>

      { /* Mostrar el año en el que se estreno la pelicula */ }

      <Box flex="1" color="gray.800" _dark={{ color: "white" }}>
      <Heading size="xl" mb={2}>{title} {releaseYear && `(${releaseYear})`}</Heading>
              

      {/* Seccion para enseñar la calificacion de la pelicula y el genero correspondiente */}

      <Stack direction="row" spacing={2} mb={4} flexWrap="wrap" rowGap={2}>
      {details?.vote_average && (
      <Badge colorScheme="yellow" px={2} py={0.5} borderRadius="md">⭐ {details.vote_average.toFixed(1)}</Badge>
      )}
      {details?.genres?.map(genre => (
      <Badge key={genre.id} colorScheme="purple" variant="solid" px={2} py={0.5} borderRadius="md">{genre.name}</Badge>
      ))}
      </Stack>

      {/* Texto para enseñar que no hay descripcion de la pelicula disponible */}

      <Text fontSize="lg" lineHeight="tall" textAlign="justify">{details?.overview || "No hay descripción disponible."}</Text>
      </Box>
      </Flex>
      
      {/* Linea que se encarga de separar la portada del reparto de la pelicula*/}

      <Divider borderColor="black" _dark={{ borderColor: "white" }} opacity={0.2} my={6} />

      {/* Componente externo para mostrar el reparto */}

      <CastCarousel cast={credits?.cast?.slice(0, 15)} />

      {/* Linea que se encarga de separar el reparto de la seccion Donde ver la pelicula (solo si existe en la API) */}
      
      <Divider borderColor="black" _dark={{ borderColor: "white" }} opacity={0.2} my={8} />

      {/* Sección de disponibilidad en plataformas de Streaming */}
      
      <Box mb={10}><Streaming providers={providers} /></Box>
          
      {/* Renderizado condicional del tráiler (solo si existe en la API) */}
      
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

export default Summary;