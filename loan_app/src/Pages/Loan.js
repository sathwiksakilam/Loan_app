import React, { useEffect,useState } from 'react'
import NavBar from '../components/InsideNav'
import LoanContent from '../components/LoanContent'
import TableContent from '../components/TableContent'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Loan = () => {
  const Navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { currentUser, loading, error} = useSelector((state) => state.user);
  useEffect(()=>{
    if(!currentUser)
    {
      Navigate("/login");
    }
    else if(error)
    {
      setShowError(true);
    }
  },[currentUser,error])
  return (
    <>
    <NavBar></NavBar>
    <LoanContent></LoanContent>
    <TableContent ></TableContent>
  </>
  )
}

export default Loan