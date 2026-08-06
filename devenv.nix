{ pkgs, lib, config, inputs, ... }:

{
  packages = [
    pkgs.git
    pkgs.nodejs
  ];

  scripts.build.exec = "npm run build";
  scripts.dev.exec = "npm run dev";
  scripts.deploy.exec = "npm run deploy";
  processes.site.exec = "npm run dev";
}
