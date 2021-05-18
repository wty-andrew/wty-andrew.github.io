---
id: r3f-urdf
title: Load URDF with React Three Fiber
---
import { Plane } from '@react-three/drei'
import { useURDFModel, StaticModel, DynamicModel, Viewer } from '../../src/diagrams/RobotViewer'

<div style={{ height: 400 }}>
  <Viewer camera={{ position: [0.2, 0.2, 0.2] }}>
    <StaticModel />
  </Viewer>
</div>

[URDF][1] is the abbreviation of Unified Robot Description Format, which is an XML format for representing a robot model in ROS, we can display a model like above in browser with [react three fiber][2][^1] through [urdf-loaders][2].

In URDF, the location of a mesh file is specified under the `filename` attribute of a mesh element with the format: `package://<package_name>/path/to/<mesh_name>`, for example:

```xml title="my_pkg/urdf/foo.urdf" {3}
...
<geometry>
  <mesh filename="package://my_pkg/meshes/bar.dae"/>
</geometry>
...
```

However, URDF Loader doesn't know where to fetch the mesh files from the given path, we have two options:
- edit the URDF file by replacing all the `package://<package_name>` part with the relative path
- use the `packages` option[^2] of URDF Loader to resolve the paths

## Setup

Consider the following ROS package structure

```txt {3-7}
my_pkg/
├── launch/
├── meshes/
│   ├── bar.dae
│   └── baz.dae
├── urdf/
│   └── foo.urdf
├── CMakeLists.txt
└── package.xml
```

The mesh/URDF files should be copied into the public (static assets) folder of web server, assume no prefix for static files url

```txt {4-10}
app/
├── src/
├── public/
│   ├── models/
│   │   └── foo/
│   │       ├── meshes/
│   │       │   ├── bar.dae
│   │       │   └── baz.dae
│   │       └── urdf/
│   │           └── foo.urdf
│   └── index.html
└── package.json
```

### Option 1

Simply change all the occurrence of `package://my_pkg` to `..` in URDF file, then use the `useLoader` hook from r3f

```tsx
import React from 'react'
import { useLoader } from '@react-three/fiber'
import URDFLoader, { URDFRobot } from 'urdf-loader'

const FOO_URDF_URL = './models/foo/urdf/foo.urdf'

const Model: React.FC = () => {
  const robot: URDFRobot = useLoader(URDFLoader as any, FOO_URDF_URL)
  // do whatever setup with the robot...
  return <primitive object={robot} />
}
```

### Option 2

We need to initialize `URDFLoader` ourselves in order to remap the packages, basically create a dumb version of `useLoader`, it doesn't have suspense / cache support so is less convenient

```tsx {8-10}
import React, { useEffect, useState } from 'react'
import URDFLoader, { URDFRobot } from 'urdf-loader'

const Model: React.FC = () => {
  const [robot, setRobot] = useState<URDFRobot>()
  useEffect(() => {
    const loader = new URDFLoader()
    loader.packages = {
      my_pkg: './models/foo',
    }
    loader.load(`./models/foo/urdf/foo.urdf`, (robot) => {
      // do whatever setup with the robot...
      setRobot(robot)
    })
  }, [])
  return robot && <primitive object={robot} />
}
```

## Make the Model Move

`URDFRobot` extends `Object3D`, it also provides the `setJointValue` function that would take joint type into account.

Here's an example that changes the robot position and wheel joint values

```tsx
const maxVel = 0.6
const wheelRadius = 0.04
const trackRadius = 0.5

const Model = () => {
  // load robot as above ...

  useFrame(({ clock: { elapsedTime } }) => {
    if (robot) {
      // the wheels should really rotate at different speed to make the
      // robot turn, but my eyes don't tell the difference anyway
      const wheelAngle = elapsedTime * (maxVel / wheelRadius)
      const theta = elapsedTime * (maxVel / trackRadius)
      robot.joints['base_link_to_left_wheel'].setJointValue(wheelAngle)
      robot.joints['base_link_to_right_wheel'].setJointValue(wheelAngle)
      robot.position.set(trackRadius * Math.sin(theta), 0, trackRadius * Math.cos(theta))
      robot.rotation.set(-Math.PI / 2, 0, theta)
    }
  })
  return robot && <primitive object={robot} />
}
```

<div style={{ height: 400 }}>
  <Viewer camera={{ position: [0, 1.2, 1.2] }}>
    <Plane args={[2, 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial color="#ffb385" />
    </Plane>
    <DynamicModel />
  </Viewer>
</div>

## Notes
- When doubt about the path, just open developer tools and switch to the network tab to see if the request url is correct
- The default coordinate system in [three.js][4] have y-axis pointing up instead of z-axis like in most conventions, just rotate the model in x-axis by `-Math.PI / 2`


[1]:http://wiki.ros.org/urdf
[2]:https://github.com/pmndrs/react-three-fiber
[3]:https://github.com/gkjohnson/urdf-loaders
[4]:https://threejs.org/

[^1]: A react renderer for [three.js][4]
[^2]: The packages option is documented [here](https://github.com/gkjohnson/urdf-loaders/tree/master/javascript#packages)
