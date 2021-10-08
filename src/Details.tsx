import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type DetailsProps = {
  id: string,
}

const Details = (props: DetailsProps) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams<DetailsProps>();
  
  const history = useHistory();

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch('http://localhost:8000/users/' + id, { signal: abortCont.signal })
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
  }, [id]);

  const handleDelete = () => {
    fetch('http://localhost:8000/users/' + id, {
      method: 'DELETE'
    })
    .then(() => {
      history.push('/');
      toast.success("Successfully deleted!");
    })
  }

  if(isLoading) {
    return <div className="text-center mt-12">Loading...</div>
  }

  return (
    <div className="container max-w-xl mt-8 px-8 mx-auto">
      { error && <div>{ error }</div>}
      <h1 className="text-3xl">{data && data['name']}</h1>
      <p className="mt-4"><span className="font-medium">Description:</span> {data && data['description']}</p>
      <p className="mt-4"><span className="font-medium">Category:</span> {data && data['category']}</p>
      <p className="mt-4"><span className="font-medium">Status:</span> {data && data['status'] === true ? 'active' : 'inactive'}</p>
      <div className="mt-4 inline-flex">
        <button onClick={handleDelete} className="bg-red-400 text-white p-2">Delete</button>
        <div className="bg-green-400 text-white p-2 ml-4"><Link to={`/update/${data && data['id']}`}>Edit</Link></div>
      </div>
    </div>
  )
}

export default Details