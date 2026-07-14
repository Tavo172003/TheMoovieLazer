/*
======================================================================================================
TheMoovieLazer -
Archivo: SearchBar.jsx
Proposito: Componente de búsqueda interactiva (tipo live-search) que consulta a la API de TMDB 
           para ofrecer sugerencias de películas y series en tiempo real, implementando 
           optimización de rendimiento mediante debounce y navegación directa al detalle seleccionado.
======================================================================================================
*/

import { useState, useRef, useEffect } from "react"; 
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Text,
  Image,
  useColorMode,
  Spinner,
  Flex,
  HStack,
  Badge,
} from "@chakra-ui/react"; // Importación de componentes de diseño y feedback visual de Chakra UI
import { useNavigate } from "react-router-dom"; 

const SearchBar = () => {

  // Estados locales para la consulta, resultados, visibilidad del menú y estado de carga
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  // Efecto para cerrar el menú de resultados si se hace clic fuera del contenedor

  useEffect(() => {

    const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
    setIsOpen(false);
    
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Efecto para realizar la búsqueda con debouncing al escribir

  useEffect(() => {

    // Manejo de estado vacío

    if (!query.trim()) {
    setResults([]);
    setSearching(false);
    return;

    }

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    setSearching(true);

    // Debounce: espera 400ms tras la última pulsación antes de ejecutar la petición

    const delayDebounceFn = setTimeout(async () => {

      try {

        const encodedQuery = encodeURIComponent(query);
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=es-MX&query=${encodedQuery}&page=1&include_adult=false`;
        
        const res = await fetch(url);
        const data = await res.json();

        if (data.results) {

          // Filtrado de resultados válidos y ordenamiento por popularidad

        const combined = data.results
        .filter((item) => (item.title || item.name) && item.id && (item.media_type === 'movie' || item.media_type === 'tv'))
        .sort((a, b) => b.popularity - a.popularity);
          
        setResults(combined.slice(0, 8)); // Limitamos a los 8 resultados más populares

        }

      } 
      
      catch (err) {
      console.error("Error al buscar:", err);
      } 
      finally {
      setSearching(false);
      }
    }, 400);

      return () => clearTimeout(delayDebounceFn);

  }, [query]);

  // Manejador de selección: redirige a la página del detalle y limpia el estado

  const handleSelect = (item) => {

    setQuery("");
    setResults([]);
    setIsOpen(false);
    navigate(`/${item.media_type}/${item.id}`);
    
  };

  return (

    // Contenedor principal con restricciones de tamaño y z-index para superposición

    <Box ref={containerRef} position="relative" width="100%" maxW="600px" zIndex="popover">
    
    <InputGroup size="md">
    <InputLeftElement pointerEvents="none" h="100%" pl={2}>
    
    {/* Cambia dinámicamente el icono según el tema (claro/oscuro) para garantizar contraste */}

          <Image
                src={colorMode === "light" ? "/SearchBlack.svg" : "/SearchWhite.svg"}
                alt="Buscar"
                boxSize="20px"

          />

        </InputLeftElement>
        
        {/* Barra de entrada de texto */}

          <Input
                type="text"
                placeholder="Buscar películas o series..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                onFocus={() => setIsOpen(true)}
                borderRadius="full"
                bg="transparent"
                borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                _focus={{
                borderColor: colorMode === "light" ? "black" : "white",
                boxShadow: colorMode === "light" ? "0 0 0 1px black" : "0 0 0 1px white",
            }}
        />

      </InputGroup>

      {/* Menú desplegable de resultados */}

      {isOpen && query.trim() && (
          <Box
              position="absolute"
              top="100%"
              left={0}
              right={0}
              mt={2}
              bg={colorMode === "light" ? "white" : "gray.800"}
              borderRadius="xl"
              boxShadow="lg"
              maxH="350px"
              overflowY="auto"

          css={{

            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",

          }}

        >

          {searching ? (

            <Flex p={4} justify="center"><Spinner size="sm" /></Flex>

          ) : results.length > 0 ? (

            <List>

            {results.map((item) => (
            <ListItem
                    key={`${item.media_type}-${item.id}`}
                    px={4}
                    py={2}
                    cursor="pointer"
                    _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
                    onClick={() => handleSelect(item)}

                >

            <HStack spacing={3}>
                
                <Image
                      src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : "/no-poster.png"}
                      w="40px" h="60px" objectFit="cover" borderRadius="md"

                    />
                    <Box>

                      <Text fontSize="sm" fontWeight="bold">{item.title || item.name}</Text>
                      <Badge 
                            bg={item.media_type === 'movie' ? "black" : "gray.600"} 
                            color="white" 
                            borderRadius="full"
                            px={2}
                            fontSize="xxs"

                      >
                              {item.media_type === 'movie' ? 'PELÍCULA' : 'SERIE'}

                                                  </Badge>
                                            </Box>
                                  </HStack>
                      </ListItem>
                   ))}
            </List>
      ) : (
            <Text p={4} fontSize="sm">No se encontraron resultados.</Text>

                 )}

            </Box>

          )}

      </Box>

  );

};

export default SearchBar;