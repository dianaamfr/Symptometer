import React, {useEffect, useState} from 'react';

function App(){
  const backendUrl = "http://localhost:8000";
  const [backendData,setBackendData] = useState([{}])

  useEffect(() =>{
    const requestOptions = {
      method: 'GET',
      headers: { 
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    fetch(backendUrl, requestOptions,
    ).then(response => {
      return response.json()
      }
    ).then(
      data => {
        console.log(data.results);
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
