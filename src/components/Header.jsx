/*
======================================================================================================
TheMoovieLazer -
Archivo: Header.jsx
Proposito: Componente de cabecera principal de la aplicación, encargado de mostrar la identidad 
           visual, integrar la navegación entre secciones y gestionar el cambio de temas 
           (light/dark) de la interfaz.
======================================================================================================
*/

import { useState, useRef, useEffect } from 'react'; // React Hooks para gestionar estados y efectos
import {  // Componentes Importados de la libreria Chakra UI
  Flex,
  Box,
  HStack,
  useColorMode,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  Collapse,
  Divider,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom"; // UseNavigate para la navegacion de la pagina
import { LuChevronDown, LuSlidersHorizontal } from "react-icons/lu"; // Iconos de la libreria Lu
import { FaFilm, FaTv } from "react-icons/fa"; // Iconos de la libreria FA
import SearchBar from "./SearchBar"; // Componete de la SearchBar 
import Gustavo from "./Gustavo"; // Componente de Derechos de autor 
import Gender from "./Gender";  // Componente para filtrar el genero de las peliculas o series 

const Navbar = ({ 
  currentFilter, 
  onFilterChange, 
  onGenresChange, 
  mediaType, 
  onMediaTypeChange 
}) => { 

  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const [showHeader, setShowHeader] = useState(true);
  const [showOptions, setShowOptions] = useState(false); // Panel de opciones móvil
  const lastScrollYRef = useRef(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!isMobile) {
      setShowHeader(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      // Umbral pequeño para evitar parpadeos con scrolls mínimos
      if (Math.abs(currentScrollY - lastScrollY) < 15) {
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Desplazamiento hacia abajo: ocultar header
        setShowHeader(false);
      } else {
        // Desplazamiento hacia arriba: mostrar header
        setShowHeader(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const getFilterLabel = (filter) => {

    switch (filter) {
      case "now_playing": return "Estrenos";
      case "revenue": return "Más Taquilleras";
      default: return "Tendencias";

    }
  };

  return (

    <Box
      as="nav"
      bg={colorMode === "light" ? "white" : "gray.900"}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.100" : "gray.800"}
      w="100%"
      transform={isMobile && !showHeader ? "translateY(-100%)" : "translateY(0)"}
      transition="transform 0.3s ease-in-out, background-color 0.3s ease, border-color 0.3s ease"
    >

      {/* ── FILA PRINCIPAL: siempre visible ── */}
      <Flex
        px={{ base: 3, md: 4 }}
        py={{ base: 2, md: 3 }}
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: 2, md: 3 }}
      >
        {/* LOGO + TÍTULO */}
        <HStack spacing={1} cursor="pointer" flexShrink={0} onClick={() => { onFilterChange('top_rated'); navigate("/"); setShowOptions(false); }}>
          <Image src={colorMode === "light" ? "/OscarYellow.svg" : "/OscarWhite.svg"} alt="Logo" boxSize={{ base: "28px", md: "36px" }} objectFit="contain" />
          <Box fontWeight="bold" fontSize={{ base: "sm", md: "md", lg: "xl" }} whiteSpace="nowrap" display={{ base: "none", md: "block" }}>The Movie Lazer</Box>
        </HStack>

        {/* DERECHOS DE AUTOR — solo en desktop */}
        <Box display={{ base: "none", md: "flex" }}>
          <Gustavo />
        </Box>

        {/* SEARCHBAR — crece en el centro */}
        <Flex flex="1" align="center">
          <SearchBar />
        </Flex>

        {/* CONTROLES DESKTOP: filtros + modo oscuro */}
        <Flex display={{ base: "none", md: "flex" }} alignItems="center" gap={3}>

          {/* SELECTOR DE TIPO */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<LuChevronDown />}
              size="sm"
              borderRadius="full"
              px={4}
              bg={colorMode === "light" ? "black" : "white"}
              color={colorMode === "light" ? "white" : "black"}
            >
              {mediaType === 'movie' ? 'Películas' : 'Series'}
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaFilm />} onClick={() => onMediaTypeChange('movie')}>Películas</MenuItem>
              <MenuItem icon={<FaTv />} onClick={() => onMediaTypeChange('tv')}>Series</MenuItem>
            </MenuList>
          </Menu>

          {/* GÉNERO */}
          <Gender onGenresChange={onGenresChange} mediaType={mediaType} />

          {/* TENDENCIAS */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<LuChevronDown />}
              size="sm"
              borderRadius="full"
              px={4}
              bg={colorMode === "light" ? "black" : "white"}
              color={colorMode === "light" ? "white" : "black"}
            >
              {getFilterLabel(currentFilter)}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => { onFilterChange('top_rated'); navigate("/"); }}>Tendencias</MenuItem>
              <MenuItem onClick={() => { onFilterChange('now_playing'); navigate("/"); }}>Estrenos</MenuItem>
              <MenuItem onClick={() => { onFilterChange('revenue'); navigate("/"); }}>Más Taquilleras</MenuItem>
            </MenuList>
          </Menu>

          {/* MODO OSCURO (desktop) */}
          <IconButton onClick={toggleColorMode} size="sm" variant="ghost">
            <Image src={colorMode === "light" ? "/SwitchOFF.svg" : "/SwitchON.svg"} boxSize="40px" />
          </IconButton>

        </Flex>

        {/* BOTÓN DE OPCIONES — solo móvil */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Opciones"
          icon={<LuSlidersHorizontal />}
          size="sm"
          variant="ghost"
          flexShrink={0}
          color={showOptions
            ? (colorMode === "light" ? "black" : "white")
            : (colorMode === "light" ? "gray.500" : "gray.400")
          }
          bg={showOptions
            ? (colorMode === "light" ? "gray.100" : "gray.700")
            : "transparent"
          }
          borderRadius="full"
          onClick={() => setShowOptions(prev => !prev)}
          transition="all 0.2s ease"
          transform={showOptions ? "rotate(90deg)" : "rotate(0deg)"}
        />

      </Flex>

      {/* ── PANEL DE OPCIONES MÓVIL: colapsa/expande con animación ── */}
      <Collapse in={showOptions} animateOpacity>
        <Box display={{ base: "block", md: "none" }}>
          <Divider borderColor={colorMode === "light" ? "gray.100" : "gray.700"} />
          <Flex
            px={3}
            py={2}
            gap={2}
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >

            {/* SELECTOR DE TIPO */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<LuChevronDown />}
                size="xs"
                borderRadius="full"
                px={3}
                bg={colorMode === "light" ? "black" : "white"}
                color={colorMode === "light" ? "white" : "black"}
              >
                {mediaType === 'movie' ? 'Películas' : 'Series'}
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FaFilm />} onClick={() => { onMediaTypeChange('movie'); setShowOptions(false); }}>Películas</MenuItem>
                <MenuItem icon={<FaTv />} onClick={() => { onMediaTypeChange('tv'); setShowOptions(false); }}>Series</MenuItem>
              </MenuList>
            </Menu>

            {/* GÉNERO */}
            <Gender onGenresChange={onGenresChange} mediaType={mediaType} size="xs" />

            {/* TENDENCIAS */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<LuChevronDown />}
                size="xs"
                borderRadius="full"
                px={3}
                bg={colorMode === "light" ? "black" : "white"}
                color={colorMode === "light" ? "white" : "black"}
              >
                {getFilterLabel(currentFilter)}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => { onFilterChange('top_rated'); navigate("/"); setShowOptions(false); }}>Tendencias</MenuItem>
                <MenuItem onClick={() => { onFilterChange('now_playing'); navigate("/"); setShowOptions(false); }}>Estrenos</MenuItem>
                <MenuItem onClick={() => { onFilterChange('revenue'); navigate("/"); setShowOptions(false); }}>Más Taquilleras</MenuItem>
              </MenuList>
            </Menu>

            {/* MODO OSCURO (dentro del panel de opciones) */}
            <IconButton
              onClick={() => { toggleColorMode(); }}
              size="xs"
              variant="ghost"
              aria-label="Cambiar tema"
            >
              <Image src={colorMode === "light" ? "/SwitchOFF.svg" : "/SwitchON.svg"} boxSize="28px" />
            </IconButton>

          </Flex>
        </Box>
      </Collapse>

    </Box>

  );

};

export default Navbar;