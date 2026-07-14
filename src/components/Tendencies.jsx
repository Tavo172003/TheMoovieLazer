/*
======================================================================================================
TheMoovieLazer -
Archivo: Tendencies.jsx
Proposito: Componente de menú desplegable para la selección de filtros de ordenamiento y 
           categorización de películas (estrenos, taquilla, popularidad), con soporte para 
           temas claro/oscuro.
======================================================================================================
*/

import { 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Button, 
  Text,
  Box,
  useColorMode 
} from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";

const Tendencies = ({ currentFilter, onFilterChange }) => {

const { colorMode } = useColorMode();
  
// Función auxiliar para retornar la etiqueta de texto amigable según el filtro activo

const getFilterLabel = (filter) => {

  switch (filter) {
  case 'now_playing':
  return 'Últimos Estrenos';
  case 'revenue':
  return 'Más Taquilleras';
  case 'top_rated':
  return 'Mejor Clasificadas';
  case 'upcoming':
  return 'Próximos Estrenos';
  default:
  return 'Filtrar Películas';

      }
  };

  return (

    <Menu>
      {({ isOpen }) => (
        <>

          {/* Botón que despliega las opciones de filtrado */}

          <MenuButton 

            as={Button} 
            rightIcon={
            
            <Box
                display="inline-flex"
                alignItems="center"

                // Animación de rotación del icono según el estado del menú

                transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                transition="transform 0.2s ease"

              >

                <LuChevronDown />

              </Box>

            } 

              size="sm"
              borderRadius="full"
              fontSize="sm"
              px={4}
              bg={colorMode === "light" ? "black" : "white"}
              color={colorMode === "light" ? "white" : "black"}
              _hover={{
              bg: colorMode === "light" ? "gray.800" : "gray.200",
              transform: "translateY(-1px)"

            }}

              _active={{
              bg: colorMode === "light" ? "gray.900" : "gray.300",
              transform: "translateY(0)"

            }}

            transition="all 0.2s"

          >

          {getFilterLabel(currentFilter)}
          </MenuButton>
          
          {/* Lista de opciones de filtrado con scroll oculto */}

          <MenuList 
                  maxH="300px" 
                  overflowY="auto" 
                  zIndex={15} 
                  bg={colorMode === "light" ? "white" : "gray.800"}
                  css={{
                  '&::-webkit-scrollbar': { display: 'none' },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
              }}

          >

          <Text fontSize="xs" fontWeight="bold" py={2} textAlign="center" color="gray.500">
          Filtros disponibles
          </Text>

          {/* Opciones de filtrado */}

        <MenuItem 
                onClick={() => onFilterChange('now_playing')}
                justifyContent="center" 
                display="flex"
                fontSize="sm"
                fontWeight={currentFilter === 'now_playing' ? 'bold' : 'normal'}
                bg={currentFilter === 'now_playing' ? (colorMode === "light" ? "gray.100" : "gray.700") : "transparent"}
               _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
            >

            Últimos Estrenos
            </MenuItem>
            
        <MenuItem 
                onClick={() => onFilterChange('upcoming')}
                justifyContent="center" 
                display="flex"
                fontSize="sm"
                fontWeight={currentFilter === 'upcoming' ? 'bold' : 'normal'}
                bg={currentFilter === 'upcoming' ? (colorMode === "light" ? "gray.100" : "gray.700") : "transparent"}
                _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
           
           >
              Próximos Estrenos
            </MenuItem>

        <MenuItem 
                onClick={() => onFilterChange('revenue')}
                justifyContent="center" 
                display="flex"
                fontSize="sm"
                fontWeight={currentFilter === 'revenue' ? 'bold' : 'normal'}
                bg={currentFilter === 'revenue' ? (colorMode === "light" ? "gray.100" : "gray.700") : "transparent"}
                _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
            >
              
              Películas Más Taquilleras
              </MenuItem>
            
            <MenuItem 
              onClick={() => onFilterChange('top_rated')}
              justifyContent="center" 
              display="flex"
              fontSize="sm"
              fontWeight={currentFilter === 'top_rated' ? 'bold' : 'normal'}
              bg={currentFilter === 'top_rated' ? (colorMode === "light" ? "gray.100" : "gray.700") : "transparent"}
              _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
            >
              Mejor Clasificadas
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default Tendencies;