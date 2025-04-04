import { useEffect, useState } from 'react';
import type { AuthUser } from '~/types/auth-user';
import { AuthContext } from './auth.context';

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const authedUser: AuthUser = {
    uid: 'uid-1',
    displayName: 'User',
    email: 'alexs@test.com',
    photoURL: 'https://example.com/photo.jpg',
  };

  const [initialized, setInitialized] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(authedUser);
  const [isAdmin, setIsAdmin] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(fbAuth, async (user: User | null) => {
  //     if (!user) {
  //       setInitialized(true);
  //       setUser(null);
  //       return;
  //     }

  //     // Fetch user claims
  //     const { claims } = await user.getIdTokenResult();

  //     const userClaims = {
  //       isAdmin: claims.admin === true,
  //     };

  //     const authedUser: AuthUser = {
  //       uid: user.uid,
  //       displayName: user.displayName || 'User',
  //       email: user.email || '',
  //       photoURL: user.photoURL || '',
  //     };

  //     setIsAdmin(userClaims.isAdmin);
  //     setUser(authedUser);
  //     setInitialized(true);
  //   });
  //   return () => unsubscribe();
  // }, []);

  return <AuthContext.Provider value={{ user, setUser, isAdmin, initialized }}>{children}</AuthContext.Provider>;
}
