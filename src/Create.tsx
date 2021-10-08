import { useState } from "react";
import useCategories from "./useCategories";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";

const Create = () => {
  const { categories } = useCategories();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Developer');
  const [status, setStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const user = { name, description, category, status };

    if(name !== '' && description !== ''){
      setLoading(true);

      fetch('http://localhost:8000/users',{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })
      .then(() => {
        setLoading(false);
        setName('');
        setDescription('');
        setCategory('Developer');
        setStatus(false);
        history.push('/');
        toast.success("A new user was added!");
      })
    }
  }

  return (
    <div className="container max-w-xl mt-8 mx-auto">
      <h2 className="text-3xl">Add a New User</h2>
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
          <select className="h-10 focus:bg-white border border-gray-200 w-8/12 float-right" onChange={(e) => setCategory(e.target.value)}>
            {categories && categories.map((categ) => {
              return (
                <option key={categ['id']} value={categ['name']}>{categ && categ['name']}</option>
              )
            })}
          </select>
        </div>

        <div className="mt-4 w-full inline-block">
          <label className="w-3/12">Status</label>
          <button className={status && (status === true) ? 'bg-green-400 text-white p-2 w-8/12 float-right' : 'bg-red-400 text-white p-2 w-8/12 float-right' } onClick={() => setStatus(!status)}>{status && (status === true) ? 'active' : 'inactive' }</button>
        </div>

        <div className="mt-8">
          { !isLoading && <button onClick={handleSubmit} className="bg-blue-400 text-white p-2">Add user</button> }
          { isLoading && <button>Adding user...</button> }
        </div>
      </form>
    </div>
  )
}

export default Create