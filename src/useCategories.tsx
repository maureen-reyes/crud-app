import { useState, useEffect } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/categories')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setCategories(data);
    })
    .catch(err => {
      console.log(err.message);
    })
  }, [])

  return {categories}
}

export default useCategories
