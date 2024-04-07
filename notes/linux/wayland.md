---
id: wayland
title: Wayland
---

> A display server protocol that aims to replace X11.

## Chromium based applications

- add `--ozone-platform-hint=auto` to use wayland if possible
  - or set `environment.sessionVariables.NIXOS_OZONE_WL = "1";` for NixOS
- add `--enable-wayland-ime` to use fcitx (code, spotify, etc)

## Troubleshooting

- use [`xlsclients`](https://linux.die.net/man/1/xlsclients) to list applications running on xwayland (x11 compatibility layer)
- use [`wev`](https://git.sr.ht/~sircmpwn/wev) to log input events (`nix-env -iA nixos.wev`)
