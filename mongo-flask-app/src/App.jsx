import { useState } from 'react'
import './App.css'

const App = () => {
  const [data, setData] = useState([])

  const [fields, setFields] = useState({
    value: "",
    select: "name"
  })

  const handleGetAllUsers = async () => {
    const response = await fetch("http://localhost:5000/")
    const data = await response.json()
    setData(data)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFields(prevFields => {
      return {
        ...prevFields,
        [name]: value,
      }
    })
  }

  const handleGet = async () => {
    if (fields.value.trim()) {
      const response = await fetch(`http://localhost:5000/find-by/${fields.select}/${fields.value}`)
      const data = await response.json()
      setData(data)
    }
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Basic MongoDB Example with Flask</span>
        </div>
      </nav>
      <main id="main">
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleGetAllUsers}>Get Users</button>
          <input type="text" placeholder={`Enter ${fields.select}...`} value={fields.value} name="value" onChange={handleChange} />
          <select value={fields.select} onChange={handleChange} name="select">
            <option value={"name"}>Name</option>
            <option value={"address"}>Address</option>
            <option value={"email"}>Email</option>
          </select>
          <button className="btn btn-primary" onClick={handleGet}>Search</button>
        </div>
        {
          data.map(datum => {
            return (
              <div className="card" key={datum._id.$oid}>
                <div className="card-header">
                  Valued Customer
                </div>
                <div className="card-body">
                  <h5 className="card-title">{datum.name}</h5>
                  <p className="card-text">{datum.email}</p>
                  <p>Addresses:</p>
                  <ul>
                    {datum.addresses.map(address => {
                      return (
                        <li key={`${datum._id.$oid}-${address}`}>{address}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })
        }
      </main>
    </>
  )
}

export default App
