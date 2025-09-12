# Exceptions

Exceptions in the PowerPC architecture are defined as a mechanism which allow the CPU to change state
to deal with unusual conditions which might arise during execution or come from external sources.
There are multiple exception kinds.

Classification of exceptions is a somewhat confusing topic in the PowerPC manuals, so here's the
convention used in cubenotes:

| Classification                 | Cause                 |
| ------------------------------ | --------------------- |
| Internal Exception             | Instruction Execution |
| External Exception (Interrupt) | Anything else         |

## Exception Kinds

| Vector | Exception                  | Classification          |
| ------ | -------------------------- | ----------------------- |
| 0x0100 | Reset                      | Interrupt[^nonmaskable] |
| 0x0200 | Machine Check              | Interrupt[^nonmaskable] |
| 0x0300 | DSI                        | Internal Exception      |
| 0x0400 | ISI                        | Internal Exception      |
| 0x0500 | External Interrupt         | Interrupt               |
| 0x0600 | Alignment                  | Internal Exception      |
| 0x0700 | Program                    | Internal Exception      |
| 0x0800 | Floating Point Unavailable | Internal Exception      |
| 0x0900 | Decrementer                | Interrupt               |
| 0x0C00 | System Call                | Internal Exception      |
| 0x0D00 | Trace                      | Internal Exception      |
| 0x0F00 | Performance Monitor        | Internal Exception      |
| 0x1300 | Breakpoint                 | Internal Exception      |

[^nonmaskable]: These interrupts are non maskable, i.e. cannot be disabled by MSR.EE

For more information regarding exception kinds, consult the PowerPC manuals.

## Masking Exceptions

Some exception kinds may be masked (i.e. disabled) depending on CPU configuration:

- Floating point exceptions may be disabled depending on MSR.FE0 and MSR.FE1
- Maskable interrupts must be enabled through MSR.EE

## Processing an Exception

When an exception occurs, the CPU saves it's current state and starts executing at an address specific
to the kind of the exception called the _exception vector_.

### Saving State

Whenever the CPU identifies an exception, it handles it by first saving the current state of the CPU
to the SRR0 and SRR1 registers.

#### SRR0: Address to resume after exception handling

The SRR0 register is updated to contain the address where execution should resume once the exception
handler is finished.

Usually, this is the address of the instruction which either caused the exception or, for exceptions
caused by external sources, that would execute when the exception happened. Some exception kinds,
however, have it as the address of the instruction right after that.

#### SRR1: Machine Status

The SRR1 register is updated to contain parts of the machine status register and, sometimes, extra
information that's exception specific.

For most instructions, bits 0..16 and 22..27 contain the corresponding bits in MSR, while bits 27..30
and 19..22 contain exception specific information.

### Update the Machine State Register

MSR is updated to represent the new context of execution. This is equivalent to zeroing out all of
it's bits, except for MSR.ILE, MSR.ME, MSR.IP and MSR.LE (which gets assigned MSR.ILE).

### Resume execution

Execution resumes as normal. Eventually, the exception handler will execute a `rfi` instruction, which
will then return to the address in SRR0 and restore MSR to it's original state by copying bits of
SRR1 into it.
