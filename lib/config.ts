export interface SystemConfig {
  defaultProfitMargin: number;
}

export const defaultConfig: SystemConfig = {
  defaultProfitMargin: 120, // 120%
};

export function getConfig(): SystemConfig {
  const storedConfig = localStorage.getItem("systemConfig");
  return storedConfig ? JSON.parse(storedConfig) : defaultConfig;
}

export function setConfig(config: SystemConfig): void {
  localStorage.setItem("systemConfig", JSON.stringify(config));
}