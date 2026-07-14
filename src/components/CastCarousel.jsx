/*
======================================================================================================

TheMoovieLazer -
Archivo: CastCarousel.jsx
Proposito: Componente reutilizable para mostrar el reparto de una producción en formato carrusel 
           horizontal con scroll automático y navegación manual.

======================================================================================================
*/

import { useRef, useEffect } from 'react'; // Hook que permite la interaccion entre componentes
import { Box, Heading, Text, Flex, Image, IconButton } from '@chakra-ui/react'; // Importación de componentes de diseño y feedback visual de Chakra UI
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'; // Importación de iconos y feedback visual de Chakra UI

const CastCarousel = ({ cast }) => {

  // Referencia al contenedor de elementos para manipular el scroll mediante DOM

  const scrollContainerRef = useRef(null);

  // Validación: si no hay reparto, no renderizamos el componente

  if (!cast || cast.length === 0) return null;

  // Determina si se deben mostrar flechas según la cantidad de elementos

  const showArrows = cast.length > 5;

  // Función para mover el scroll manualmente (izquierda/derecha)

  const scroll = (direction) => {
  
  if (scrollContainerRef.current) {
  const scrollAmount = 300;
  scrollContainerRef.current.scrollBy({ 
  left: direction === 'left' ? -scrollAmount : scrollAmount, 
  behavior: 'smooth' 

      });

    }

  };

  // Efecto para gestionar el auto-scroll y los eventos de interacción (pausa al pasar mouse/touch)

  useEffect(() => {

  const container = scrollContainerRef.current;
  if (!container || !showArrows) return;

  let intervalId;

  // Lógica para deslizar automáticamente el carrusel

  const startAutoScroll = () => {

  intervalId = setInterval(() => {
  
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  if (container.scrollLeft >= maxScrollLeft - 5) {
  container.scrollTo({ left: 0, behavior: 'smooth' }); // Reinicia al inicio si llega al final
  } 
  
  else {
  container.scrollBy({ left: 200, behavior: 'smooth' });
        }

      }, 3500);

    };


  const stopAutoScroll = () => {
  if (intervalId) clearInterval(intervalId);
  };

  startAutoScroll();

  // Eventos para pausar el auto-scroll durante la interacción del usuario

  container.addEventListener('mouseenter', stopAutoScroll);
  container.addEventListener('mouseleave', startAutoScroll);
  container.addEventListener('touchstart', stopAutoScroll);
  container.addEventListener('touchend', startAutoScroll);


  return () => {

  stopAutoScroll();
  container.removeEventListener('mouseenter', stopAutoScroll);
  container.removeEventListener('mouseleave', startAutoScroll);
  container.removeEventListener('touchstart', stopAutoScroll);
  container.removeEventListener('touchend', startAutoScroll);

    };

  }, [cast, showArrows]);


  return (

    // Contenedor principal de la sección de actores con margen vertical y ancho completo 

    <Box my={10} w="100%">
    <Heading size="lg" mb={6} textAlign="center">Reparto Principal</Heading>
      
    {/* Contenedor principal del carrusel */}
    
    <Flex align="center" justify="center" w="100%" gap={2}>
        
    {/* Botón de navegación izquierda */}
        
    {showArrows && (
      
      <IconButton 
                aria-label="Anterior" 
                icon={<ChevronLeftIcon />} 
                onClick={() => scroll('left')} 
                size="sm" 
                isRound 
                flexShrink={0} 
                display={{ base: "none", md: "inline-flex" }}
          />

        )}

        {/* Contenedor con scroll horizontal oculto */}

        <Flex 
            ref={scrollContainerRef}
            overflowX="auto" 
            w="100%" 
            maxW="900px" 
            py={4} 
            gap={6} 
            alignItems="flex-start"
            justifyContent={showArrows ? "flex-start" : "center"}
            css={{ 
            '&::-webkit-scrollbar': { display: 'none' }, // Oculta la scroll-bar
            scrollSnapType: 'x mandatory'

          }}
        >

        {/* Mapeo de actores */}

        {cast.map((actor) => (
        
        <Box 
            key={actor.id} 
            textAlign="center"
            minW="150px" 
            flexShrink={0}
            css={{ scrollSnapAlign: 'start' }}
            _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s ease' }}
            transition="transform 0.3s ease"

            >
        
        {/* Renderizado de la imagen del actor con validación de ruta y fallback a imagen predeterminada */}

        <Image 
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://placehold.co/200x300?text=Sin+foto'} 
              alt={actor.name} 
              borderRadius="md" 
              mb={2} 
              mx="auto" 
              boxSize="140px" 
              objectFit="cover" 
              shadow="sm"

              />

          {/* Texto que muestra el nombre del actor, con estilo negrita y truncado a una sola línea si es muy largo */}

          <Text fontWeight="bold" fontSize="sm" noOfLines={1}>{actor.name}</Text>
          </Box>

          ))}
          
        </Flex>

        {/* Botón de navegación derecha */}

        {showArrows && (
          <IconButton 
                    aria-label="Siguiente" 
                    icon={<ChevronRightIcon />} 
                    onClick={() => scroll('right')} 
                    size="sm" 
                    isRound 
                    flexShrink={0} 
                    display={{ base: "none", md: "inline-flex" }}
          />

        )}

      </Flex>

    </Box>

  );

};

export default CastCarousel;