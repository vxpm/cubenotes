# Introduction

This book is a collection of notes about the Nintendo GameCube, geared towards emulator development.
Currently, it is not sufficient on it's own - please see [the resources page](resources.md) for more.

```admonish
While information in this book is supposed to be correct, it might just not be! Documentation on
the gamecube is scarce and it's not uncommon for it to be wrong.

These notes are mostly just me trying to share what I've learned and found while developing my own
GameCube emulator. If something is wrong (or missing), sorry! Consider [opening an issue](https://github.com/vxpm/cubenotes/issues/new)
or creating a pull request in that case. Help cubenotes become better!
```

## General Conventions

- Least significant bit is 0 (unlike PowerPC manuals where the _most significant_ bit is 0)
- Ranges of values follow Rust's syntax, i.e. `a..b` is a range from a (inclusive) to b (exclusive)
  and `a..=b` is a range from a (inclusive) to b (inclusive). If either `a` or `b` are missing, the
  ranges start/end at their respective limits (i.e. start or end of valid range)
- Hexadecimal values are always prefixed with `0x` and separated with an underline every 4 digits,
  e.g. `0xDEAD_BEEF`
- Likewise, binary values are always prefixed with `0b` and separated with an underline every 4
  digits, e.g. `0b1111_0000_1010_0011`
- Addresses are physical unless stated otherwise
- Every MMIO register is both readable and writable unless stated otherwise
- Every bit flag is 0 for `false` and 1 for `true` unless stated otherwise

These are not all of the conventions used in cubenotes, other conventions will be listed when
appropriate.
