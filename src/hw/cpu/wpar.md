# Write Gather Pipe

The write gather pipe is a CPU mechanism for transferring bursts of 32-byte data to external memory.
It has a 128 byte ring buffer and is controlled by the `HID2` and `WPAR` registers.

## Registers

### WPAR (SPR 921)

| Bits  | Name           | Description                                                     |
| ----- | -------------- | --------------------------------------------------------------- |
| 0     | BNE            | Whether the ring buffer has data (Buffer Not Empty) (Read Only) |
| 1..5  |                | Reserved                                                        |
| 5..32 | Gather Address | High order bits of the address to gather writes from            |

### Operation

It operates by redirecting any writes to the gather address to the internal ring buffer. Once the
buffer has 32 bytes of data or more, the write gather pipe will actually transfer the data to
memory (in chunks of 32 bytes). The destination is the same address - the write gather pipe acts
as a proxy between the CPU and the external memory.

```admonish
The write gather pipe packs writes - it does not insert any sort of padding in order to "align"
values in the internal buffer
```

In the GameCube, it is always pointed at the address of the PI FIFO (`0x0C00_8000`) and is used to
build display lists.
