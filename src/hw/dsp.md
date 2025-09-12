# Digital Signal Processor

The DSP in the GameCube is a custom Macronix IC embedded within [Flipper](/hw/flipper.md). It has
it's own instruction set, it's own internal memory and it's own quirks.

- 16 bit processor
- Runs at 81 Mhz (CPU / 6)
- Memory: Addressed by words instead of bytes. Harvard architecture.
  - Instruction RAM: 8 KiB (4096 words)
  - Instruction ROM: 8 KiB (4096 words)
  - Data RAM: 8 KiB (4096 words)
  - Data ROM: 4 KiB (2048 words)
