import { LimgoRelease } from "./limgo";
import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import path from "path";

export async function installRelease(
  version: string,
  installDir: string
): Promise<LimgoRelease> {
  const downloadPath = await downloadRelease(
    version,
    path.join(installDir, "download")
  );
  const extractPath = await unpackTarball(
    downloadPath,
    path.join(installDir, "bin")
  );

  return new LimgoRelease(version, extractPath);
}

const downloadRelease = async (
  version: string,
  downloadTargetDir: string
): Promise<string> => {
  const url = await assembleDownloadURL(version);
  core.debug(`Downloading ${url}...`);

  const downloadPath = await tc.downloadTool(
    url,
    path.join(downloadTargetDir, "limgo.tar.gz")
  );
  core.debug(`Downloaded to ${downloadPath}`);

  return downloadPath;
};

async function assembleDownloadURL(version: string): Promise<string> {
  if (version.startsWith("v")) {
    return `https://github.com/GoTestTools/limgo/releases/download/${version}/limgo_${version.substring(
      1
    )}_Linux_x86_64.tar.gz`;
  }
  return `https://github.com/GoTestTools/limgo/releases/download/${version}/limgo_${version}_Linux_x86_64.tar.gz`;
}

async function unpackTarball(
  tarballPath: string,
  unpackTargetDir: string
): Promise<string> {
  core.debug(`Extracting limgo from ${tarballPath}...`);
  const extractPath = await tc.extractTar(tarballPath, unpackTargetDir);
  core.debug(`Extracted limgo to ${tarballPath}`);

  return extractPath;
}
