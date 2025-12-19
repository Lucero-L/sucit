"use client";

import { observer } from "mobx-react-lite";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useStores } from "@/src/app/lib/hooks";
import { useLanguage } from "@/src/app/lib/context/LanguageContext";

function DashboardPage() {
  const router = useRouter();
  const { authStore, uiStore } = useStores();
  const { t } = useLanguage();

  const handleLogout = async () => {
    await authStore.logout();
    uiStore.showSuccess(t.auth.logout);
    router.push("/auth/login");
  };

  return (
    <div className="surface-ground min-h-screen p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h1 className="text-3xl font-bold text-primary m-0">Dashboard</h1>
        <Button
          label={t.auth.logout}
          icon="pi pi-sign-out"
          severity="secondary"
          onClick={handleLogout}
        />
      </div>

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <Card>
            <div className="flex align-items-center gap-3">
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "3rem", height: "3rem" }}>
                <i className="pi pi-users text-blue-500 text-xl"></i>
              </div>
              <div>
                <span className="block text-500 font-medium mb-1">Usuarios</span>
                <span className="text-900 font-bold text-xl">152</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <Card>
            <div className="flex align-items-center gap-3">
              <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: "3rem", height: "3rem" }}>
                <i className="pi pi-file text-green-500 text-xl"></i>
              </div>
              <div>
                <span className="block text-500 font-medium mb-1">Contenidos</span>
                <span className="text-900 font-bold text-xl">89</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <Card>
            <div className="flex align-items-center gap-3">
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: "3rem", height: "3rem" }}>
                <i className="pi pi-images text-orange-500 text-xl"></i>
              </div>
              <div>
                <span className="block text-500 font-medium mb-1">Media</span>
                <span className="text-900 font-bold text-xl">234</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <Card>
            <div className="flex align-items-center gap-3">
              <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: "3rem", height: "3rem" }}>
                <i className="pi pi-eye text-purple-500 text-xl"></i>
              </div>
              <div>
                <span className="block text-500 font-medium mb-1">Visitas</span>
                <span className="text-900 font-bold text-xl">12.4k</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {authStore.user && (
        <Card className="mt-4" title="Información del usuario">
          <p><strong>Usuario:</strong> {authStore.user.username}</p>
          <p><strong>Email:</strong> {authStore.user.email}</p>
        </Card>
      )}
    </div>
  );
}

export default observer(DashboardPage);
