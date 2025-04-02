import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import type { AuthUser } from '~/types/auth-user';
import { fbAuth } from '~/firebase/firebase-config';
import { AuthContext } from './auth.context';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, async (user: User | null) => {
      if (!user) {
        setInitialized(true);
        setUser(null);
        return;
      }

      // Fetch user claims
      const { claims } = await user.getIdTokenResult();

      const userClaims = {
        isAdmin: claims.admin === true,
      };

      const authedUser: AuthUser = {
        uid: user.uid,
        displayName: user.displayName || 'User',
        email: user.email || '',
        photoURL: user.photoURL || '',
      };

      setIsAdmin(userClaims.isAdmin);
      setUser(authedUser);
      setInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, isAdmin, initialized }}>{children}</AuthContext.Provider>;
}
