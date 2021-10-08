import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="container max-w-xl mt-8 mx-auto text-center">
      <h1 className="text-5xl">Page Not Found</h1>
      <p className="mt-8"><Link to="/">Back to Homepage</Link></p>
    </div>
  )
}

export default NotFound