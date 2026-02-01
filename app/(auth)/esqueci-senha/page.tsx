"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { CalendarCheck, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <CalendarCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">IFCE</span>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            {submitted ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">
                  Verifique seu e-mail
                </CardTitle>
                <CardDescription className="text-center">
                  Enviamos um link de recuperação para{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl font-bold">Esqueci minha senha</CardTitle>
                <CardDescription>
                  Digite seu e-mail institucional e enviaremos um link para redefinir sua senha.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Caso não encontre o e-mail, verifique sua caixa de spam ou lixo eletrônico.
                </p>
                <Button asChild className="w-full">
                  <Link href="/login">Voltar para o login</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setSubmitted(false)
                    setEmail("")
                  }}
                >
                  Tentar outro e-mail
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <Button type="submit" className="w-full h-11" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar link de recuperação"
                  )}
                </Button>

                <Button variant="ghost" asChild className="w-full">
                  <Link href="/login" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para o login
                  </Link>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
