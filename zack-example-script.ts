import {
  readAllWorkspaceConfiguration,
  readJsonFile,
  writeJsonFile,
} from '@nrwl/devkit';
import { resolve } from 'path';

const workspace = readAllWorkspaceConfiguration();

console.log(workspace);

for (const [projectName, projectConfig] of Object.entries(workspace.projects)) {
  const projectJsonLocation = resolve(
    __dirname,
    projectConfig.root,
    'project.json'
  );
  const currentProjectJson = readJsonFile(projectJsonLocation);
  const newTargets = {
    ...currentProjectJson.targets,
    'new-test': {
      command: 'echo "hello world"',
    },
  };
  if (projectConfig.root !== '') {
    writeJsonFile(projectJsonLocation, {
      ...currentProjectJson,
      targets: newTargets,
    });
  }
}
