"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// --- Blockchain Core Simulation ---
// In a real app we'd use crypto.subtle, but for this demo 
// we'll use a simple deterministic hash simulation string.
const simpleHash = (data: string) => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
};

export interface Block {
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;
  hash: string;
  nonce: number;
}

const createBlock = (index: number, data: any, previousHash: string): Block => {
  const timestamp = new Date().toISOString();
  let nonce = 0;
  let hash = "";
  
  // Basic Proof of Work simulation (Mining)
  const calculateHash = (n: number) => simpleHash(index + timestamp + JSON.stringify(data) + previousHash + n);
  
  // "Mine" the block (simple difficulty: hash starts with '0')
  while (true) {
    hash = calculateHash(nonce);
    if (hash.startsWith("0")) break; 
    nonce++;
    if (nonce > 1000) break; // Safety break for UI thread
  }

  return { index, timestamp, data, previousHash, hash, nonce };
};

// --- End Blockchain Core ---

export interface LocalUser {
  uid: string;
  name: string;
  email: string;
  ecoPoints: number;
  badges: string[];
  role: "household" | "admin";
}

export interface WasteRecord {
  id: string;
  userId: string;
  wasteType: string;
  quantity: number;
  status: "verified" | "pending";
  timestamp: string;
  blockHash?: string; // Link to blockchain
}

export interface CitizenReport {
  id: string;
  userId: string;
  issueType: string;
  location: string;
  description: string;
  status: "open" | "resolved" | "in-progress";
  timestamp: string;
}

interface AuthContextType {
  user: LocalUser | null;
  loading: boolean;
  chain: Block[];
  db: {
    users: LocalUser[];
    records: WasteRecord[];
    reports: CitizenReport[];
    addRecord: (record: Omit<WasteRecord, "id">) => Block;
    addReport: (report: Omit<CitizenReport, "id">) => void;
    updateUser: (uid: string, data: Partial<LocalUser>) => void;
    deleteUser: (uid: string) => void;
    verifyRecord: (id: string) => void;
  };
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Real Persistent State (The Blockchain & Supporting DBs)
  const [chain, setChain] = useState<Block[]>([]);
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [reports, setReports] = useState<CitizenReport[]>([]);

  useEffect(() => {
    // 1. Initialize from LocalStorage
    const storedChain = localStorage.getItem("sw_chain");
    const storedUsers = localStorage.getItem("sw_users");
    const storedReports = localStorage.getItem("sw_reports");

    const genesisBlock = createBlock(0, { message: "Genesis Block - SmartWaste Network Started" }, "0");
    
    const initialChain: Block[] = storedChain ? JSON.parse(storedChain) : [genesisBlock];
    const initialUsers: LocalUser[] = storedUsers ? JSON.parse(storedUsers) : [
      { uid: "admin-1", name: "System Admin", email: "admin@eco.com", ecoPoints: 10000, badges: ["Network Genesis"], role: "admin" }
    ];
    const initialReports: CitizenReport[] = storedReports ? JSON.parse(storedReports) : [];

    setChain(initialChain);
    setUsers(initialUsers);
    setReports(initialReports);

    // 2. Auth Session
    const saved = localStorage.getItem("sw_session");
    if (saved) setUser(JSON.parse(saved));
    
    setLoading(false);
  }, []);

  // Persistence Sync
  useEffect(() => {
    if (chain.length > 0) localStorage.setItem("sw_chain", JSON.stringify(chain));
    if (users.length > 0) localStorage.setItem("sw_users", JSON.stringify(users));
    if (reports.length > 0) localStorage.setItem("sw_reports", JSON.stringify(reports));
  }, [chain, users, reports]);

  // Derived records from blockchain (The "Ledger")
  const records: WasteRecord[] = chain
    .filter(block => block.data && block.data.type === "WASTE_LOG")
    .map(block => ({
      ...block.data.payload,
      blockHash: block.hash
    }))
    .reverse();

  const addBlockToChain = (data: any) => {
    const lastBlock = chain[chain.length - 1];
    const newBlock = createBlock(chain.length, data, lastBlock.hash);
    setChain(prev => [...prev, newBlock]);
    return newBlock;
  };

  const addRecord = (payload: Omit<WasteRecord, "id">) => {
    const id = "tx_" + Math.random().toString(36).substr(2, 9);
    const newRecord = { ...payload, id };
    
    const block = addBlockToChain({
      type: "WASTE_LOG",
      payload: newRecord
    });

    // Update locally logged-in user points
    if (user && user.uid === payload.userId) {
      const updatedUser = { ...user, ecoPoints: user.ecoPoints + Math.ceil(payload.quantity * 12) };
      setUser(updatedUser);
      updateUser(user.uid, updatedUser);
    }

    return block;
  };

  const addReport = (payload: Omit<CitizenReport, "id">) => {
    const id = "rep_" + Math.random().toString(36).substr(2, 9);
    const newReport = { ...payload, id };
    setReports(prev => [newReport, ...prev]);
  };

  const updateUser = (uid: string, data: Partial<LocalUser>) => {
    setUsers(prev => prev.map(u => u.uid === uid ? { ...u, ...data } : u));
    if (user?.uid === uid) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem("sw_session", JSON.stringify(updated));
    }
  };

  const deleteUser = (uid: string) => {
    setUsers(prev => prev.filter(u => u.uid !== uid));
    if (user?.uid === uid) logout();
  };

  const verifyRecord = (id: string) => {
    // Blockchain records are immutable! 
    // In a real blockchain we would add a NEW block saying "Record X is now Verified"
    addBlockToChain({
      type: "VERIFICATION_EVENT",
      targetId: id,
      verifiedAt: new Date().toISOString(),
      adminUid: user?.uid
    });
    
    // For the UI simplicity, we also "update" the derived status
    // (In a real system we'd re-compute state from all blocks)
    setChain(prev => prev.map(block => {
      if (block.data?.type === "WASTE_LOG" && block.data.payload.id === id) {
        return {
          ...block,
          data: { ...block.data, payload: { ...block.data.payload, status: 'verified' } }
        };
      }
      return block;
    }));
  };

  const login = async (email: string, pass: string) => {
    const found = users.find(u => u.email === email);
    if (!found) {
      await signup(email.split('@')[0], email, pass);
    } else {
      setUser(found);
      localStorage.setItem("sw_session", JSON.stringify(found));
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    const newUser: LocalUser = {
      uid: "user_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      ecoPoints: 0,
      badges: ["Network Citizen"],
      role: email.includes("admin") ? "admin" : "household"
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem("sw_session", JSON.stringify(newUser));
    
    // Add Genesis User Event to Chain
    addBlockToChain({ type: "USER_REGISTRATION", uid: newUser.uid, email: newUser.email });
  };

  const logout = () => {
    localStorage.removeItem("sw_session");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      chain,
      db: { users, records, reports, addRecord, addReport, updateUser, deleteUser, verifyRecord },
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
