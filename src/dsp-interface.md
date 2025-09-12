# DSP Interface (DSPI)

The DSP interface controls the DSP in the Flipper and allows the CPU to communicate with it through
mailboxes and DMAs.

## Registers

### Mailbox registers

The mailbox registers are used to send and receive small 31 bit messages to/from the DSP. Software
often interacts with mailboxes as if they were split into two 2 byte parts (high and low).

#### DSP Mailbox (`0x0C00_5000`, 4 bytes)

This mailbox is used to send data from the CPU to the DSP. High part is always written first, which
probably means a transfer only starts when the both parts are written to (otherwise the DSP could read
partial data).

| Bits  | Name   | Description                         |
| ----- | ------ | ----------------------------------- |
| 0..31 | Data   | [W] Send data to the DSP mailbox    |
| 31    | Status | [R] Whether the transfer is ongoing |

```admonish
The status bit is set automatically on write.
```

#### CPU Mailbox (`0x0C00_5004`, 4 bytes)

This mailbox is used to receive data from the DSP.

| Bits  | Name   | Description                               |
| ----- | ------ | ----------------------------------------- |
| 0..31 | Data   | [R] Receive data from the DSP             |
| 31    | Status | [R] Whether there's new data from the DSP |

```admonish
The status bit is cleared automatically on read.
```

### DSP Control (`0x0C00_500A`, 2 bytes)

This register controls the DSP and also contains some ARAM and AI related bits.

| Bits | Name                  | Description                              |
| ---- | --------------------- | ---------------------------------------- |
| 0    | Reset                 | [W] Reset DSP                            |
|      |                       | [R] Whether DSP is resetting             |
| 1    | Interrupt             | [W] Assert DSP PI interrupt              |
| 2    | Halt                  | [W] Halt (1) or unhalt (0) DSP           |
|      |                       | [R] Whether DSP is halted                |
| 3    | AI interrupt status   | [W] Clear if set                         |
|      |                       | [R] Whether an AI interrupt is pending   |
| 4    | AI interrupt mask     | AI interrupt assertion allowed           |
| 5    | ARAM interrupt status | [W] Clear if set                         |
|      |                       | [R] Whether an ARAM interrupt is pending |
| 6    | ARAM interrupt mask   | ARAM interrupt assertion allowed         |
| 7    | DSP interrupt status  | [W] Clear if set                         |
|      |                       | [R] Whether a DSP interrupt is pending   |
| 8    | DSP interrupt mask    | DSP interrupt assertion allowed          |
| 9    | DSP DMA status        | [R] Whether ARAM DMA is ongoing          |
| 10   |                       | Unknown                                  |
| 11   |                       | Also seems to be used as a reset bit     |

The ARAM interrupt is raised whenever the ARAM DMA completes.
