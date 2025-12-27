import { createContext, useContext, useLayoutEffect, useState } from "react";
import { client } from "../api/client";

const SystemContext = createContext(undefined);

export function SystemProvider({ childe }) {
  const [os, setOs] = useState({
    name: undefined,
    version: undefined,
    build: undefined,
    arch: undefined,
    kernel: undefined,
  });
  const [system, setSystem] = useState({
    manufacturer: undefined,
    model: undefined,
    version: undefined,
  });
  const [cpu, setCpu] = useState({
    manufacturer: undefined,
    brand: undefined,
    model: undefined,
    cores: undefined,
    physicalCores: undefined,
    speedGHz: undefined,
  });
  const [memory, setMemory] = useState({
    totalGB: undefined,
    freeGB: undefined,
  });
  const [disks, setDisks] = useState([]);
  const [gpu, setGpu] = useState([]);
  const [network, setNetwork] = useState({
    hostname: undefined,
    platform: undefined,
    adapters: [],
  });
  const [localPorts, setLocalPorts] = useState([]);
  const [notes, setNotes] = useState({
    scope: undefined,
    timestamp: undefined,
  });

  useLayoutEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const res = await client.get("/api/scan");
        setOs(res.data.os);
        setSystem(res.data.hardware.system);
        setCpu(res.data.hardware.cpu);
        setMemory(res.data.hardware.memory);
        setDisks(res.data.hardware.disks);
        setGpu(res.data.hardware.gpu);
        setNetwork(res.data.network);
        setLocalPorts(res.data.localPorts);
        setNotes(res.data.notes);
      } catch (error) {
        console.error("Failed to load system Info:", error);
      }
    };
    fetchSystemInfo();
  }, []);

  return (
    <SystemContext.Provider
      value={{
        os,
        system,
        cpu,
        memory,
        disks,
        localPorts,
        gpu,
        network,
        notes,
      }}
    >
      {childe}
    </SystemContext.Provider>
  );
}

export function useSystemInfo() {
  const ctx = useContext(SystemContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
}
