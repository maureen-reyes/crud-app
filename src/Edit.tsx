import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useCategories from "./useCategories";
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type DetailsProps = {
  id: string,
}

const Edit = () => {
  const { id } = useParams<DetailsProps>();
  
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { categories } = useCategories();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/users/' + id)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setLoading(false);
        setUser(data);
        setName(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setStatus(data.status);
      })
      .catch(err => {
        console.log(err.message);
      })
    }, 500);
  }, [id])

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const userData = { name, description, category, status };

    setLoading(true);

    fetch('http://localhost:8000/users/'+ id,{
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    .then(() => {
      setLoading(false);
      history.push(`/users/${id}`);
      toast.success("Successfully edited!");
    })
  }

  return (
    <div className="container max-w-xl mt-8 px-8 mx-auto">
      <h2 className="text-3xl">Edit User</h2>
      {user &&
      <form onSubmit={e => e.preventDefault()}>
        <div className="mt-4 w-full inline-block">
          <label className="w-3/12">Name</label>
          <input
            className="h-10 focus:bg-white border border-gray-200 w-8/12 float-right"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-4 w-full inline-block">
          <label className="w-3/12">Description</label>
          <textarea
            className="h-16 focus:bg-white border border-gray-200 w-8/12 float-right"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
        </div>
        <div className="mt-4 w-full inline-block">
          <label className="w-3/12">Category</label>
          <select className="h-10 focus:bg-white border border-gray-200 w-8/12 float-right" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories && categories.map((categ) => {
              return (
                <option key={categ['id']} value={categ['name']}>{categ && categ['name']}</option>
              )
            })}
          </select>
        </div>
        <div className="mt-4 w-full inline-block">
          <label className="w-3/12">Status:</label>
          <button className={status && (status === true) ? 'bg-green-400 text-white p-2 w-8/12 float-right' : 'bg-red-400 text-white p-2 w-8/12 float-right' } onClick={() => setStatus(!status)}>{status && (status === true) ? 'active' : 'inactive' }</button>
        </div>
        
        <div className="mt-8">
          { !isLoading && <button onClick={handleSubmit} className="bg-blue-400 text-white p-2 mt-8">Update user</button> }
          <button className="bg-yellow-400 text-white p-2 mt-8 ml-4">
            <Link to={`/users/${id}`}>Cancel</Link>
          </button>
          { isLoading && <button>Updating user...</button> }
        </div>
      </form>
      }
    </div>
  )
}

export default Edit
