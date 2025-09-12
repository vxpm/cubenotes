# DSP Interface (DSPI)

The DSP interface controls the DSP in the Flipper and allows the CPU to communicate with it through
mailboxes and DMAs.

## Registers

### Mailbox registers

The mailbox registers are used to send and receive small 31 bit messages to/from the DSP. Software
often interacts with mailboxes as if they were split into two 2 byte parts (high and low).

#### DSP Mailbox (`0x0C00_5000`, 4 bytes)

Mailbox used to send data from the CPU to the DSP. High part is always written first, which probably
means a transfer only starts when both parts are written to (otherwise the DSP could read partial
data).

| Bits  | Name   | Description                         |
| ----- | ------ | ----------------------------------- |
| 0..31 | Data   | [W] Send data to the DSP mailbox    |
| 31    | Status | [R] Whether the transfer is ongoing |

```admonish
The status bit is set automatically on write.
```

#### CPU Mailbox (`0x0C00_5004`, 4 bytes)

Mailbox used to receive data from the DSP.

| Bits  | Name   | Description                               |
| ----- | ------ | ----------------------------------------- |
| 0..31 | Data   | [R] Receive data from the DSP             |
| 31    | Status | [R] Whether there's new data from the DSP |

```admonish
The status bit is cleared automatically on read.
```

### DSP Control (`0x0C00_500A`, 2 bytes)

Controls the DSP and also contains some ARAM and AI related bits.

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

### ARAM Size (`0x0C00_5012`, 2 bytes)

### ARAM Mode (`0x0C00_5016`, 2 bytes)

### ARAM Refresh (`0x0C00_501A`, 2 bytes)

### ARAM DMA RAM Address (`0x0C00_5020`, 4 bytes)

Contains the physical address of the DMA transfer in main RAM.

### ARAM DMA ARAM Address (`0x0C00_5024`, 4 bytes)

Contains the address of the DMA transfer in ARAM.

### ARAM DMA Control (`0x0C00_5028`, 2 bytes)

Controls the ARAM DMA.

| Bits  | Name      | Description                                  |
| ----- | --------- | -------------------------------------------- |
| 0..15 | Length    | Length of the transfer in words              |
| 15    | Direction | Whether to read from ARAM instead of writing |

Writing to this register triggers a DMA transfer if the length field is non-zero.
