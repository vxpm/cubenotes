# Processor Interface (PI)

The processor interface is responsible for connecting the CPU to the Flipper.

## Flipper Interrupts

The PI receives interrupt requests from Flipper and passes them along to the CPU.

## FIFO

Within the PI exists a FIFO mechanism that catches burst writes[^wgp] to `0x0C00_8000` and writes
them to a ring buffer in memory. It's controlled by three registers: `FIFO Start`, `FIFO End` and
`FIFO Current`.

[^wgp]: These burst writes are executed by the [Write Gather Pipe](cpu.md#write-gather-pipe).

## Registers

### PI Interrupt Cause (`0x0C00_3000`, 4 bytes)

Contains which external interrupt causes are active. This register is read-only: in order to acknowledge
an interrupt, you must write to the controlling status bit of the interrupt specific register.

| Bits   | Name        | Description                      |
| ------ | ----------- | -------------------------------- |
| 0      | GP Error    | Graphics Processor runtime error |
| 1      | Reset       | Reset switch was pressed         |
| 2      | DVDI        | DVD interface                    |
| 3      | SI          | Serial interface                 |
| 4      | EXI         | External Interface               |
| 5      | AI          | Audio Interface                  |
| 6      | DSPI        | DSP Interface                    |
| 7      | MEM         | Memory Interface                 |
| 8      | VI          | Video Interface                  |
| 9      | PE Token    | Token assertion in command list  |
| 10     | PE Finish   | Frame ready                      |
| 11     | CP          | Command Processor FIFO           |
| 12     | Debug       | External Debugger                |
| 13     | HSP         | High Speed Port                  |
| 14..16 |             | Reserved                         |
| 16     | Reset State |                                  |
| 17..32 |             | Reserved                         |

### PI Interrupt Mask (`0x0C00_3004`, 4 bytes)

Masks PI interrupts, describing which ones are allowed to be raised.

| Bits | Name      | Description                      |
| ---- | --------- | -------------------------------- |
| 0    | GP Error  | Graphics Processor runtime error |
| 1    | Reset     | Reset switch was pressed         |
| 2    | DVDI      | DVD interface                    |
| 3    | SI        | Serial interface                 |
| 4    | EXI       | External Interface               |
| 5    | AI        | Audio Interface                  |
| 6    | DSPI      | DSP Interface                    |
| 7    | MEM       | Memory Interface                 |
| 8    | VI        | Video Interface                  |
| 9    | PE Token  | Token assertion in command list  |
| 10   | PE Finish | Frame ready                      |
| 11   | CP        | Command Fifo                     |
| 12   | Debug     | External Debugger                |
| 13   | HSP       | High Speed Port                  |

### PI FIFO Start (`0x0C00_300C`, 4 bytes)

| Bits   | Name  | Description                          |
| ------ | ----- | ------------------------------------ |
| 0..5   |       | Zeroed                               |
| 5..27  | Start | The start address of the ring buffer |
| 27..32 |       | Unknown                              |

### PI FIFO End (`0x0C00_3010`, 4 bytes)

| Bits   | Name | Description                                    |
| ------ | ---- | ---------------------------------------------- |
| 0..5   |      | Zeroed                                         |
| 5..27  | End  | The end address of the ring buffer (exclusive) |
| 27..32 |      | Unknown                                        |

### PI FIFO Current (`0x0C00_3014`, 4 bytes)

| Bits   | Name    | Description                                                                 |
| ------ | ------- | --------------------------------------------------------------------------- |
| 0..5   |         | Zeroed                                                                      |
| 5..27  | Current | The current address for writing the next 32 bytes of data                   |
| 27     | Wrapped | Whether the current address reached the end and wrapped around to the start |
| 28..32 |         | Unknown                                                                     |

`Wrapped` is cleared only on CPU writes to the register.
