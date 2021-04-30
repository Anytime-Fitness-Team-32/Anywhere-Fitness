import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function PrivateRoute({ component: Component, ...rest }){
    return(
        <Route 
            {...rest}
            render = {() => {
                if(window.localStorage.getItem('token')){
                    return <Component />
                } else {
                    return <Redirect to='/'/>
                }
            }}
        />
    )
}
export function PrivateRouteInstructor({ component: Component, ...rest }){
    return(
        <Route 
            {...rest}
            render = {() => {
                if(window.localStorage.getItem('token') && window.localStorage.getItem('role') === 'INSTRUCTOR'){
                    return <Component />
                } else {
                    return <Redirect to='/'/>
                }
            }}
        />
    )
}

export function PrivateRouteClient({ component: Component, ...rest }){
    return(
        <Route 
            {...rest}
            render = {() => {
                if(window.localStorage.getItem('token') && window.localStorage.getItem('role') === 'CLIENT'){
                    return <Component />
                } else {
                    return <Redirect to='/'/>
                }
            }}
        />
    )
}