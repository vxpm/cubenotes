# Commands

GX commands are identified by a single byte opcode as described in the following table:

| Opcode      | Name                         |
| ----------- | ---------------------------- |
| 0b0000_0000 | NOP                          |
| 0b0000_1XXX | Set CP register              |
| 0b0001_0XXX | Set XF registers             |
| 0b0010_0XXX | Set XF registers indexed (A) |
| 0b0010_1XXX | Set XF registers indexed (B) |
| 0b0011_0XXX | Set XF registers indexed (C) |
| 0b0011_1XXX | Set XF registers indexed (D) |
| 0b0100_0XXX | Call                         |
| 0b0100_1XXX | Invalidate vertex cache      |
| 0b0110_0001 | Set BP register              |
| 0b1000_0VVV | Draw quads                   |
| 0b1001_0VVV | Draw triangles               |
| 0b1001_1VVV | Draw triangle strip          |
| 0b1010_0VVV | Draw triangle fan            |
| 0b1010_1VVV | Draw lines                   |
| 0b1011_0VVV | Draw line strip              |
| 0b1011_1VVV | Draw points                  |

Where `VVV` is a vertex attribute table index.

These commands are going to be explained in more detail in the following sections. Commands which
require extra data will have a table at the end describing it, with rows in the order data is received.

## NOP

Does nothing.

## Set CP register

Sets a CP register to a given value.

| Size    | Name     |
| ------- | -------- |
| 1 byte  | Register |
| 4 bytes | Value    |

## Set XF registers

Sets XF registers to given values.

| Size                | Name          |
| ------------------- | ------------- |
| 2 bytes             | Length - 1    |
| 2 bytes             | First address |
| (4 \* length) bytes | Values        |

## Set XF indexed

Sets XF registers to given values.

| Size    | Name               |
| ------- | ------------------ |
| 2 bytes | Index              |
| 2 bytes | Length and Address |

The last 2 bytes have the following format:

| Size    | Name          |
| ------- | ------------- |
| 4 bits  | Length - 1    |
| 12 bits | First Address |

## Call

Calls a command list.

| Size    | Name              |
| ------- | ----------------- |
| 4 bytes | Address           |
| 4 bytes | Count (in words?) |

## Invalidate vertex cache

Invalidates the vertex cache.

## Set BP register

Sets a BP register to a given value.

| Size    | Name     |
| ------- | -------- |
| 1 byte  | Register |
| 3 bytes | Value    |

## All drawing commands

Draws a series of primitives.

| Size     | Name              |
| -------- | ----------------- |
| 2 bytes  | Vertex count      |
| Variable | Vertex attributes |
