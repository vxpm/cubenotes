# Texture Environment (TEV)

The texture environment (TEV) is responsible for blending vertex colors and textures through a fixed
function pipeline of at most 16 stages. These stages are the closest thing to shaders in the GX.

## Stages

A TEV stage performs a configurable operation on some color inputs and generates an output color that
can be fed into the next stage. Stages are executed sequentially. The output of the last stage is
the final color.

The TEV has a set of 4 registers, called R0, R1, R2 and R3 (also called PREV), which are shared
between all stages and can be used as either input or output of each one of them. Since the color
and alpha components are computed separatedly, they can be referred to as R0C, R0A, R1C, R1A, etc.

TEV stages operate on normalized floating-point RGBA color values (i.e. each channel has a value in
[0, 1]). The alpha channel is special and can be configured separatedly.

Each TEV stage has 4 input values A, B, C and D. It has only one output, which will be called OUT.
The operation of a TEV stage is always of the following form:

```C
value = [sign * (A * (1.0 - C) + B * C) + D + bias] * scale
if (clamp)
    OUT = clamp(value)
else
    OUT = value
```

In the operation, `sign`, `bias`, `scale` and `clamp` are configurable:

| Variable | Possible values   |
| -------- | ----------------- |
| Sign     | 1 and -1          |
| Bias     | 0, 0.5 and -0.5   |
| Scale    | 0.5, 1, 2 and 4   |
| Clamp    | 0 and 1 (boolean) |

### Inputs

Each input value (A, B, C and D) can be configured to be one of the following values:

| Code | Value            |
| ---- | ---------------- |
| 0x0  | R3C              |
| 0x1  | R3A              |
| 0x2  | R0C              |
| 0x3  | R0A              |
| 0x4  | R1C              |
| 0x5  | R1A              |
| 0x6  | R2C              |
| 0x7  | R2A              |
| 0x8  | Texture Color    |
| 0x9  | Texture Alpha    |
| 0xA  | Rasterizer Color |
| 0xB  | Rasterizer Alpha |
| 0xC  | One              |
| 0xD  | One half         |
| 0xE  | Constant         |
| 0xF  | Zero             |

### Outputs

The output value (OUT) can only be put into one of the 4 TEV registers (R0, R1, R2 and R3).
