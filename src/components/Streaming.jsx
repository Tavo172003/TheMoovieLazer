/*
======================================================================================================
TheMoovieLazer -
Archivo: Streaming.jsx
Proposito: Componente visual que despliega las plataformas de streaming, alquiler y compra donde
           está disponible un contenido, incluyendo scroll horizontal animado y automático.
======================================================================================================
*/

import { useRef, useEffect } from 'react';
import { Box, Heading, Text, Flex, Image, VStack, Badge, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Streaming = ({ providers }) => {

// Normalización de datos: combina las categorías de la API (flatrate, rent, buy) en un solo arreglo

const allProviders = [
    ...(providers?.flatrate?.map(p => ({ ...p, type: 'Streaming' })) || []),
    ...(providers?.rent?.map(p => ({ ...p, type: 'Alquiler' })) || []),
    ...(providers?.buy?.map(p => ({ ...p, type: 'Compra' })) || [])
  ];

const scrollContainerRef = useRef(null);

// No renderizar si no hay proveedores disponibles

if (allProviders.length === 0) return null;

const showArrows = allProviders.length > 3;

  // Lógica para el scroll manual mediante botones

const scroll = (direction) => {

  if (scrollContainerRef.current) {
      const scrollAmount = 300; 
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // Efecto para gestionar el auto-scroll (desplazamiento automático) y eventos de usuario

useEffect(() => {

  const container = scrollContainerRef.current;
  if (!container || !showArrows) return;

  let intervalId;

  const startAutoScroll = () => {

    intervalId = setInterval(() => {

        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        // Si llega al final, reinicia al inicio; de lo contrario, avanza

        if (container.scrollLeft >= maxScrollLeft - 5) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 140, behavior: 'smooth' });
        }
      }, 3000);
    };

    const stopAutoScroll = () => {
      if (intervalId) clearInterval(intervalId);
    };

    startAutoScroll();

    // Eventos para pausar el auto-scroll al interactuar (hover o touch)

    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);
    container.addEventListener('touchstart', stopAutoScroll);
    container.addEventListener('touchend', startAutoScroll);

    return () => {
      stopAutoScroll();

      container.removeEventListener('mouseenter', stopAutoScroll);
      container.removeEventListener('mouseleave', startAutoScroll);
      container.removeEventListener('touchstart', stopAutoScroll);
      container.removeEventListener('touchend', stopAutoScroll);

    };
  }, [allProviders, showArrows]);

  return (
    
      <Box py={6} w="100%">
      <Heading size="lg" mb={8} textAlign="center">¿Dónde ver?</Heading>
      
      <Flex align="center" justify="center" w="100%" gap={2}>

        {showArrows && (

          <IconButton aria-label="Anterior" icon={<ChevronLeftIcon />} onClick={() => scroll('left')} size="sm" isRound flexShrink={0} display={{ base: "none", md: "inline-flex" }} />
        
        )}

        {/* Contenedor principal con scroll horizontal y comportamiento snap */}

        <Flex 
            ref={scrollContainerRef}
            overflowX="auto" 
            w="100%" 
            maxW={{ base: "280px", sm: "480px", md: "600px", lg: "800px" }} 
            py={2} 
            gap={6} 
            alignItems="flex-start"
            justifyContent={showArrows ? "flex-start" : "center"}
            css={{ 
            '&::-webkit-scrollbar': { display: 'none' }, // Ocultar barra de scroll nativa
            scrollSnapType: 'x mandatory'
          }}

        >

          {allProviders.map((p, index) => (

          <VStack 
                key={`${p.provider_id}-${index}`} 
                spacing={2} 
                minW="80px" 
                flexShrink={0}
                css={{ scrollSnapAlign: 'start' }}

            >

            {/* Badge indicando el tipo de servicio (Streaming, Alquiler o Compra) */}

            <Badge 
                  colorScheme={p.type === 'Streaming' ? 'green' : p.type === 'Alquiler' ? 'orange' : 'purple'} 
                  fontSize="8px" borderRadius="full" px={2}

              >

            {p.type}

            </Badge>
              
            {/* Logo de la plataforma */}

              <Image 
                    src={`https://image.tmdb.org/t/p/w185${p.logo_path}`} 
                    alt={p.provider_name}
                    borderRadius="xl"
                    boxSize="110px"
                    shadow="md"
                    objectFit="cover"
                    bg="white"
                    p={0.5}
                    sx={{ imageRendering: '-webkit-optimize-contrast' }}

              />

              <Text fontSize="10px" textAlign="center" w="80px" isTruncated fontWeight="medium">

                {p.provider_name}

                    </Text>

            </VStack>

          ))}

        </Flex>

        {showArrows && (

        <IconButton aria-label="Siguiente" icon={<ChevronRightIcon />} onClick={() => scroll('right')} size="sm" isRound flexShrink={0} display={{ base: "none", md: "inline-flex" }} />

              )}

        </Flex>

      </Box>
  );
  
};

export default Streaming;