# Introduction

This book is a collection of notes about the Nintendo GameCube, geared towards emulator development.

> [!NOTE]
> While information in this book is supposed to be correct, it might just not be! Documentation on
> the gamecube is scarce and it's not uncommon for it to be wrong.
>
> These notes are mostly just me trying to share what I've learned and found while developing my own
> GameCube emulator. If my understanding is wrong, sorry!
>
> If you find something wrong or missing, please [open an issue](https://github.com/vxpm/cubenotes/issues/new)
> or create a pull request. Help cubenotes become better!

## Conventions

- Least significant bit is 0 (unlike PowerPC manuals where the _most significant_ bit is 0)
- Ranges of values follow Rust's syntax, i.e. `a..b` is a range from a (inclusive) to b (exclusive)
  and `a..=b` is a range from a (inclusive) to b (inclusive). If either `a` or `b` are missing, the
  ranges start/end at their respective limits (i.e. start or end of valid range)
- Addresses are physical unless stated otherwise
- Hexadecimal values are always prefixed with `0x` and separated with an underline every 4 digits,
  e.g. `0xDEAD_BEEF`
