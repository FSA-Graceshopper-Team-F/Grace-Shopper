import React from 'react'
import { Link } from 'react-router-dom'

export const UserProfile = () => {
  return (
    <div>UserProfile
        <Link to="/myOrders"><button>View Order History</button></Link>
    </div>
  )
}
