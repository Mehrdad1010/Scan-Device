import { createContext, useContext, useLayoutEffect, useState } from "react";
import { client } from "../api/client";

const SystemContext = createContext(undefined);

export function SystemProvider({ children }) {
  const [data, setData] = useState({
    os: {
      arch: "",
      build: "",
      kernel: "",
      name: "",
      version: ""
    },
    cpu: {
          manufacturer: "",
          brand: "",
          model: "", 
          cores: "",
          physicalCores: "",
          speedGHz: "",
    },
    disks: {
          fs: "",
          type: "",
          mount: "",
          sizeGB: "",
          usedGB:"",
          usePercent: "",
    },
    memory: {
          totalGB: "",
          freeGB: "",
    },
    system: {
          manufacturer: "",
          model: "",
          version: "",
    },
    gpu: {
          vendor: "",
          model: "",
          vramMB: "",
    },
    localPorts:[],
    network: {
      adapters: [],
      hostname: "",
      platform: "",
    },
    notes: {
      scope: "",
      timestamp: ""
    }
  });

  useLayoutEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const res = await client.get("/api/scan");
        setData(res.data);
      } catch (error) {
        console.error("Failed to load system Info:", error);
      }
    };
    fetchSystemInfo();
  }, []);

  return (
    <SystemContext.Provider value={{ data }}>{children}</SystemContext.Provider>
  );
}

export function useSystemInfo() {
  const ctx = useContext(SystemContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
}
