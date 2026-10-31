// ==============================================================
// 🔔 CONTEXTO DE NOTIFICACIONES TOAST (SUZ CRM)
// ==============================================================
// Provee un sistema moderno de notificaciones flotantes para evitar
// los molestos "alert()" del navegador que pausan la pantalla.

import React, { createContext, useContext, useState, useCallback } from "react";
import "./Toast.css";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Muestra una notificación temporal (desaparece sola a los 3.5 segundos)
  // tipo: 'success' | 'error' | 'warning' | 'info'
  const showToast = useCallback((mensaje, tipo = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, mensaje, tipo }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Contenedor flotante de notificaciones en la esquina superior derecha */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-card toast-${toast.tipo}`}>
            <span className="toast-icon">
              {toast.tipo === "success" && "✅"}
              {toast.tipo === "error" && "⚠️"}
              {toast.tipo === "warning" && "🔔"}
              {toast.tipo === "info" && "ℹ️"}
            </span>
            <span className="toast-msg">{toast.mensaje}</span>
            <button
              type="button"
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              title="Cerrar"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook personalizado para usar las notificaciones desde cualquier componente
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (msg) => console.log("Toast fallback:", msg),
    };
  }
  return context;
};
