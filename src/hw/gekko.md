# Gekko (CPU)

The GameCube CPU is the IBM PowerPC Gekko:

- Runs at 486 Mhz
- 32-bit
- 64-bit Floating Point Unit
- 32 KiB L1 Instruction Cache
- 32 KiB L1 Data Cache[^dcache]
- 256 KiB L2 Unified Cache
- Single core
- Pipelined (instructions are divided into multiple stages of execution, allowing multiple
  instructions to be at different stages at the same time)
- Superscalar (contains multiple execution units which can work on independent instructions at
  the same time)
- Contains a SIMD extension geared torwards 3D graphics called "Paired Singles"

[^dcache]:
    The data cache can be split into two 16 KiB sections and one of them can be mapped into
    memory to be used as a "scratchpad" (super fast RAM).
