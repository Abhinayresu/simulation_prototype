/**
 * Live Engineering Context Provider for EngineerMind UI.
 * Stores problem parameters across screens and syncs with the deterministic API backend.
 */
export interface EngineeringSessionState {
  objective: string;
  velocity: number;
  chord: number;
  temperature: number;
  density: number;
  dynamicViscosity: number;
  solverType: string;
  calculatedRe?: number;
  calculatedMa?: number;
  calculatedQ?: number;
  estimatedYPlus1?: number;
  isApproved?: boolean;
}

const STORAGE_KEY = "engineermind_session_state";

export const defaultSessionState: EngineeringSessionState = {
  objective: "NACA 2412 wing aerodynamic characterization",
  velocity: 50.0,
  chord: 1.0,
  temperature: 288.15,
  density: 1.225,
  dynamicViscosity: 1.7894e-5,
  solverType: "incompressible",
  calculatedRe: 3422935,
  calculatedMa: 0.147,
  calculatedQ: 1531.25,
  estimatedYPlus1: 1.48e-5,
  isApproved: false,
};

export function getSessionState(): EngineeringSessionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSessionState;
    return { ...defaultSessionState, ...JSON.parse(raw) };
  } catch {
    return defaultSessionState;
  }
}

export function saveSessionState(updates: Partial<EngineeringSessionState>): EngineeringSessionState {
  try {
    const current = getSessionState();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return defaultSessionState;
  }
}

export async function fetchDeterministicRe(velocity: number, chord: number) {
  try {
    const resp = await fetch("http://127.0.0.1:8000/api/v1/compute/reynolds-number", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        velocity,
        characteristic_length: chord,
        density: 1.225,
        dynamic_viscosity: 1.7894e-5,
      }),
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

export async function fetchDeterministicMa(velocity: number, temperature: number) {
  try {
    const resp = await fetch("http://127.0.0.1:8000/api/v1/compute/mach-number", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        velocity,
        temperature_kelvin: temperature,
      }),
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}
