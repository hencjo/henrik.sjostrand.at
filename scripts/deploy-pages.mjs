#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync, cpSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

const remoteName = "origin";
const deployBranch = "gh-pages";
const buildDir = "_site";
const cnameFile = "CNAME";

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
    ...options
  });
}

function tryRun(command, args, options = {}) {
  try {
    return { ok: true, output: run(command, args, { ...options, capture: true }) };
  } catch (error) {
    return { ok: false, error };
  }
}

function trim(command, args) {
  return run(command, args, { capture: true }).trim();
}

function emptyDirectory(path) {
  for (const entry of readdirSync(path)) {
    if (entry === ".git") continue;
    rmSync(join(path, entry), { recursive: true, force: true });
  }
}

const status = trim("git", ["status", "--porcelain"]);
if (status) {
  console.error("Refusing to deploy from a dirty working tree.");
  console.error("Commit or stash source changes first.");
  process.exit(1);
}

if (!existsSync(join(buildDir, "index.html"))) {
  console.error(`Missing ${buildDir}/index.html. Run npm run build first.`);
  process.exit(1);
}

const remoteUrl = trim("git", ["config", "--get", `remote.${remoteName}.url`]);
const sourceSha = trim("git", ["rev-parse", "HEAD"]);
const tmp = mkdtempSync(join(tmpdir(), "homepage-pages-"));

try {
  run("git", ["init", tmp]);
  run("git", ["-C", tmp, "remote", "add", remoteName, remoteUrl]);

  const fetched = tryRun("git", ["-C", tmp, "fetch", "--depth=1", remoteName, deployBranch]);
  if (fetched.ok) {
    run("git", ["-C", tmp, "checkout", "-B", deployBranch, "FETCH_HEAD"]);
  } else {
    run("git", ["-C", tmp, "checkout", "--orphan", deployBranch]);
  }

  emptyDirectory(tmp);

  for (const entry of readdirSync(buildDir)) {
    cpSync(join(buildDir, entry), join(tmp, basename(entry)), { recursive: true });
  }

  writeFileSync(join(tmp, ".nojekyll"), "");
  if (existsSync(cnameFile)) {
    cpSync(cnameFile, join(tmp, "CNAME"));
  }

  run("git", ["-C", tmp, "add", "--all"]);

  const diff = tryRun("git", ["-C", tmp, "diff", "--cached", "--quiet"]);
  if (diff.ok) {
    console.log("No deployment changes.");
    process.exit(0);
  }

  run("git", ["-C", tmp, "commit", "-m", `Deploy ${sourceSha.slice(0, 12)}`]);
  run("git", ["-C", tmp, "push", remoteName, `${deployBranch}:${deployBranch}`]);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
