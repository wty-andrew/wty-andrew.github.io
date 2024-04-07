---
id: alacritty
title: Alacritty
---

> A GPU-accelerated terminal emulator written in Rust

## Setup

### Keyboard Mappings

The problem with keyboard input on terminals are described [here](http://www.leonerd.org.uk/hacks/fixterms/), which can be fixed with [keyboard mappings](https://github.com/alacritty/alacritty/wiki/Keyboard-mappings), e.g.:

```toml
[keyboard]

bindings = [
  { key = "I", mods = "Control", chars = "\u001b[105;5u" },
  { key = "Tab", mods = "Control", chars = "\u001b[9;5u" },
  { key = "Tab", mods = "Control | Shift", chars = "\u001b[9;6u" },
  # ...
]
```

[`showkey -a`](https://kbd-project.org/manpages/man1/showkey.1.html) can be very useful to find the keycode and verify the mappings.

### Display Emoji

Install `Noto Color Emoji` and then add following content to `$XDG_CONFIG_HOME/fontconfig/fonts.conf`[^1]:

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias>
   <family>sans-serif</family>
   <prefer>
     <family>Noto Color Emoji</family>
   </prefer>
  </alias>

  <alias>
   <family>serif</family>
   <prefer>
     <family>Noto Color Emoji</family>
   </prefer>
  </alias>

  <alias>
    <family>monospace</family>
    <prefer>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>
</fontconfig>
```

[^1]: from https://github.com/alacritty/alacritty/issues/153#issuecomment-1030653239
