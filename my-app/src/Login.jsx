
import React from 'react'
import {Container} from 'react-bootstrap';
import { useRef,useState,useEffect } from 'react';

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=0279f1ff50264cd6a94b5b3de26c30af&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" style={{background:'black',width:"300px"}} href={AUTH_URL} >
        Login With Spotify
      </a>
    
    </Container>
  )
}
