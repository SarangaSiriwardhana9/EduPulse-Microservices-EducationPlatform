import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

interface User {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUserData: (userData: User) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUserData: () => { },
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserData = (userData: User) => {
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token to get user data
      const decoded = jwtDecode<User>(token); 
      // Set user data to state
      setUser(decoded);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
