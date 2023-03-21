import React, {useEffect, useState} from "react";

export const AuthContext = React.createContext(null);

export const AuthContextProvider = (props) => {
  const [ currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      let userInfo = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, {
        method: 'GET',
        credentials: 'include',
      }).then(dt => dt.json());
      console.log("AuthContextProvider userinfo", userInfo)
      if (userInfo.success) {
        console.log("Found login user", userInfo.data)
        setCurrentUser(userInfo.data);
      }
      else {
        console.log("No login user")
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </AuthContext.Provider>
  )
}
