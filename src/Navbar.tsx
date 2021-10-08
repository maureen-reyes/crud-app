import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex px-8 h-16 items-center border-b border-solid border-gray-300">
      <div className="">
        <Link to="/">Users</Link>
      </div>
      <div className="bg-blue-500 text-white p-4 w-32 absolute right-8">
        <Link to="/create">New record</Link>
      </div>
    </div>
  )
}

export default Navbar