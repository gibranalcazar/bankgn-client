import React, {useContext} from 'react';
/* import { UserContext } from '../App'; */
import { UserContext } from './context';
import Table from 'react-bootstrap/Table';

export default function AllData() { 
  const {useState, useEffect} = React;
  const {data, setData} = useContext(UserContext);
  const [alldata, setAlldata] = React.useState([]);

/*   console.log(process.env.REACT_APP_SERVER_URL);
  console.log(process.env.REACT_APP_VARIABLE); */

useEffect(()=>{
  /* let url = process.env.REACT_APP_API_URL + 'account/all';
  console.log(url); */
  //let url = `https://bankgnserver.onrender.com/account/all`
  //let url = `http://localhost:4000/account/all`;
  let url = process.env.REACT_APP_API_URL + '/account/all'; //server

  console.log('loading from server... ')
  console.log('URL: ', url);
  fetch(url)
  .then(res => res.json())
  .then(data2 => {
    console.log(data2)
    setAlldata(data2);
  });
}, []);
  
  /* let nameList = data.users.map((item, index)=>{ */
    let nameList = alldata.map((item, index)=>{
    
    return(
      <tr key={index}>
        <td >{item.name}</td>
        <td >{item.email}</td>
        <td >{item.password}</td>
        <td >${item.balance}</td>
      </tr>
    );
  });

    return (
      <div className='container content'>
        <h1>User Database</h1>
        {/* <div>{JSON.stringify(data.users)}</div> */}
        {/* <h3>User logged: {JSON.stringify(data.userLogged)}</h3> */}
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>Password</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {nameList}
          </tbody>
        </Table>
      </div>
    );
  }