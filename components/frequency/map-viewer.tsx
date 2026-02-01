"use client";

import React, { useEffect, useRef } from "react";

interface MapViewerProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
}

export default function MapViewer({
  lat,
  lng,
  zoom = 15,
  height = "h-32",
}: MapViewerProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: any;

    const loadLeaflet = () =>
      new Promise<void>((resolve, reject) => {
        if (typeof window === "undefined") return reject();
        if ((window as any).L) return resolve();

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });

    let cancelled = false;

    loadLeaflet()
      .then(() => {
        if (cancelled) return;
        const L = (window as any).L;
        if (!ref.current) return;
        map = L.map(ref.current, { scrollWheelZoom: false }).setView(
          [lat, lng],
          zoom,
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);
        L.marker([lat, lng]).addTo(map);
        // ensure rendering after container is visible
        setTimeout(() => map.invalidateSize && map.invalidateSize(), 200);
      })
      .catch(() => {
        // fail silently
      });

    return () => {
      cancelled = true;
      if (map && map.remove) map.remove();
    };
  }, [lat, lng, zoom]);

  return <div ref={ref} className={`${height} w-full rounded-md`} />;
}
