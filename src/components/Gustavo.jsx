/*
======================================================================================================
TheMoovieLazer -
Archivo: Gustavo.jsx
Proposito: Componente de perfil de autor que muestra la imagen y enlace al portafolio de 
           GitHub de Gustavo Correia, integrado con soporte para modos de color (light/dark).
======================================================================================================
*/


import { Box, IconButton, Tooltip, Image, useColorMode } from "@chakra-ui/react"; // Importación de componentes de diseño y feedback visual de Chakra UI


const Gustavo = () => {

  // Hook para detectar el modo de color actual y ajustar el estilo visual del botón

  const { colorMode } = useColorMode();
  

  return (

    // Contenedor 

    <Box display="flex" justifyContent="center" py={4}>
      
    {/* Tooltip con información del autor al hacer hover */}

    <Tooltip label="Elaborado por: Gustavo Correia" hasArrow>
        
    {/* Botón interactivo que redirige al perfil de GitHub */}

    <IconButton
              as="a"
              href="https://github.com/Tavo172003"
              target="_blank"
              aria-label="Autor"
              variant="ghost" 
              boxSize="50px" 
              borderRadius="full"
              ml={{ base: 0, md: 4 }}

    // Ajuste de color de fondo dinámico basado en el modo de color del sistema

    bg={colorMode === "light" ? "gray.200" : "gray.700"}
    _hover={{
    transform: "scale(1.1)",
    bg: colorMode === "light" ? "gray.300" : "gray.600",

    }}
          
    transition="all 0.3s ease"
    icon={

            // Imagen de perfil del autor redimensionada y con estilo circular

    <Image 
          src="/GustavoC.jpg"
          alt="Gustavo Correia"
          boxSize="40px" 
          borderRadius="full"
          objectFit="cover"


                  />

              }
          />

        </Tooltip>

    </Box>

  );

};

export default Gustavo;