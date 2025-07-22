// AuthContext.tsx
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
} from "react";
import type { ReactNode } from "react";
import { supabase } from "../services/supabase"; // Adjust path if needed
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    token: string | null;
    logout: () => Promise<void>;
    loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signUpWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error("Session fetch error:", error);
            }

            if (session?.user) {
                setUser(session.user);
                localStorage.setItem("token", session.access_token);
            }

            setLoading(false);
        };

        init();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(session.user);
                localStorage.setItem("token", session.access_token);
            } else {
                setUser(null);
                localStorage.removeItem("token");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem("token");
    };

    const loginWithEmail = async (email: string , password: string): Promise<{ success: boolean; error?: string }> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { success: false, error: error.message };
        } else {
            console.log('Signed in:', data);
            return { success: true };
        }
    };

    const signUpWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) {
            return { success: false, error: error.message };
        } else {
            console.log('Signed in:', data);
            return { success: true };
        }
    }

    const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/home`,
            },
        });

        if (error) {
            console.error('Google sign-in error:', error.message);
            return { success: false, error: error.message };
        } else {
            console.log('Redirecting to Google login...', data);
            return { success: true };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loginWithEmail,
                loginWithGoogle,
                signUpWithEmail,
                user,
                loading,
                logout,
                token: localStorage.getItem("token"),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
