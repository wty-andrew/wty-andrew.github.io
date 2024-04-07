---
id: nixos
title: NixOS
---

> A declarative Linux distribution built on top of the Nix package manager.

## Recipes

### Override python package dependencies

Some python packages come with [extra](https://peps.python.org/pep-0508/#extras) dependencies that are not included in the derivation from nixpkgs. Take [shell_gpt](https://github.com/TheR1D/shell_gpt) for example, it requires [litellm](https://github.com/BerriAI/litellm) to use ollama backend, which can be added with the following override:

```nix
(shell_gpt.overrideAttrs (oldAttrs: {
  propagatedBuildInputs = oldAttrs.propagatedBuildInputs ++ [ pkgs.python3.pkgs.litellm ];
}))
```
