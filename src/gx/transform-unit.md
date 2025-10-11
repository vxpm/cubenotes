# Transform Unit (XF)

The transform unit (XF) is responsible for performing transformations on positions, normals and even
texture coordinates.

## Internal memory

Addressable unit is a word (4 bytes), address space is 16-bit.

| Address Range  | Size  | Region                               |
| -------------- | ----- | ------------------------------------ |
| 0x0000..0x0100 | 1 KiB | Position matrix memory               |
| 0x0400..0x0460 | 96 B  | Normal matrix memory                 |
| 0x0500..0x0600 | 256 B | Dual texture transform matrix memory |
| 0x0600..0x0680 | 128 B | Light memory                         |
| 0x1000..0x1057 | 128 B | Internal registers                   |

Normal memory and light memory only keep the 20 most significant bits of written values.

### Position matrix memory

This region is organized as 64 groups of 4 words. Each group represents a column in a matrix, and
each column can be used as the beginning of a 4x3 matrix.

Example matrix starting at 0x0000 (values are offsets):

```
00 04 08
01 05 09
02 06 10
03 07 11
```

Matrix beginning at 0x0000 is usually the position matrix.

### Normal matrix memory

This region is organized as 32 groups of 3 words. Each group represents a column in a matrix, and
each column can be used as the beginning of a 3x3 matrix.

### Dual texture transform matrix memory

This region is organized exactly the same as the position matrix memory.

### Light memory

Contains all lighting information.
