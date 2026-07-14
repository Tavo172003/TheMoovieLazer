/*
======================================================================================================
TheMoovieLazer -
Archivo: Pagination.jsx
Proposito: Componente de navegación paginada que permite al usuario desplazarse entre los 
           resultados, incluyendo una lógica de truncado con elipses (...) para mejorar la 
           usabilidad en listados extensos.
======================================================================================================
*/

import { ButtonGroup, IconButton, Button, HStack, useBreakpointValue } from "@chakra-ui/react"; // Importación de componentes de diseño y feedback visual de Chakra UI
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"; // Importación de iconos y feedback visual de Chakra UI

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Lógica para calcular qué números de página mostrar y dónde insertar los separadores "..."
  const getPageNumbers = () => {

  const delta = isMobile ? 1 : 2; // Cantidad de páginas visibles a los lados de la página actual
  const range = [];
  const rangeWithDots = [];
  let l;

  // Generar rango inicial de números de página

  for (let i = 1; i <= totalPages; i = i + 1) {

      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {

        range.push(i);

      }

    }

  // Insertar elipses donde sea necesario

  for (let i of range) {

      if (l) {

      if (i - l === 2) {

          rangeWithDots.push(l + 1);

        } 
        
  else if (i - l !== 1) {

          rangeWithDots.push("...");

        }

      }

      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;

  };

  return (

    <HStack justify="center" mt={8} mb={4} spacing={1}>

    <ButtonGroup variant="outline" size={{ base: "xs", md: "sm" }} isAttached>
        
    {/* Botón para navegar a la página anterior */}


        <IconButton
                  aria-label="Anterior"
                  icon={<LuChevronLeft />}
                  disabled={currentPage === 1}
                  onClick={() => onPageChange(currentPage - 1)}

        />

    {/* Mapeo y renderizado de los números de página */}

    {getPageNumbers().map((page, index) => {

    // Renderizado de separadores (elipses)

    if (page === "...") {
      
      return (

              <Button key={index} variant="outline" disabled cursor="default">
                ...
              </Button>
            );

          }

    // Renderizado de botones numéricos con estado visual activo

    const isSelected = page === currentPage;
      
    return (

            <Button
                    key={index}
                    onClick={() => onPageChange(page)}
                    variant={isSelected ? "solid" : "outline"}
                    colorScheme={isSelected ? "blue" : "gray"}
            >

              {page}

            </Button>

          );

      })}

    
    {/* Botón para navegar a la página siguiente */}

          <IconButton
                     aria-label="Siguiente"
                     icon={<LuChevronRight />}
                     disabled={currentPage === totalPages}
                     onClick={() => onPageChange(currentPage + 1)}

          />

          </ButtonGroup>

      </HStack>

    );

};

export default Pagination;