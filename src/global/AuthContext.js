import React, {useEffect, useState} from "react";

export const AuthContext = React.createContext([]);

export const AuthContextProvider = (props) => {
  const [ currentUser, setCurrentUser ] = useState({loading: true, data: null});

  async function fetchUserInfo() {
    // TODO: Save state inside localstorage to avoid constant info fetching?
    let userInfo = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, {
      method: 'GET',
      credentials: 'include',
    }).then(dt => dt.json());
    console.log("AuthContextProvider userinfo", userInfo)
    if (userInfo.success) {
      console.log("Found login user", userInfo.data)
      setCurrentUser(state => ({ ...state, loading: false, data: userInfo.data }));
    }
    else {
      console.log("No login user")
      setCurrentUser(state => ({ ...state, loading: false, data: null }));
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser, fetchUserInfo]}>
      {props.children}
    </AuthContext.Provider>
  )
}
