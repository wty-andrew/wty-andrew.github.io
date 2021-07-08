---
id: roslisp-usage
title: Roslisp Usage
---
import Snippet from '../../src/components/Snippet'

Supplement to [roslisp wiki](http://wiki.ros.org/roslisp/Overview)

## Manage Node

### `start-ros-node`

<Snippet>

```lisp
(start-ros-node "node_name")
```

After the node starts, `*node-status*` will be set to `:running`

</Snippet>

### `shutdown-ros-node`

```lisp
(shutdown-ros-node)
```

### `with-ros-node`

```lisp
(with-ros-node ("node_name")
  (...))

;; for long running task/service, use:
(with-ros-node ("node_name" :spin t)
  (...))
```

### `node-status`

```lisp
(node-status)
;; returns either :running or :shutdown
```

## Messages

### `make-message`

```lisp
;; use symbol as msg-type
(make-message 'std_msgs-msg:String
              :data "Hello World")

;; use string as msg-type
(make-message "std_msgs/String"
              :data "Hello World")

;; fill in nested fields
(make-message "geometry_msgs/PoseStamped"
              :header (make-message "std_msgs/Header"
                                    :frame_id "map")
              (:w :orientation :pose) 1.0)
```

### `symbol-codes`

```lisp
;; use symbol as msg-type
(symbol-codes 'sensor_msgs-msg:Range)

;; use instance as msg-type
(symbol-codes (make-message "sensor_msgs/Range"))

;; returns: ((:ULTRASOUND . 0) (:INFRARED . 1))
```

### `symbol-code`

```lisp
(symbol-code 'sensor_msgs-msg:Range :ultrasound)
;; returns: 0
```

### `code-symbols`

```lisp
(code-symbols 'visualization_msgs-msg:Marker 0)
;; returns: ((:ARROW . 0) (:ADD . 0) (:MODIFY . 0))
```

### `code-symbol`

```lisp
(code-symbol 'visualization_msgs-msg:Marker 0)
;; returns: :ARROW (first found)
```

## Time

### `ros-time`

<Snippet>

```lisp
(ros-time)
;; returns the number of seconds since January 1st, 1970
```

It uses `sb-ext:get-time-of-day` under the hood

</Snippet>

## Logging

### `ros-info`

<Snippet>

```lisp
(ros-info (foo bar) "Hello, ~A" "World")
;; outputs: [(FOO BAR) INFO] 1625730154.129: Hello, World

(ros-info (monitor) (< battery-level 20) "Battery Low")
;; The second argument can be a condition, works like `ROS_INFO_COND` in roscpp
```

The same for `ros-debug`, `ros-warn`, `ros-error`, and `ros-fatal`

</Snippet>
