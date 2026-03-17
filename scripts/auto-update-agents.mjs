import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const agentsDir = path.resolve(process.cwd(), 'agents');

function normalizeString(value, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item) => typeof item === 'string');
}

function withAutoUpdateDefaults(agent) {
  const next = {
    ...agent,
    id: normalizeString(agent.id),
    name: normalizeString(agent.name),
    purpose: normalizeString(agent.purpose),
    deliverables: normalizeStringArray(agent.deliverables),
    first_tasks: normalizeStringArray(agent.first_tasks),
    prompt: normalizeString(agent.prompt),
  };

  if (!next.autoUpdate || typeof next.autoUpdate !== 'object') {
    next.autoUpdate = {
      enabled: true,
      cadence: 'weekly',
      owner: 'github-actions-bot',
    };
  } else {
    next.autoUpdate = {
      enabled: next.autoUpdate.enabled !== false,
      cadence: normalizeString(next.autoUpdate.cadence, 'weekly'),
      owner: normalizeString(next.autoUpdate.owner, 'github-actions-bot'),
    };
  }

  return next;
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function updateAgents() {
  const entries = await readdir(agentsDir, { withFileTypes: true });
  const agentFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.json') && name !== 'registry.json')
    .sort();

  const registry = [];
  let changedFiles = 0;

  for (const fileName of agentFiles) {
    const filePath = path.join(agentsDir, fileName);
    const original = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(original);
    const normalized = withAutoUpdateDefaults(parsed);
    const nextText = stableJson(normalized);

    if (nextText !== original) {
      await writeFile(filePath, nextText, 'utf8');
      changedFiles += 1;
    }

    registry.push({
      id: normalized.id,
      name: normalized.name,
      purpose: normalized.purpose,
      file: `agents/${fileName}`,
      autoUpdate: normalized.autoUpdate,
    });
  }

  const registryPath = path.join(agentsDir, 'registry.json');
  const registryText = stableJson({
    generatedBy: 'scripts/auto-update-agents.mjs',
    generatedAtUtc: new Date().toISOString(),
    agents: registry,
  });
  await writeFile(registryPath, registryText, 'utf8');

  console.log(`Checked ${agentFiles.length} agents.`);
  console.log(`Normalized ${changedFiles} agent files.`);
}

updateAgents().catch((error) => {
  console.error(error);
  process.exit(1);
});
