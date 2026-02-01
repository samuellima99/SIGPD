"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "diretor" | "diretor_ensino" | "coordenador" | "professor"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  campus?: string
  setor?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  diretor: {
    id: "1",
    name: "Carlos Silva",
    email: "diretor@ifce.edu.br",
    role: "diretor",
    avatar: "",
    campus: "Fortaleza",
  },
  diretor_ensino: {
    id: "2",
    name: "Maria Santos",
    email: "ensino@ifce.edu.br",
    role: "diretor_ensino",
    avatar: "",
    campus: "Fortaleza",
  },
  coordenador: {
    id: "3",
    name: "João Oliveira",
    email: "coord@ifce.edu.br",
    role: "coordenador",
    avatar: "",
    campus: "Fortaleza",
    setor: "Informática",
  },
  professor: {
    id: "4",
    name: "Ana Costa",
    email: "professor@ifce.edu.br",
    role: "professor",
    avatar: "",
    campus: "Fortaleza",
    setor: "Informática",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock login - in production, this would validate against a backend
    const foundUser = Object.values(mockUsers).find((u) => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Permission helpers
export const permissions = {
  diretor: {
    canViewDashboard: true,
    canViewAllUsers: true,
    canManageUsers: false,
    canViewFrequency: true,
    canViewAllFrequency: true,
    canApproveJustifications: false,
    canViewReports: true,
    canViewAllReports: true,
    canViewSettings: true,
    canManageSettings: false,
    canViewAudit: true,
  },
  diretor_ensino: {
    canViewDashboard: true,
    canViewAllUsers: true,
    canManageUsers: true,
    canViewFrequency: true,
    canViewAllFrequency: true,
    canApproveJustifications: true,
    canViewReports: true,
    canViewAllReports: true,
    canViewSettings: true,
    canManageSettings: true,
    canViewAudit: true,
  },
  coordenador: {
    canViewDashboard: true,
    canViewAllUsers: false,
    canManageUsers: false,
    canViewFrequency: true,
    canViewAllFrequency: false,
    canApproveJustifications: true,
    canViewReports: true,
    canViewAllReports: false,
    canViewSettings: false,
    canManageSettings: false,
    canViewAudit: false,
  },
  professor: {
    canViewDashboard: false,
    canViewAllUsers: false,
    canManageUsers: false,
    canViewFrequency: false,
    canViewAllFrequency: false,
    canApproveJustifications: false,
    canViewReports: false,
    canViewAllReports: false,
    canViewSettings: false,
    canManageSettings: false,
    canViewAudit: false,
  },
}

export function usePermissions() {
  const { user } = useAuth()
  if (!user) return permissions.professor
  return permissions[user.role]
}
