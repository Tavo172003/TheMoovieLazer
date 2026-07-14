/*
======================================================================================================
TheMoovieLazer -
Archivo: MediaTypeToggle.jsx
Proposito: Componente de selección (toggle) que permite al usuario alternar entre la visualización 
           de Películas y Series, actualizando el estado global del tipo de contenido a consultar.
======================================================================================================
*/

import { Button, ButtonGroup, Flex } from '@chakra-ui/react'; // Componentes Importados de la libreria Chakra UI

const Series = ({ mediaType, setMediaType }) => {

  return (

    <Flex justify="center" my={6}>

      {/* Grupo de botones para alternar el tipo de media */}

      <ButtonGroup size="md" isAttached variant="outline">
        
      {/* Botón selector para Películas */}

        <Button
               colorScheme={mediaType === 'movie' ? 'teal' : 'gray'}
               variant={mediaType === 'movie' ? 'solid' : 'outline'}
               onClick={() => setMediaType('movie')}

        >
          Películas
          </Button>
        
        {/* Botón selector para Series */}

        <Button
               colorScheme={mediaType === 'tv' ? 'teal' : 'gray'}
               variant={mediaType === 'tv' ? 'solid' : 'outline'}
               onClick={() => setMediaType('tv')}

        >
          Series
          </Button>

        </ButtonGroup>

    </Flex>

  );
  
};

export default Series;