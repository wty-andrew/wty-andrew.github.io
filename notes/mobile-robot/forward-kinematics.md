---
id: forward-kinematics
title: Forward Kinematics
---
import ICCAndRobot from '../../src/diagrams/ICCAndRobot'

Forward kinematics can be used for odometry calculation in mobile robots, we can estimate the new pose of the robot from wheel encoder measurements.

<!--truncate-->

Continued with the state equations from the [unicycle model][1],

$$
\begin{cases}
  \begin{aligned}
    \dot{x}      &= v\cos{\theta} \\
    \dot{y}      &= v\sin{\theta} \\[0.2ex]
    \dot{\theta} &= \omega
  \end{aligned}
\end{cases}
$$

To calculate the robot pose, we take the integration of the differential equations

$$
\begin{aligned}
  x(t)      &= x(0) + \int_0^t v(\tau)\cos{\big(\theta(\tau)\big)}\,\mathrm{d}\tau \\
  y(t)      &= y(0) + \int_0^t v(\tau)\sin{\big(\theta(\tau)\big)}\,\mathrm{d}\tau \\
  \theta(t) &= \theta(0) + \int_0^t \omega(\tau)\,\mathrm{d}\tau
\end{aligned}
$$

or

$$
\begin{aligned}
  x(t_2)      &= x(t_1) + \int_{t_1}^{t_2} v(t)\cos{\big(\theta(t)\big)}\,\mathrm{d}t \\
  y(t_2)      &= y(t_1) + \int_{t_1}^{t_2} v(t)\sin{\big(\theta(t)\big)}\,\mathrm{d}t \\
  \theta(t_2) &= \theta(t_1) + \int_{t_1}^{t_2} \omega(t)\,\mathrm{d}t
\end{aligned}
$$

In practice, the equations can't be solved analytically since measurements can only be taken at distinct time points, we have to discretize the problem.

## Continuous Time to Discrete Time

A differential equation can be numerically approximated by applying [Euler's method][2]

Consider the following differential equation where $x$ represents the state of the system and $u$ represents control inputs,

$$
\frac{\mathrm{d}x}{\mathrm{d}t} = f(x, u)
$$

The first-order Taylor expansion is

$$
x(t + \Delta t) \approx x(t) + f(x, u)\Delta t
$$

If we choose $\Delta t$ to be the sampling interval, then the time variable would be $k\Delta t$ for integer values of $k$

$$
x\big((k+1)\Delta t\big) \approx x(k\Delta t) + f\big(x(k\Delta t), u(k\Delta t)\big)\Delta t
$$

To simplified the notation, denote $t_k \equiv k\Delta t$ and $x_k \equiv x(t_k) = x(k\Delta t)$, we obtain the differene equation

$$
x_{k+1} = x_k + f(x_k, u_k)\Delta t
$$


If we apply the above result directly to the very first state equations, we get

$$
\begin{aligned}
  x_{k+1}      &= x_k + v_k \cos{(\theta_k)}\Delta t \\
  y_{k+1}      &= y_k + v_k \sin{(\theta_k)}\Delta t \\
  \theta_{k+1} &= \theta_k + \omega_k \Delta t
\end{aligned}
$$

## A Better Approximation

We can do better if we start from the integration equations, $v$ and $w$ are still assumed constants during sampling time but not $\theta$ this time

$$
\begin{aligned}
  \theta(t_2) &= \theta(t_1) + \int_{t_1}^{t_2} \omega(t_1)\,\mathrm{d}t = \theta(t_1) + \omega(t_1)(t_2 - t_1) \\[2ex]
  x(t_2)      &= x(t_1) + \int_{t_1}^{t_2} v(t_1)\cos{\big(\theta(t)\big)}\,\mathrm{d}t \\[2ex]
              &= x(t_1) + v(t_1)\int_{t_1}^{t_2} \cos{\big(\theta(t_1) + \omega(t_1)(t - t_1)\big)}\,\mathrm{d}t \\[2ex]
              &= x(t_1) + \frac{v(t_1)}{\omega(t_1)} \left.\sin{\big(\theta(t_1) + \omega(t_1)(t - t_1)\big)}\right|_{t_1}^{t_2} \\[2ex]
              &= x(t_1) + \frac{v(t_1)}{\omega(t_1)} \Big(\sin{\big(\theta(t_1) + \omega(t_1)(t_2 - t_1)}\big) - \sin{\big(\theta(t_1)\big)}\Big) \\[2ex]
  y(t_2)      &= y(t_1) + \int_{t_1}^{t_2} v(t_1)\sin{\big(\theta(t)\big)}\,\mathrm{d}t \\[2ex]
              &= y(t_1) - \frac{v(t_1)}{\omega(t_1)} \Big(\cos{\big(\theta(t_1) + \omega(t_1)(t_2 - t_1)}\big) - \cos{\big(\theta(t_1)\big)}\Big)
\end{aligned}
$$

Now substitute $t_1$ with $t_k$, $t_2$ with $t_{k+1}$, we finally arrived with

$$
\begin{aligned}
  x_{k+1}      &= x_k + \frac{v_k}{\omega_k} \big(\sin{(\theta_k + \omega_k \Delta t}) - \sin{\theta_k}\big) \\
  y_{k+1}      &= y_k - \frac{v_k}{\omega_k} \big(\cos{(\theta_k + \omega_k \Delta t}) - \cos{\theta_k}\big) \\
  \theta_{k+1} &= \theta_k + \omega_k \Delta t
\end{aligned}
$$

There is another way to view the problem, since the position of $\mathrm{ICC} = (x - R\sin{\theta}, y + R\cos{\theta})$

<ICCAndRobot />

We have

$$
\begin{bmatrix}
  x_k - R\sin{\theta_k} \\[1ex]
  y_k + R\cos{\theta_k}
\end{bmatrix}
=
\begin{bmatrix}
  x_{k+1} - R\sin{(\theta_k + \omega_k \Delta t)} \\[1ex]
  y_{k+1} + R\cos{(\theta_k + \omega_k \Delta t)}
\end{bmatrix}
$$

hence

$$
\begin{aligned}
  x_{k+1}      &= x_k + R \big(\sin{(\theta_k + \omega_k \Delta t}) - \sin{\theta_k}\big) \\
  y_{k+1}      &= y_k - R \big(\cos{(\theta_k + \omega_k \Delta t}) - \cos{\theta_k}\big)
\end{aligned}
$$

substitute $R = \frac{v_k}{\omega_k}$ gives the same result

## Odometry Calculation

Most wheel encoders provide us with the tick counts information, the tick might be a change in magnetic field for hall effect encoders or a signal received from photodetector for optical encoders, assume each wheel has $N$ ticks per revolution, the wheel angular velocity is

$$
\phi = 2\pi \frac{\Delta \mathrm{tick}}{N}
$$

Recall the relationship between [unicycle model][1] and [differential drive model][3]

$$
\begin{cases}
  \begin{aligned}
    v      &= \frac{v_R + v_L}{2} = \frac{r}{2}(\phi_R + \phi_L) \\[2ex]
    \omega &= \frac{v_R - v_L}{L} = \frac{r}{L}(\phi_R - \phi_L)
  \end{aligned}
\end{cases}
$$

Now we know how to turn wheel encoder measurments to robot movements

Finally here's a real world implementation taken from [gazebo diff drive plugin][4]

```cpp title="gazebo_ros_pkgs/gazebo_plugins/src/gazebo_ros_diff_drive.cpp" {22,23}
void GazeboRosDiffDrive::UpdateOdometryEncoder()
{
    double vl = joints_[LEFT]->GetVelocity ( 0 );
    double vr = joints_[RIGHT]->GetVelocity ( 0 );
#if GAZEBO_MAJOR_VERSION >= 8
    common::Time current_time = parent->GetWorld()->SimTime();
#else
    common::Time current_time = parent->GetWorld()->GetSimTime();
#endif
    double seconds_since_last_update = ( current_time - last_odom_update_ ).Double();
    last_odom_update_ = current_time;

    double b = wheel_separation_;

    // Book: Sigwart 2011 Autonompus Mobile Robots page:337
    double sl = vl * ( wheel_diameter_ / 2.0 ) * seconds_since_last_update;
    double sr = vr * ( wheel_diameter_ / 2.0 ) * seconds_since_last_update;
    double ssum = sl + sr;

    double sdiff = sr - sl;

    double dx = ( ssum ) /2.0 * cos ( pose_encoder_.theta + ( sdiff ) / ( 2.0*b ) );
    double dy = ( ssum ) /2.0 * sin ( pose_encoder_.theta + ( sdiff ) / ( 2.0*b ) );
    double dtheta = ( sdiff ) /b;

    pose_encoder_.x += dx;
    pose_encoder_.y += dy;
    pose_encoder_.theta += dtheta;

    double w = dtheta/seconds_since_last_update;
    double v = sqrt ( dx*dx+dy*dy ) /seconds_since_last_update;

    // ...
}
```

Most of the lines are direct translations from equations, the only different part are highlighted,

$$
\begin{aligned}
  \Delta x &= \frac{v_L + v_R}{2}\Delta t \cos{(\theta + \frac{v_R - v_L}{2 L})} = v \cos{(\theta + \frac{\omega}{2})} \Delta t \\[2ex]
  \Delta y &= v \sin{(\theta + \frac{\omega}{2})} \Delta t
\end{aligned}
$$

They are very close to the result of our first attempt,

$$
\begin{aligned}
  x_{k+1}      &= x_k + v_k \cos{(\theta_k)}\Delta t \\
  y_{k+1}      &= y_k + v_k \sin{(\theta_k)}\Delta t \\
\end{aligned}
$$

It seems they use the trapezoidal rule for approximation.

[1]: differential-drive-robot-model.md#unicycle-model
[2]: https://en.wikipedia.org/wiki/Euler_method
[3]: differential-drive-robot-model.md#differential-drive-model
[4]: https://github.com/ros-simulation/gazebo_ros_pkgs/blob/melodic-devel/gazebo_plugins/src/gazebo_ros_diff_drive.cpp#L341
