{ pkgs, lib, config, inputs, ... }:

{
  packages = [
    pkgs.git
    pkgs.nodejs
  ];

  scripts.build.exec = "npm run build";
  scripts.dev.exec = "npm run dev";

  processes.site.exec = "npm run dev";
}
