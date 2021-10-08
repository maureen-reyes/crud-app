import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then(res => {
          if(!res.ok) {
            throw Error('could not fetch the data');
          }
          return res.json();
        })
        .then(data => {
          if(data){
            setData(data);
          }
          setLoading(false);
          setError(null);
        })
        .catch(err => {
          if(err.name === 'AbortError') {
            console.log('fetch aborted');
          }
          else{
            setLoading(false);
            setError(err.message);
          }
        })
    }, 500);
    return () => abortCont.abort();
  }, [url]);
  return { data, isLoading, error }
}

export default useFetch
