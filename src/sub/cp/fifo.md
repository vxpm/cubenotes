# Command Processor FIFO

The command processor has a FIFO mechanism that builds and consumes ring buffers of commands in RAM,
controlled by [a bunch of registers](../command-processor.md#registers).

The FIFO has two modes of operations: linked and multi-buffer.

## Linked Mode

In this mode, the CP FIFO is linked to the PI FIFO. Whenever a value is written to the PI ring buffer,
the value is also written to the ring buffer pointed to by the CP write pointer.

This mode also contains some special logic called "watermark":

- If the CP count becomes smaller than the low watermark, then a CP FIFO underflow interrupt is generated.
- If the CP count is greater than the high watermark, then a a CP FIFO overflow interrupt is generated.

Whenever one of these interrupts is active the CP stops processing new commands.

Watermark essentially allows the CP to signal to the system whether it's close to filling up or
close to running out of commands.

## Multi-buffer Mode

TODO
