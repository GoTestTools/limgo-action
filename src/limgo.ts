import * as core from "@actions/core";
import { execSync } from "child_process";

export class LimgoRelease {
  public binaryName: string;

  public constructor(public version: string, public path: string) {
    this.binaryName = "limgo";
  }

  public async exec(args: string) {
    const cmd = `${this.path}/${this.binaryName} ${args}`;
    core.info(`Running command ${cmd}...`);

    try {
      execSync(cmd);
    } catch (err: any) {
      throw new Error(`Executing command failed: \n${err.stdout}`);
    }
  }
}
