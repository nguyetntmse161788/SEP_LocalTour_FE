// import { jwtDecode } from 'jwt-decode';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface AuthContextProps {
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');

//     if (token) {
//       try {
//         const decodedToken = jwtDecode<{ exp: number }>(token);
//         const currentTime = Math.floor(Date.now() / 1000);

//         if (decodedToken.exp && decodedToken.exp > currentTime) {
//           setIsAuthenticated(true);
//         } else {
//           localStorage.clear();
//           setIsAuthenticated(false);
//           navigate('/sign-in');
//         }
//       } catch (error) {
//         console.error('Invalid token:', error);
//         localStorage.clear();
//         setIsAuthenticated(false);
//         navigate('/sign-in');
//       }
//     } else {
//       navigate('/sign-in');
//     }
//   }, [navigate]);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
