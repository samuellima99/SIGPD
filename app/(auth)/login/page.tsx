"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarCheck, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        // Obter o usuário logado para decidir o redirecionamento
        // (Isso assume que o login atualiza o estado local síncronamente ou que o mock resolve com sucesso)
        // Como o mock seta o usuário internamente, podemos buscar o email na lista local para saber o role
        // ou confiar na estrutura do mockUsers.
        if (email === "professor@ifce.edu.br") {
          router.push("/minha-frequencia")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Credenciais inválidas. Tente novamente.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar entrar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur">
              <CalendarCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary-foreground">IFCE</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-primary-foreground leading-tight text-balance">
              Sistema de Controle de Frequência
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-md">
              Gerencie a frequência de servidores de forma eficiente, transparente e em conformidade com as normas institucionais.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-sm text-primary-foreground backdrop-blur">
                Registro por QR Code
              </span>
              <span className="inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-sm text-primary-foreground backdrop-blur">
                Geolocalização
              </span>
              <span className="inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-sm text-primary-foreground backdrop-blur">
                Relatórios Automáticos
              </span>
            </div>
          </div>

          <p className="text-sm text-primary-foreground/60">
            Instituto Federal de Educação, Ciência e Tecnologia do Ceará
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-3 lg:hidden mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <CalendarCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">IFCE</span>
          </div>

          <Card className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="space-y-1 px-0 lg:px-6">
              <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 lg:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail institucional</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@ifce.edu.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      href="/esqueci-senha"
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Manter-me conectado
                  </label>
                </div>

                <Button type="submit" className="w-full h-11" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Problemas para acessar?{" "}
                <Link href="/suporte" className="text-primary hover:underline">
                  Contate o suporte
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
