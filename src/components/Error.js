import React from 'react'

const Error = ({mensaje}) => {
    return ( 
        <p className="my-3 text-center text-white alert alert-danger">{mensaje}</p>
     );
}
 
export default Error;