import React from 'react';
import ServerService from '../../services/ServerService';

function Cookie() {


  const getCookies = () => {
    console.log("Get Cookies")
    ServerService.getCookies((result) => {
      console.log("Get Cookies OK")
      console.log(result)
    }, (error) => {
      console.log(error)
    })
  }

  const setCookies = () => {
    console.log("Set Cookies")
    ServerService.setCookies((result) => {
      console.log("Set Cookies OK")
      console.log(result)
    }, (error) => {
      console.log(error)
    })
  }

  const setCookiesAuth = () => {
    console.log("Set Cookies Auth")
    ServerService.setCookiesAuth((result) => {
      console.log("Set Cookies OK")
      console.log(result)
    }, (error) => {
      console.log(error)
    })
  }


  const getUsersInfosSecure = () => {
    console.log("getUsersInfosSecure")
    ServerService.fetchUsersInfosSecure((result) => {
      console.log("getUsersInfosSecure OK")
      console.log(result)
    }, (error) => {
      console.log(error)
    })
  }


  const getUsers = () => {
    console.log("getUsers")
    ServerService.fetchUsersInfos((result) => {
      console.log("getUsers OK")
      console.log(result)
    }, (error) => {
      console.log(error)
    })
  }


  return (
    <>
      <div className="flex-container" >
        <div className="flex-item-1" >
          <button onClick={() => getCookies()}>GetCookies</button>
        </div>
        <div className="flex-item-1" >
          <button onClick={() => setCookies()}>Set cookies</button>
        </div>
        <div className="flex-item-1" >
          <button onClick={() => setCookiesAuth()}>Set cookies user</button>
        </div>
        <div className="flex-container" >
          <div className="flex-item-1" >
            <button onClick={() => getUsersInfosSecure()}>getUsersInfosSecure</button>
          </div>
          <div className="flex-item-1" >
            <button onClick={() => getUsers()}>getUsers</button>
          </div>
        </div>
      </div>

    </>
  );

}



export default Cookie