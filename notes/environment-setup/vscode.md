---
id: vscode
title: Visual Studio Code
---

> A code editor developed by Microsoft.

## Setup

### Keyboard Mapping for Terminal

The problem with keyboard input on terminals are described [here](http://www.leonerd.org.uk/hacks/fixterms/), which can be fixed with [custom sequence keybindings](https://code.visualstudio.com/docs/terminal/advanced#_custom-sequence-keybindings), e.g.:

```json
[
  {
    "key": "ctrl+tab",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "\u001b[9;5u" },
    "when": "terminalFocus"
  },
  {
    "key": "ctrl+shift+tab",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "\u001b[9;6u" },
    "when": "terminalFocus"
  }
]
```
