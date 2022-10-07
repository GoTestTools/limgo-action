import * as core from "@actions/core";
import { getInputs } from "./input";
import { installRelease } from "./release";

async function run(): Promise<void> {
  const inputs = await getInputs();

  const limgo = await installRelease(inputs.version, "./limgo");
  core.info(`Installed ${limgo.binaryName}@${limgo.version} successfully!`);
  if (inputs.installOnly) {
    core.addPath(limgo.path);
    core.debug(`Added ${limgo.path} to PATH`);
    return;
  }

  await limgo.exec(inputs.args);
}

run();
