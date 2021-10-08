import { useState } from "react"
import { Link } from "react-router-dom"

type ListProps = {
  users: {
    name: string
    description: string
    category: string
    status: boolean
    id: number
  }[]
}

const List = (props: ListProps) => {

  const [selectedUser, setSelectedUser] = useState<Array<number>>([]);

  const handleSelect = (e: any) => {
    const isChecked = e.target.checked;
    const id = e.target.value;
    if (isChecked) {
      setSelectedUser([
        ...selectedUser,
        id
      ]);
    }
    else {
      const filteredArray = selectedUser.filter(item => item !== e.target.value);
      setSelectedUser(filteredArray);
    }
  }

  const handleDelete = () => {
    selectedUser.forEach(id => {
      fetch(`http://localhost:8000/users/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        window.location.reload()
      })
    });
  }

  return (
    <div className="container max-w-xl my-8 mx-auto">
      {props.users.map(user => {
        return (
          <div className="w-full mt-4 inline-flex" key={user.id}>
            <div className="w-1/12 bg-blue-100 flex items-center">
              <input
                className="mx-auto"
                type="checkbox"
                name="selectedIds"
                value={user.id}
                onChange={e => handleSelect(e)}
              />
            </div>
            <div className="bg-blue-50 w-11/12 p-4">
              <Link to={`/users/${user.id}`}>
                <h2 className="text-2xl font-medium">{user.name}</h2>
              </Link>
              <p>{user.description}</p>
              <p>{user.status === true ? 'active' : 'inactive'}</p>
            </div>
          </div>
        )
      })}
      <button onClick={handleDelete} className="bg-red-400 text-white p-2 mt-8">Bulk delete</button>
    </div>
  )
}

export default List