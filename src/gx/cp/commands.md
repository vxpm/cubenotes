# Commands

GX commands are identified by a single byte opcode as described in the following table:

| Opcode      | Name                        |
| ----------- | --------------------------- |
| 0b0000_0000 | NOP                         |
| 0b0000_1XXX | Load CP registers           |
| 0b0001_0XXX | Load XF registers           |
| 0b0010_0XXX | Load XF registers indexed A |
| 0b0010_1XXX | Load XF registers indexed B |
| 0b0011_0XXX | Load XF registers indexed C |
| 0b0011_1XXX | Load XF registers indexed D |
| 0b0100_0XXX | Call                        |
| 0b0100_1XXX | Invalidate vertex cache     |
| 0b0110_AAAA | SU bypass command           |
| 0b1000_0VVV | Draw quads                  |
| 0b1001_0VVV | Draw triangles              |
| 0b1001_1VVV | Draw triangle strip         |
| 0b1010_0VVV | Draw triangle fan           |
| 0b1010_1VVV | Draw lines                  |
| 0b1011_0VVV | Draw line strip             |
| 0b1011_1VVV | Draw points                 |

Where `VVV` is a vertex attribute table and `AAAA` is a SU attribute.
