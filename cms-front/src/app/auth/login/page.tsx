"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { useStores } from "@/src/app/lib/hooks";
import { useLanguage } from "@/src/app/lib/context/LanguageContext";

function LoginPage() {
  const router = useRouter();
  const { authStore } = useStores();
  const { t } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await authStore.login({ username, password });
    if (success) {
      router.push("/pages/dashboard");
    }
  };

  return (
    <div className="surface-ground flex align-items-center justify-content-center min-h-screen">
      <Card className="w-full md:w-25rem">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-primary">{t.auth.login}</h2>
        </div>

        {authStore.error && (
          <Message severity="error" text={authStore.error} className="w-full mb-3" />
        )}

        <form onSubmit={handleSubmit}>
          <div className="field mb-4">
            <label htmlFor="username" className="block text-900 font-medium mb-2">
              {t.auth.username}
            </label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              placeholder={t.auth.username}
              required
            />
          </div>

          <div className="field mb-4">
            <label htmlFor="password" className="block text-900 font-medium mb-2">
              {t.auth.password}
            </label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              inputClassName="w-full"
              feedback={false}
              toggleMask
              placeholder={t.auth.password}
              required
            />
          </div>

          <Button
            type="submit"
            label={t.auth.login}
            icon="pi pi-sign-in"
            className="w-full"
            loading={authStore.isLoading}
          />
        </form>
      </Card>
    </div>
  );
}

export default observer(LoginPage);
