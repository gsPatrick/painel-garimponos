import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';
import { toast } from 'sonner';

// MOCK MODE: Force authenticated state
const useAuth = create(
    persist(
        (set, get) => ({
            user: { name: 'Super Admin (Mock)', email: 'admin@mock.com', role: 'admin' },
            token: 'mock-token-123',
            isAuthenticated: true,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    // Simulate API delay
                    await new Promise(resolve => setTimeout(resolve, 800));

                    // Mock success
                    const mockUser = { name: 'Super Admin (Mock)', email, role: 'admin' };
                    const mockToken = 'mock-token-123';

                    set({
                        user: mockUser,
                        token: mockToken,
                        isAuthenticated: true,
                        isLoading: false
                    });

                    toast.success("Login realizado com sucesso (MOCK)!");
                    return true;
                } catch (error) {
                    set({ error: "Erro simulado", isLoading: false });
                    return false;
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
                toast.info("Logout realizado (MOCK)");
                // In a real app we might redirect, but for mock mode we might want to stay or redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            },

            checkAuth: async () => {
                // Always valid in mock mode
                return true;
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);

export default useAuth;
