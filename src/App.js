import React, { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import ListadoImg from './components/ListadoImg'


function App() {
  const [ busqueda, guardarBusqueda ] = useState('')
  const [ img, guardarImg ] = useState([])
  const [ paginaactual, guardarPaginaActual ] = useState(1)
  const [ totalpaginas, guardarTotalPaginas ] = useState(1)

  useEffect(()=>{
    const consultarApi = async () => {
      if(busqueda === '') return;
      const imagenesPorPagina = 30;
      const key = '23522013-8b79195b486dcb08b18f6a649';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImg(resultado.hits)

      // calcular cantidad de paginas
      const calcularTotalPag = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPag)
      // mover pagina hasta arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }
    consultarApi()
  }, [busqueda,paginaactual])

  // definir pagina Anterior
  const paginaAnterior = () => {
    const nuevaPagActual = paginaactual - 1;
    if(nuevaPagActual === 0) return;
    guardarPaginaActual(nuevaPagActual)
  }
  // definir pagina Siguiente
  const paginaSiguiente = () => {
    const nuevaPagActual = paginaactual + 1;
    if(nuevaPagActual > totalpaginas ) return;
    guardarPaginaActual(nuevaPagActual)
  }

  return (
    <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Formulario
          guardarBusqueda={guardarBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <ListadoImg
          img={img}
          />
        <div>
          {(paginaactual === 1) ? null : (
            <button
            type="button"
            className="btn btn-info mr-1" 
            onClick={paginaAnterior}
            >&laquo; Anterior
            </button>
          )}
          {(paginaactual === totalpaginas) ? null : (
            <button 
            type="button" 
            className="btn btn-info" 
            onClick={paginaSiguiente}>
              Siguiente &raquo;
            </button>
          )}
        </div>
          
        </div>
    </div> 
  );
}

export default App;
