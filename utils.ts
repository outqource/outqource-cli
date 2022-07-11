import * as fs from "fs-extra";
import { execSync } from "child_process";

interface IGetSubdirectoriesFromGithub {
  orgainzation: string;
  repository: string;
  projectName: string;
  branch: string;
  path: string;
  newPath: string;
}

export const checkFolder = (path: string | string[]): boolean => {
  if (Array.isArray(path)) {
    path = path.join("/");
  }

  return fs.existsSync(path);
};

export const moveFolder = (src: string, dest: string) => {
  fs.moveSync(src, dest, { overwrite: true });
};

export const removeFolder = (path: string) => {
  fs.removeSync(path);
};

export const getSubdirectoryFromGithub = ({
  orgainzation,
  repository,
  projectName,
  branch,
  path,
  newPath,
}: IGetSubdirectoriesFromGithub) => {
  execSync(
    `git clone https://github.com/${orgainzation}/${repository} ${projectName}`
  );
  execSync(`cd ${projectName} && git checkout ${branch} && cd ../`);

  const isExist = checkFolder(path);
  if (!isExist) {
    throw new Error("Cannot find path in project");
  }

  moveFolder(path, newPath);
  removeFolder(projectName);
};
