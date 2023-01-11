import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { fetchUsersAsync, selectUsers } from "./usersSlice";

const Users = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <div>
      {users && users.length ?
       users.map((user) => (
        <ul
        className="allUsers"
        key={`All Users: ${user.id}`}>
          <li>
            {[user.email]}
          </li>
        </ul>
       )): console.log('---NO Users---', null)
    }
    </div>
  )
};

export default Users;