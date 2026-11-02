import { useState, useEffect } from 'react'
// fetching api data from github and displaying the user profile images in the app
export default function App() {
  const [users, setUsers] = useState([])/*empty user array create ho raha hai yaha pe*/

  useEffect(() => {/*mainly ye api fetch karne ke liye use kiya jata hai, basically useEffect ek bar chalta hai yadi [] array,mein change nahi ho yadi hum changing value or data daal de to ye phir se rerender kar dega app function ko */
    async function getData() {
      const response = await fetch('https://api.github.com/users?per_page=30')
      const data = await response.json()
      setUsers(data)
    }

    getData()
  }, [])/*useeffct ekbar chalta hai yadi [] array,mein change nahi ho yadi hum changing value or data daal de to ye phir se rerender kar dega app function ko */

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap',gap: '5px', justifyContent: 'center' }}>
      {
        users.map((user) => {
        return <img  src={user.avatar_url} alt={user.login} height="100px" width="100px" borderRadius="10px"/>
})
      }
    </div>
  )
}
