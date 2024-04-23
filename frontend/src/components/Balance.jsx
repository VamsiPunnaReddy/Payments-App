import axios from "axios";
import { useEffect, useState } from "react"


export const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    console.log("balane")
    axios.get('http://localhost:3000/api/v1/account/balance', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(res => {
        setBalance(res.data.balance)
      })
  }, [])


  return (
    <h3 className="pt-6 text-3xl font-bold"> Your Balance &#8377;{balance.toFixed(2)} </h3>
  )
}