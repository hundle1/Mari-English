"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

let timeout: NodeJS.Timeout;

export function RouteLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    // Nhỏ delay tránh nháy nếu trang load nhanh
    timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
