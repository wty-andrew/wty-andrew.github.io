import React, { useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useContextBridge } from '@react-three/drei'
import URDFLoader from 'urdf-loader'
import useBaseUrl from '@docusaurus/useBaseUrl'
import docusaurusContext from '@docusaurus/context'

const useModel = (name) => {
  const pkgRootUrl = useBaseUrl(`/models/${name}`)
  const [model, setModel] = useState(null)
  useEffect(() => {
    const loader = new URDFLoader()
    loader.packages = {
      clownbot_description: pkgRootUrl,
    }
    loader.load(`${pkgRootUrl}/urdf/${name}.urdf`, (robot) => {
      robot.rotation.x = -Math.PI / 2
      robot.traverse((obj) => (obj.castShadow = true))
      robot.updateMatrixWorld(true)
      setModel(robot)
    })
  }, [name]) // eslint-disable-line
  return model
}

export const StaticModel = () => {
  const urdf = useModel('clownbot')
  return urdf && <primitive object={urdf} dispose={null} />
}

export const DynamicModel = () => {
  const model = useModel('clownbot')
  const maxVel = 0.6 // m/s
  const wheelRadius = 0.04 // m
  const trackRadius = 0.5 // m

  useFrame(({ clock: { elapsedTime } }) => {
    if (model) {
      const wheelAngle = elapsedTime * (maxVel / wheelRadius)
      const theta = elapsedTime * (maxVel / trackRadius)
      model.joints['base_link_to_left_wheel'].setJointValue(wheelAngle)
      model.joints['base_link_to_right_wheel'].setJointValue(wheelAngle)
      model.position.set(
        trackRadius * Math.sin(theta),
        0,
        trackRadius * Math.cos(theta)
      )
      model.rotation.set(-Math.PI / 2, 0, theta)
    }
  })
  return model && <primitive object={model} dispose={null} />
}

export const Viewer = ({ children, ...props }) => {
  const ContextBridge = useContextBridge(docusaurusContext)

  return (
    <Canvas {...props}>
      <ContextBridge>
        <Suspense fallback={null}>
          <OrbitControls />
          <ambientLight intensity={0.15} />
          <directionalLight position={[-4, 5, 1]} />
          {children}
        </Suspense>
      </ContextBridge>
    </Canvas>
  )
}
