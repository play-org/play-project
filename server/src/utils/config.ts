import fs from 'fs';
function loadJSON(filename: string) {
  const content = fs.readFileSync(filename, 'utf8');
  return JSON.parse(content);
}
export function load(configPath: string) {
  const config = loadJSON(configPath);
  return config;
}
