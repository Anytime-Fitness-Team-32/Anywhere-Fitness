import  FindClass  from './FindClass';

import { useEffect, useState } from 'react';
import 'intro.js/introjs.css';
import introJs from 'intro.js';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { baseURL } from '../../utils/baseURL';
import ClientClassCard from './ClientClassCard';



  
  export default function ClientDash(props){

    const [classes, setClasses] = useState();

    const checkForOnboarding = () => {
        if(window.localStorage.getItem('id_first')){
            return
        } else introJs().setOptions({
            steps: [
                {intro: "Welcome the Anywhere Fitness! Here you can browse and search for classes, and hopefully make a reservation."},
            ]
        }).start()
    } 
    useEffect(() => {
        checkForOnboarding()
    }, [])

    useEffect(() => {
    
        axiosWithAuth()
        .get(`${baseURL}/classes/classes`)
        .then( res => {
            console.log(res)
         setClasses(res.data)
          })
          .catch( err => {
              console.log(err)
          })
      }, [])


    return (<div style={{
      margin: '0 auto',
      maxWidth: '1100px',
      width: '90%',
    }}>
      This is ClientDash<br/>
      <FindClass classes = {classes} setClasses = {setClasses} />
      <div style={{display: 'flex', justifyContent: 'space-around', margin: '5px 0'}}>
          {classes && classes.map(c => <ClientClassCard c = {c} key = {c.classid}  />)}
      </div>
    </div>
  )
}

