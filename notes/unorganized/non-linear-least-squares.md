---
id: non-linear-least-squares
title: Non-Linear Least Squares
hide_title: true
---

## Notation

$$
Ax =
\begin{bmatrix}
  a_{11} & a_{12} & \cdots & a_{1n} \\
  a_{21} & a_{22} & \cdots & a_{2n} \\
  \vdots & \vdots & \ddots & \vdots \\
  a_{n1} & a_{n2} & \cdots & a_{nn}
\end{bmatrix}_{n \times n}

\begin{bmatrix}
  x_1 \\ x_2 \\ \vdots \\ x_n
\end{bmatrix}_{n \times 1}
=
\begin{bmatrix}
  \sum^n_{i=1} a_{1i}x_i \\ \vdots \\ \sum^n_{i=1} a_{ni}x_i
\end{bmatrix}_{n \times 1}
$$

$$
\frac{\partial Ax}{\partial x_k} =
\begin{bmatrix}
  a_{1k} \\ \vdots \\ a_{nk}
\end{bmatrix}
\implies \frac{\partial Ax}{\partial x} =
\begin{bmatrix}
  a_{11} & a_{12} & \cdots \\
  \vdots & \ddots &        \\
  a_{n1} &        &  a_{nn}
\end{bmatrix}
= A
$$

$$
x^\top Ax =
\begin{bmatrix}
  x_1 & \cdots & x_n
\end{bmatrix}

\begin{bmatrix}
  \sum^n_{i=1} a_{1i}x_i \\ \vdots \\ \sum^n_{i=1} a_{ni}x_i
\end{bmatrix}
= \sum^n_{j=1}(x_j \sum^n_{i=1}a_{ji}x_i)
$$

$$
\begin{aligned}
  \frac{\partial{x^\top Ax}}{\partial x_k} &= \sum^n_{i=1}a_{ki}x_i + \sum^n_{j=1}x_j a_{jk} = \sum^n_{i=1}x_i(a_{ki} + a_{ik}) \\
                                           &=
  \begin{bmatrix}
    x_1 & \cdots & x_n
  \end{bmatrix}

  \begin{bmatrix}
    a_{1k} + a_{k1} \\ \vdots \\ a_{nk} + a_{kn}
  \end{bmatrix} \\

  \implies \frac{\partial{x^\top Ax}}{\partial x} &= x^\top (A + A^\top)
\end{aligned}
$$

## Least Square Problems

$$
\begin{aligned}
  F(x) &= \sum^m_{i=1} f_i(x)^2 = \lVert f(x) \rVert^2 = f(x)^\top f(x) \qquad x =
    \begin{bmatrix}
      x_1 & \cdots & x_n
    \end{bmatrix}^\top \\
  x^*  &= \argmin_x F(x)
\end{aligned}
$$

## Linear Least Square

$$
\underset{m\times 1}{f(x)} = \underset{m\times n}{\vphantom{f(x)}A}\enspace\underset{n\times 1}{\vphantom{f(x)}x} - \underset{m\times 1}{\vphantom{f(x)}b}
$$

$$
\begin{aligned}
  F(x) &= f(x)^\top f(x) = (Ax - b)^\top (Ax - b) \\
       &= x^\top A^\top Ax - \underset{1 \times m}{(x^\top A^\top)}\underset{m \times 1}{\vphantom{(}b} - \underset{1 \times m}{\vphantom{(}b^\top}\underset{m \times 1}{(Ax)} + b^\top b \\
       &= x^\top A^\top Ax - 2b^\top Ax + b^\top b
\end{aligned}
$$

$$
\begin{aligned}
           & \frac{\partial{F(x)}}{\partial x} = 0 \\
  \implies & x^\top (A^\top A + (A^\top A)^\top) - 2b^\top A = 0 \\
  \implies & A^\top Ax = A^\top b \\
  \implies & x = (A^\top A)^{-1} A^\top b \\
\end{aligned}
$$

## Non-Linear Least Square

$$
\begin{aligned}
  f(x + \Delta x) &= f(x) + f'(x)\Delta x + \frac{1}{2!}f''(x)\Delta x^2 + \text{HOT} \\
  f(x + \Delta x) &= f(x) + \sum_{i=1}\frac{\partial{f}}{\partial{x_i}}\Delta x_i + \frac{1}{2!}\sum_{i=1}\sum_{j=1} \frac{\partial^2 f}{\partial{x_i}\partial{x_j}}\Delta x_i\Delta x_j + \text{HOT}
\end{aligned}
$$

denote $F(x) = \sum^m_{i=1} e_i(x)^2 = \lVert e(x) \rVert^2 = e(x)^\top e(x)$ instead of $f(x)^\top f(x)$ to avoid confusion

$$
\begin{aligned}
  \frac{\partial F}{\partial x_i} &= 2\sum_{j=1}e_j\underbrace{\frac{\partial{e_j}}{\partial{x_i}}}_{J_{ji}} \\
  \frac{\partial^2 F}{\partial x_i\partial x_j} &= 2\sum_{k=1}(\underbrace{\frac{\partial e_k}{\partial x_j}\frac{\partial e_k}{\partial x_i}}_{J_{kj}J_{ki} = H_{k_{ij}}} + e_k \underbrace{\frac{\partial^2 e_k}{\partial x_i \partial x_j}}_{\text{assume }\to\; 0} )
\end{aligned}
$$

$$
\begin{aligned}
  e(x + \Delta x) &= e(x) + \sum^m_{i=1}\frac{\partial e}{\partial{x_i}}\Delta x_i + \text{HOT} \\
                  &\approx e(x) + \mathbf{J}\Delta x\qquad \mathbf{J} =
                    \begin{bmatrix}
                      \frac{\partial e}{\partial x_1} & \cdots & \frac{\partial e}{\partial x_n}
                    \end{bmatrix}
\end{aligned}
$$

$$
\begin{aligned}
  F(x + \Delta x) &\approx \big(e(x) + \mathbf{J}\Delta x\big)^\top \big(e(x) + \mathbf{J}\Delta x\big) \\
                  &= e(x)^\top e(x) + e(x)^\top \mathbf{J}\Delta x + \Delta x^\top \mathbf{J}^\top e(x) + \Delta x^\top\mathbf{J}^\top\mathbf{J}\Delta x \\
                  &= \underbrace{e(x)^\top e(x)}_{c} + 2 \underbrace{e(x)^\top\mathbf{J}}_{b^\top}\Delta x + \Delta x^\top\underbrace{\mathbf{J}^T\mathbf{J}}_{\mathbf{H}}\Delta x \\
                  &= G(\Delta x)
\end{aligned}
$$

$$
\begin{aligned}
           & x^* = \argmin_x F(x) = x + \Delta x^* \\
  \implies & \Delta x^* = \argmin_{\Delta x} G(\Delta x)
\end{aligned}
$$

$$
\begin{aligned}
           & G'(\Delta x) = 2\mathbf{H}\Delta x + 2b \\
           & G''(\Delta x) = 2\mathbf{H} \qquad\text{H is positive definite} \\
  \implies & G'(\Delta x^*) = 0 \\
  \implies & \mathbf{H}\Delta x^* = -b \\
  \implies & x^* = x + \Delta x^*
\end{aligned}
$$

## Gradient Descent, Gauss-Newton, Levenberg-Marquardt

$$
\begin{aligned}
  x_{k + 1} &= x_k - \epsilon J^\top f \\
  x_{k + 1} &= x_k - H^{-1}J^\top f \\
  x_{k + 1} &= x_k - (H + \lambda I)^{-1}J^\top f \\
\end{aligned}
$$

$$
\begin{aligned}
  \lambda & \to 0      \qquad && \text{Newton} \\
  \lambda & \to \infty \qquad && \text{Gradient Descent} \\
\end{aligned}
$$
