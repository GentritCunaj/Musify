import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [expiresIn, setExpiresIn] = useState(null)

  useEffect(() => {
   
    axios
      .post("http://localhost:3001/login", {
        code
      })
      .then(res => {
       
        if (res.data && res.data.accessToken) {
            setAccessToken(res.data.accessToken);
          }
          if (res.data && res.data.refreshToken) {
            setRefreshToken(res.data.refreshToken);
          }
          if (res.data && res.data.expiresIn) {
            setExpiresIn(res.data.expiresIn);
          }
         
        window.history.pushState({}, null, "/")
      })
      .catch((err) => {
        console.log(err);
        
      })
  }, [])

  useEffect(() => {
    
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          window.location = "/"
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])
  return accessToken
}
