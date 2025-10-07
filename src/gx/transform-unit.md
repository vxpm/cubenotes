# Transform Unit (XE)

## Internal memory

Addressable unit is a word (4 bytes), address space is 16-bit.

| Address Range  | Size  | Region                          |
| -------------- | ----- | ------------------------------- |
| 0x0000..0x0400 | 1 KiB | Matrix memory                   |
| 0x0400..0x0460 | 96 B  | Normal memory (?)               |
| 0x0500..0x0600 | 256 B | Dual texture transform matrices |
| 0x0600..0x0680 | 128 B | Light memory                    |
| 0x1000..0x1057 | 128 B | Internal registers              |

Normal memory and light memory only keep the 20 most significant bits of written values.
