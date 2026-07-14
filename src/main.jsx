import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import "bootstrap/dist/css/bootstrap.min.css";


// Fuente utilizada en la pagina 

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
})


createRoot(document.getElementById('root')).render(

  <StrictMode>

    <ChakraProvider theme ={theme}>

      <App />

    </ChakraProvider>

  </StrictMode>,

)