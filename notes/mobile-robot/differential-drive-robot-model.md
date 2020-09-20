---
id: differential-drive-robot-model
title: Differential Drive Robot Model
---
import DiffDriveModel from '../../src/diagrams/DiffDriveModel'

A robot model can describe the relations between control inputs and the robot state, in the case of differential drive mobile robot, it tells us how robot moves based on the given wheel speed.

<!--truncate-->

Below is a diagram of a differential drive robot

<DiffDriveModel />

$$
\begin{array}{l|l}
  \text{Symbol} & \text{Description} \\
  \hline
  L             & \text{wheel separation (axle length)} \\
  r             & \text{wheel radius} \\
  \phi          & \text{wheel angular velocity} \\
  v_L, v_R      & \text{the linear velocity of the left/right wheel} \\
  \omega        & \text{robot angular velocity} \\
  \text{ICC}    & \text{instantaneous center of curvature} \\
  R             & \text{instantaneous curvature radius of the robot trajectory} \\
\end{array}
$$

From the above diagram, we have

$$
\begin{cases}
  \begin{aligned}
    v_R &= \omega (R + \frac{L}{2}) \\[2ex]
    v_L &= \omega (R - \frac{L}{2})
  \end{aligned}
\end{cases}

\implies

\begin{cases}
  \begin{aligned}
    \omega &= \frac{v_R - v_L}{L} \\[2ex]
    R      &= \frac{L}{2} \frac{v_R + v_L}{v_R - v_L}
  \end{aligned}
\end{cases}
\quad\text{and}\quad v = \omega R = \frac{v_R + v_L}{2}
$$

## Unicycle Model

The unicycle model uses $v$ and $\omega$ as the control inputs. The state of the robot can be described by $[x, y, \theta]^\mathsf{T} \in \mathbb{R}^3$, how it changes over time can be written as

$$
\begin{cases}
  \begin{aligned}
    \dot{x}      &= v\cos{\theta} \\
    \dot{y}      &= v\sin{\theta} \\[0.2ex]
    \dot{\theta} &= \omega
  \end{aligned}
\end{cases}

\implies

\begin{bmatrix}
  \dot{x}(t) \\[1ex]
  \dot{y}(t) \\[1.2ex]
  \dot{\theta}(t)
\end{bmatrix}
=
\begin{bmatrix}
  \cos{\big(\theta(t)\big)} & 0 \\[1ex]
  \sin{\big(\theta(t)\big)} & 0 \\[1ex]
                0 & 1
\end{bmatrix}

\begin{bmatrix}
  v(t) \\[1ex]
  \omega(t)
\end{bmatrix}
$$

The controls have correspondence with `geometry_msgs/Twist` message type used for velocity commands

```txt title="/opt/ros/melodic/share/geometry_msgs/msg/Twist.msg"
# This expresses velocity in free space broken into its linear and angular parts.
Vector3  linear
Vector3  angular
```

## Differential Drive Model

Eventually we can only send wheel velocities to the driver, since $v_R = r\phi_R$ and $v_L = r\phi_L$, we have

$$
\begin{cases}
  \begin{aligned}
    v      &= \frac{v_R + v_L}{2} = \frac{r}{2}(\phi_R + \phi_L) \\[2ex]
    \omega &= \frac{v_R - v_L}{L} = \frac{r}{L}(\phi_R - \phi_L)
  \end{aligned}
\end{cases}

\implies

\begin{cases}
  \begin{aligned}
    \phi_R &= \frac{2v + \omega L}{2r} \\[2ex]
    \phi_L &= \frac{2v - \omega L}{2r}
  \end{aligned}
\end{cases}
$$

So control inputs $\phi_R$, $\phi_L$ and control inputs $v$, $\omega$ are actually equivalent

$$
\begin{bmatrix}
  \dot{x}(t) \\[1ex]
  \dot{y}(t) \\[1.2ex]
  \dot{\theta}(t)
\end{bmatrix}
=
\begin{bmatrix}
  \cos{\big(\theta(t)\big)} & 0 \\[1ex]
  \sin{\big(\theta(t)\big)} & 0 \\[1ex]
                0 & 1
\end{bmatrix}

\begin{bmatrix}
  v(t) \\[1ex]
  \omega(t)
\end{bmatrix}
=
\begin{bmatrix}
  \cos{\big(\theta(t)\big)} & 0 \\[1ex]
  \sin{\big(\theta(t)\big)} & 0 \\[1ex]
                0 & 1
\end{bmatrix}

\begin{bmatrix}
   \frac{r}{2} & \frac{r}{2} \\[1ex]
  -\frac{r}{L} & \frac{r}{L}
\end{bmatrix}

\begin{bmatrix}
  \phi_L(t) \\[1ex]
  \phi_R(t)
\end{bmatrix}
$$
