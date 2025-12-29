import { createContext, useContext, useLayoutEffect, useState } from "react";
import { client } from "../api/client";

const SystemContext = createContext(undefined);

export function SystemProvider({ children }) {
  const [data, setData] = useState({
    os: {
      Architecture: "",
      Build: "",
      Kernel: "",
      Name: "",
      Version: "",
    },
    cpu: {
      Manufacturer: "",
      Brand: "",
      Cores_Logical: "",
      Cores_Physical: "",
      Speed: "",
    },
    disks: [
      {
        fs: "",
        type: "",
        mount: "",
        Total_Size: "",
        Used: "",
        usePercent: "",
      },
    ],
    memory: {
      Total_RAM: "",
      Free_RAM: "",
    },
    system: {
      Manufacturer: "",
      Model: "",
      Version: "",
    },
    gpu: {
      Vendor: "",
      Model: "",
      VRAM: "",
    },
    localPorts: [],
    network: {
      adapters: [],
      hostname: "",
      platform: "",
    },
    notes: {
      scope: "",
      timestamp: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const res = await client.get("/api/scan");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load system info:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemInfo();
  }, []);

  return (
    <SystemContext.Provider value={{ data, loading, error }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystemInfo() {
  const ctx = useContext(SystemContext);
  if (!ctx) {
    throw new Error("useSystemInfo must be used inside SystemProvider");
  }
  return ctx;
}
