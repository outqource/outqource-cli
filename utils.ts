import * as fs from "fs-extra";
import { execSync } from "child_process";
import { execa } from "execa";

interface IGetSubdirectoriesFromGithub {
  orgainzation: string;
  repository: string;
  projectName: string;
  branch: string;
  src: string;
  dest: string;
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
  src,
  dest,
}: IGetSubdirectoriesFromGithub) => {
  try {
    execSync(
      `git clone https://github.com/${orgainzation}/${repository} ${projectName}`
    );
    execSync(`cd ${projectName} && git checkout ${branch} && cd ../`);

    const isExist = checkFolder(src);
    if (!isExist) {
      throw new Error("Cannot find path in project");
    }

    moveFolder(src, dest);
    removeFolder(projectName);
  } catch (e) {
    const error = e as any;
    console.red(error?.message || "Unknown error");

    process.exit(1);
  }
};
