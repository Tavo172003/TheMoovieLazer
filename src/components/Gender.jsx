/*
======================================================================================================
TheMoovieLazer -
Archivo: Gender.jsx
Proposito: Componente de selector (menú desplegable) que obtiene y lista los géneros disponibles 
           (películas o series) desde la API de TMDB, permitiendo filtrar contenidos por categoría.
======================================================================================================
*/

import { useEffect, useState } from "react"; // Hook para almacenar y actualizar datos 

import { 
  Button, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Spinner,
  Flex,
  useColorMode 
} from "@chakra-ui/react"; // Importación de componentes de diseño y feedback visual de Chakra UI


import { LuChevronDown } from "react-icons/lu"; // Iconos de la libreria LuChevronDown 


const Gender = ({ onGenresChange, mediaType = 'movie', size = 'sm' }) => {

  // Estados para gestionar la lista de géneros, carga y la selección actual del usuario

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenreName, setSelectedGenreName] = useState("Género");
  const { colorMode } = useColorMode();

  // Efecto para limpiar el filtro seleccionado al cambiar entre películas y series

  useEffect(() => {
  setSelectedGenreName("Género");
  onGenresChange("");
  }, [mediaType]);

  // Efecto para consultar a la API de TMDB los géneros correspondientes al mediaType seleccionado

  useEffect(() => {

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  setLoading(true);
  fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${API_KEY}&language=es-ES`)
  .then((res) => res.json())
  .then((data) => {
  setGenres(data.genres || []);
  setLoading(false);

  })

  .catch((err) => {
  console.error("Error al cargar géneros:", err);
  setLoading(false);
  });

  }, [mediaType]);

  // Manejador para actualizar el texto del botón y notificar al componente padre el cambio de género
  const handleSelectGenre = (id, name) => {
    setSelectedGenreName(name);
    onGenresChange(id ? id.toString() : "");
  };

  return (

    <Menu>

      {/* Botón que muestra el género seleccionado actualmente */}

      <MenuButton 
                as={Button} 
                rightIcon={<LuChevronDown />}
                size={size}
                borderRadius="full"
                px={size === 'xs' ? 3 : 4}
                bg={colorMode === "light" ? "black" : "white"}
                color={colorMode === "light" ? "white" : "black"}

      >

      {selectedGenreName}

      </MenuButton>

      {/* Lista desplegable con los géneros disponibles */}

      <MenuList maxH="300px" overflowY="auto">

      {/* Opción para restablecer el filtro a "Todos" */}

      <MenuItem 
              onClick={() => handleSelectGenre("", "Género")}
              fontWeight={selectedGenreName === "Género" ? "bold" : "normal"}

        >

        Todos
        </MenuItem>

        {/* Indicador de carga mientras se obtienen los datos de la API */}

        {loading ? (
        <Flex justify="center" p={4}><Spinner size="xs" /></Flex>
        ) : (
          genres.map(({ id, name }) => (
            <MenuItem 
                    key={id} 
                    onClick={() => handleSelectGenre(id, name)}
                    fontWeight={selectedGenreName === name ? "bold" : "normal"}
            >
              {name}

            </MenuItem>

          ))

        )}

      </MenuList>

    </Menu>

  );
  
};

export default Gender;