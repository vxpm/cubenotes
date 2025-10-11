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

Each input value (A, B, C and D) can be configured to be sourced from one of the following values for
the color operation:

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

And one of the following values for the alpha operation:

| Code | Value            |
| ---- | ---------------- |
| 0x0  | R3A              |
| 0x1  | R0A              |
| 0x2  | R1A              |
| 0x3  | R2A              |
| 0x4  | Texture Alpha    |
| 0x5  | Rasterizer Alpha |
| 0x6  | Constant         |
| 0x7  | Zero             |

The texture and rasterizer colors available to a given stage are also configurable.

### Outputs

The output value (OUT) can only be put into one of the 4 TEV registers (R0, R1, R2 and R3).

## Register formats

### TEV Stage Color

This is the format of the GX registers for TEV stages color configuration:

| Bits   | Name    | Description                                      |
| ------ | ------- | ------------------------------------------------ |
| 0..4   | Input D | Source of input D                                |
| 4..8   | Input C | Source of input C                                |
| 8..12  | Input B | Source of input B                                |
| 12..16 | Input A | Source of input A                                |
| 16..18 | Bias    | Bias value (see below)                           |
| 18     | Negate  | Sign is -1 if set, +1 otherwise                  |
| 19     | Clamp   | Enables clamping                                 |
| 20..22 | Scale   | Scale value (see below)                          |
| 22..24 | Out     | Destination register of output value (see below) |

Bias value selection:

| Code | Value    |
| ---- | -------- |
| 0b00 | 0        |
| 0b01 | +0.5     |
| 0b10 | -0.5     |
| 0b11 | Reserved |

Scale value selection:

| Code | Value |
| ---- | ----- |
| 0b00 | 1     |
| 0b01 | 2     |
| 0b10 | 4     |
| 0b11 | 0.5   |

Destination register selection:

| Code | Value |
| ---- | ----- |
| 0b00 | R3    |
| 0b01 | R0    |
| 0b10 | R1    |
| 0b11 | R2    |

### TEV Stage Alpha

This is the format of the GX registers for TEV stages alpha configuration:

| Bits   | Name            | Description                                             |
| ------ | --------------- | ------------------------------------------------------- |
| 0..2   | Rasterizer swap | Index of swap table to use for rasterizer inputs        |
| 2..4   | Texture swap    | Index of swap table to use for texture inputs           |
| 4..7   | Input D         | Source of input D                                       |
| 7..10  | Input C         | Source of input C                                       |
| 10..13 | Input B         | Source of input B                                       |
| 13..16 | Input A         | Source of input A                                       |
| 16..18 | Bias            | Bias value (see color format)                           |
| 18     | Negate          | Sign is -1 if set, +1 otherwise                         |
| 19     | Clamp           | Enables clamping                                        |
| 20..22 | Scale           | Scale value (see color format)                          |
| 22..24 | Out             | Destination register of output value (see color format) |
