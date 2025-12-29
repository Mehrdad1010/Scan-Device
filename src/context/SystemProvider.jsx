import { createContext, useContext, useEffect, useState } from "react";
import { client } from "../api/client";
import { socket } from "../api/socket";

const SystemContext = createContext(null);

export function SystemProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // REST fetch
  useEffect(() => {
    let mounted = true;

    async function fetchSystemInfo() {
      try {
        const res = await client.get("/scan");
        if (mounted) setData(res.data);
      } catch (err) {
        if (mounted)
          setError(err?.response?.data ?? err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchSystemInfo();
    return () => { mounted = false; };
  }, []);

  // Socket live updates
  useEffect(() => {
    const handler = (liveData) => {
      console.log(liveData);
      
      setData(prev => ({ ...prev, ...liveData }));
    };

    socket.on("scan-update", handler);
    return () => socket.off("scan-update", handler);
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
