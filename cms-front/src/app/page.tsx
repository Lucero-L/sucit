"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useLanguage } from "./lib/context/LanguageContext";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="surface-ground min-h-screen">
      <div className="flex flex-column align-items-center justify-content-center p-5" style={{ minHeight: "100vh" }}>
        <Card className="w-full md:w-6 lg:w-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-3">SUCIT CMS</h1>
            <p className="text-xl text-color-secondary mb-5">Frontend con Next.js + PrimeReact</p>
            
            <div className="surface-100 border-round p-4 mb-4">
              <div className="flex flex-column gap-2 text-left">
                <div className="flex align-items-center gap-2">
                  <i className="pi pi-check-circle text-green-500"></i>
                  <span>Next.js 16 + React 19</span>
                </div>
                <div className="flex align-items-center gap-2">
                  <i className="pi pi-check-circle text-green-500"></i>
                  <span>PrimeReact + PrimeFlex</span>
                </div>
                <div className="flex align-items-center gap-2">
                  <i className="pi pi-check-circle text-green-500"></i>
                  <span>MobX State Management</span>
                </div>
                <div className="flex align-items-center gap-2">
                  <i className="pi pi-check-circle text-green-500"></i>
                  <span>TypeScript + Tailwind (tw- prefix)</span>
                </div>
                <div className="flex align-items-center gap-2">
                  <i className="pi pi-check-circle text-green-500"></i>
                  <span>i18n: {language === "es" ? "Español" : "English"}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-content-center mb-4">
              <Button
                label="Español"
                icon="pi pi-globe"
                severity={language === "es" ? undefined : "secondary"}
                onClick={() => setLanguage("es")}
              />
              <Button
                label="English"
                icon="pi pi-globe"
                severity={language === "en" ? undefined : "secondary"}
                onClick={() => setLanguage("en")}
              />
            </div>

            <p className="text-color-secondary">
              {t.common.loading} → {language === "es" ? "Cargando..." : "Loading..."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
