# Command Processor FIFO

The command processor consumes commands from RAM using a ring buffer mechanism controlled by [a
bunch of registers](../command-processor.md#registers). The FIFO has two modes of operations: linked
and multi-buffer.

## Linked Mode

In this mode, the CP FIFO is linked to the PI FIFO. Whenever a value is written to the PI FIFO,
the value of the CP FIFO write pointer is increased by 4.

This way, whenever a command is written to the PI FIFO the CP can process it immediatly. Of course,
this only really makes sense if the CP FIFO write pointer is the same as the PI FIFO write pointer.

This mode also contains some special logic called "watermark":

- If the CP count becomes smaller than the low watermark, then a CP FIFO underflow interrupt is generated.
- If the CP count is greater than the high watermark, then a a CP FIFO overflow interrupt is generated.

Whenever one of these interrupts is active the CP stops processing new commands.

Watermark essentially allows the CP to signal to the system whether it's close to filling up or
close to running out of commands.

## Multi-buffer Mode

TODO
