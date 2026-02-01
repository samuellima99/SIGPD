"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function PWAInstaller() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Registrar service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.log("Erro ao registrar Service Worker:", error);
        });
    }

    // Ouvir evento de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Verificar se já foi instalado
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    window
      .matchMedia("(display-mode: standalone)")
      .addEventListener("change", (e) => {
        setIsInstalled(e.matches);
      });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    (deferredPrompt as any).prompt();
    const choiceResult = await (deferredPrompt as any).userChoice;

    if (choiceResult.outcome === "accepted") {
      setIsInstallable(false);
      toast({
        title: "✓ App instalado",
        description: "SIGDP foi instalado com sucesso no seu dispositivo",
      });
    } else {
      console.log("Usuário rejeitou a instalação");
    }

    setDeferredPrompt(null);
  };

  if (!isInstallable || isInstalled) {
    return null;
  }

  return (
    <Button
      onClick={handleInstall}
      className="gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
      size="sm"
    >
      <Bell className="h-4 w-4" />
      Instalar App
    </Button>
  );
}
