import React from 'react'
import Img from './Img'

const ListadoImg = ({img}) => {
    return ( 
        <div className="col-12 p-5 row">
            {img.map(imagen => (
                <Img
                key={imagen.id}
                imagen={imagen}
                />
            ))}
        </div>
     );
}
 
export default ListadoImg;