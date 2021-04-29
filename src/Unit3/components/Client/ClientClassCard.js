import { useState } from 'react'
import styled from 'styled-components'
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { baseURL } from '../../utils/baseURL';

const background1 = '#282F56'
const background2 = '#2A2F4A'


//RESERVE STATE DOES NOT PERSIST WITH DB.
export default function ClientClassCard(props){
  const [isReserved, setIsReserved] = useState(false);
  const {c} = props

  const handleReserve = () => {
    setIsReserved(true)
    axiosWithAuth().patch(`${baseURL}/classes/class/${c.classid}/addclient/`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const handleCancelReserve = () => {
    setIsReserved(false)
    axiosWithAuth().patch(`${baseURL}/classes/class/${c.classid}/removeclient/`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <DivMain color={props.color}>
      <DivContent>
        <h3>{c.name}</h3>
        <p><b>{c.type}</b></p>
        <p>Intensity Level: {c.intensitylevel}</p>
        <p>Instructor: {c.instructor.username}</p>
        <p>Spots Available: {c.maxsize - c.numregisteredattendees}</p>
        <p>Where: {c.location}</p>
        <p>Duration: {c.duration} minutes</p>
        <p>When: {c.date} @ {c.starttime}</p>
        {!isReserved && <button onClick={handleReserve}>Reserve a Spot!</button>}
        {isReserved && <h3 style={{color:'red'}}>RESERVED!</h3>}
        {isReserved && <button onClick={handleCancelReserve}>Cancel Reservation</button>}
      </DivContent>
    </DivMain>
  )
}
const DivMain = styled.div`
  background: ${props => props.color === 0 ? background1 : background2};
  display: flex;
  padding: 10px;
  width: 80%;
  * {
    margin: 0;
    font-size: initial;
  }
  p {
    margin-top: 0.5em;
  }
  
  h6 span {
    color: #0D58DA;
    color: #3d84ff;
  }
  
  h6 span:hover {
    cursor: pointer;
  }
`

const DivContent = styled.div`
  flex-grow: 1;
`