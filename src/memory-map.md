# Memory Map

The GameCube's physical memory map is as follows:

| Address Range            | Size   | Region          |
| ------------------------ | ------ | --------------- |
| 0x0000_0000..0x0180_0000 | 24 MiB | RAM             |
| 0x0C00_0000..0x0C00_1000 | 4 KiB  | CP Registers    |
| 0x0C00_1000..0x0C00_2000 | 4 KiB  | PE Registers    |
| 0x0C00_2000..0x0C00_3000 | 4 KiB  | VI Registers    |
| 0x0C00_3000..0x0C00_4000 | 4 KiB  | PI Registers    |
| 0x0C00_4000..0x0C00_5000 | 4 KiB  | MI Registers    |
| 0x0C00_5000..0x0C00_6000 | 4 KiB  | DSPI Registers  |
| 0x0C00_6000..0x0C00_6400 | 1 KiB  | DI Registers    |
| 0x0C00_6400..0x0C00_6800 | 1 KiB  | SI Registers    |
| 0x0C00_6800..0x0C00_6C00 | 1 KiB  | EXI Registers   |
| 0x0C00_6C00..0x0C00_6C10 | 32 B   | AI Registers    |
| 0x0C00_6C00..0x0C00_8000 | 32 B   | GX FIFO         |
| 0xE000_0000..0xE000_4000 | 16 KiB | Scratchpad      |
| 0xFFF0_0000..            | 1 MiB  | IPL (First MiB) |

Real addressing mode is, however, very uncommon. Most games use memory address translation in order
to map a logical address to a physical one.

## Reserved RAM regions

In the PowerPC architecture, some predefined regions of RAM are reserved for specific usages:

| Address Range            | Size     | Purpose                 |
| ------------------------ | -------- | ----------------------- |
| 0x0000_0000..0x0000_0100 | 256 B    | Reserved for the OS     |
| 0x0000_0100..0x0000_1000 | 3.75 KiB | Exception Vectors       |
| 0x0000_1000..0x0000_3000 | 8 KiB    | Implementation Specific |

Dolphin OS uses the implementation specific region as an extension to the exception vectors region.
