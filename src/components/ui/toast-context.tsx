"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";

type ToastType = {
  id: string;
  title: string;
  description: string;
  variant: "default" | "destructive";
};

type ToastContextType = {
  addToast: (toast: Omit<ToastType, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (toast: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            onOpenChange={() => removeToast(toast.id)}
          >
            <div className="grid gap-1">
              {toast.title && <div className="font-medium">{toast.title}</div>}
              {toast.description && (
                <div className="text-sm opacity-90">{toast.description}</div>
              )}
            </div>
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
};
