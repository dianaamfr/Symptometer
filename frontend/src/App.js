import React, {useEffect, useState} from 'react';

function App(){

  const [backendData,setBackendData] = useState([{}])

  useEffect(() =>{
    const requestOptions = {
        headers: { 'Content-type': 'application/x-www-form-urlencoded',
                    Accept: 'application/sparql-results+json'},
    };
    fetch("http://localhost:3030/#/dataset/ds/query/", requestOptions).then(
      response => {
        console.log(response)
        response.json()
      }
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return(
    <div>

    </div>
  )
}

export default App
