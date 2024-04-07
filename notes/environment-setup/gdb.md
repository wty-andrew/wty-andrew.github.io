---
id: gdb
title: GNU Debugger
---

> A powerful tool to examine program execution.

## Issues

### GDB Attach Failed in VSCode

```
==== AUTHENTICATING FOR org.freedesktop.policykit.exec ===
Authentication is needed to run `/usr/bin/gdb’ as the super user
```

Found a solution [here](https://github.com/microsoft/vscode-remote-release/issues/2053) by creating the following pkexec policy

```xml title="/usr/share/polkit-1/actions/com.ubuntu.pkexec.gdb.policy"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE policyconfig PUBLIC
 "-//freedesktop//DTD PolicyKit Policy Configuration 1.0//EN"
 "http://www.freedesktop.org/standards/PolicyKit/1/policyconfig.dtd">
<policyconfig>

  <action id="com.ubuntu.pkexec.gdb-settings">
    <icon_name>gdb-settings</icon_name>
    <defaults>
      <allow_any>yes</allow_any>
      <allow_inactive>yes</allow_inactive>
      <allow_active>yes</allow_active>
    </defaults>
    <annotate key="org.freedesktop.policykit.exec.path">/usr/bin/gdb</annotate>
    <annotate key="org.freedesktop.policykit.exec.allow_gui">true</annotate>
  </action>

</policyconfig>
```

More info about [polkit](https://github.blog/2021-06-10-privilege-escalation-polkit-root-on-linux-with-bug/)
