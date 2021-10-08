import { useEffect, useState } from "react";
import List from "./List";
import useFetch from "./useFetch";

const Home = () => {
  const { data: users, isLoading, error } = useFetch('http://localhost:8000/users');

  const [status, setStatus] = useState('all');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchData, setSearchData] = useState('');

  const handleSearch = () => {
    fetch(`http://localhost:8000/users?q=${searchData}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setSearchData('');
      setFilteredUsers(data);
    })
  }

  useEffect(() => {
    switch (status) {
      case 'active':
        setFilteredUsers(users.filter((users) => users['status'] === true))
        break
      case 'inactive':
        setFilteredUsers(users.filter((users) => users['status'] === false))
        break
      default:
        setFilteredUsers(users)
        break
    }
  },[status, users]);

  if(isLoading) {
    return <div className="text-center mt-12">Loading...</div>
  }

  return (
    <div className="md:container mx-auto px-8">
      <form onSubmit={e => e.preventDefault()} className="mt-8">
        <label>Search:</label>
        <div className="inline-flex ml-16">
          <input
            className="h-10 focus:bg-white border border-gray-200"
            type="text"
            required
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <button onClick={handleSearch} className="border-t border-r border-b border-gray-200 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      <div className="mt-4">
        <label>Sort by status:</label>
        <select onChange={(e) => setStatus(e.target.value)} className="h-10 border border-gray-200 ml-4">
          <option value="all">All</option>
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
      </div>
      
      {error && <div className="text-center text-red-500">{error}</div>}
      {!error && filteredUsers &&
        <List users={filteredUsers} />
      }      
    </div>
  )
}

export default Home