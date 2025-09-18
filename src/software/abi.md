# ABI

Software appears to use the PowerPC embedded ABI (or simply EABI), which is a modified version of
the PowerPC ABI supplement to System V (described in [this document](../resources.md#powerpc-abi-supplement-to-system-v-abi))
designed for embedded systems.

The EABI is described in detail in [this document](../resources.md#developing-powerpc-embedded-application-binary-interface-eabi-compliant-programs),
but this page will give an overview over the most important parts of it.

## Registers

Registers have three kinds:

- Volatile: These registers are general purpose and do not need to be preserved by routines.
- Preserved: These registers are general purpose and **must** be preserved by routines.
- Dedicated: These registers have a special purpose in the ABI, and **must** also be preserved by
  routines.

### General purpose registers

| Register | Kind      | Purpose                               |
| -------- | --------- | ------------------------------------- |
| R00      | Volatile  | Language specific                     |
| R01      | Dedicated | Stack pointer                         |
| R02      | Dedicated | Read only small data base address     |
| R03      | Volatile  | First parameter, first return value   |
| R04      | Volatile  | Second parameter, second return value |
| R05..R11 | Volatile  | Parameters after R3 & R4              |
| R11..R13 | Volatile  | Temporaries                           |
| R14..    | Preserved | General                               |

### Floating point registers

| Register | Kind      | Purpose                                              |
| -------- | --------- | ---------------------------------------------------- |
| F00      | Volatile  | Language specific                                    |
| F01      | Volatile  | First parameter, first (and only) float return value |
| F02..F09 | Volatile  | Parameters after F01                                 |
| F09..F14 | Volatile  | Temporaries                                          |
| F14..    | Preserved | General                                              |

### Condition register fields

All fields in the condition register are volatile except for CR2..CR5, which are preserved.

### Other registers

All other registers are volatile.

## Stack Frames

The stack pointer points to the lowest word of the current stack frame (i.e. the stack grows down).
Stack frames are always aligned on double words (8 bytes). Their format is as follows:

| Address | Size     | Description      |
| ------- | -------- | ---------------- |
| sp      | 4        | Previous sp      |
| sp + 4  | 4        | Return address   |
| sp + 8  | Variable | Routine specific |

Registers are callee saved. As a side effect, if a routine is a leaf and does not need the stack or
any preserved registers, it can skip creating a stack frame.
