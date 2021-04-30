import { useState, useEffect } from 'react';
import EditClass from './EditClass';
import styled from 'styled-components';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { baseURL } from '../../utils/baseURL';
import 'intro.js/introjs.css';
import introJs from 'intro.js';

const StyledDiv = styled.div`
  margin: 1%;
  padding:1%;
  border: 2px solid black;
  width: 20%;
`;

export default function InstructorClass(props) {
    const { c, classes, setClasses, instructor } = props //c is class
    const [isEditing, setIsEditing] = useState(false)

    //DELETE CLASS
    const deleteClass = () => {
      axiosWithAuth().delete(`${baseURL}/classes/class/${c.classid}`)
        .then(res => {
          setClasses([ //cl is each class
            ...classes.filter(cl => cl.classid !== res.data)
          ])
        })
        .catch(err => console.log(err))
    }
    
    const checkForOnboarding = async () => {
      if(window.localStorage.getItem('id_first')){
          return
      } else {introJs().setOptions({
          steps: [
              {element: document.querySelector('.edit-btn'), intro: 'Here you can edit your class or delete if you need.'}
          ]
        }).start()
        //INSTRUCTOR NO LONGER HAS ACCESS TO ONBOARDING
        await window.localStorage.setItem('id_first', 69)
        }

    } 
    useEffect(() => {
        checkForOnboarding()
    }, [])

    return (
      <StyledDiv>
        <div className='class-container' >
            <h3>{c.name}</h3>
            <p>Type: {c.type}</p>
            <p>Duration: {c.duration} minutes</p>
            <p>Where: {c.location}</p>
            <p>When: {c.date} @ {c.starttime}</p>
            {isEditing ? null : <button className='edit-btn' onClick={() => setIsEditing(true)}>edit</button>}
        </div>
        <div>
            {isEditing && <EditClass c={c} setIsEditing={setIsEditing} classes={classes} setClasses={setClasses} deleteClass={deleteClass} instructor={instructor}/>}
        </div>
      </StyledDiv>
    )
}