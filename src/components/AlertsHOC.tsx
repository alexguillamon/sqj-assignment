"use client";

import { useEffect } from "react";
import { alertState$ } from "../app/admin/adminState";
import Alert from "./Alert";

export default function AlertsHOC(props: { children: React.ReactNode }) {
  const alert = alertState$.use();

  useEffect(() => {
    if (!alert) return;
    const timeout = setTimeout(() => {
      alertState$.set(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <div>
      {alert && (
        <div className="fixed right-0 top-8 min-w-[50%] max-w-xl px-8 pt-1 ">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => alertState$.set(null)}
          />
        </div>
      )}
      {props.children}
    </div>
  );
}
