# Hardware

- CPU: IBM PowerPC Gekko
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

[^dcache]: The data cache can be split into two 16 KiB sections and one of them can be mapped into
memory to be used as a "scratchpad" (super fast RAM).

- GPU: ATI Flipper
  - Runs at 162 Mhz
  - While most of it is a GPU, it is actually a complex IC with multiple services embedded into it,
    such as a DSP, I/O controller and more

- Memory: 43 MiB total
  - RAM: 24 MiB (2 x 12 MiB) 1T-SRAM[^1tsram] running at 324 MHz
  - VRAM: 3 MiB 1T-SRAM[^1tsram] memory embedded within Flipper, 2 MiB for framebuffers and 1 MiB 
    for textures
  - ARAM: 16 MiB DRAM connected to Flipper, used as Auxiliary RAM, usually for audio

[^1tsram]: A kind of pseudo-static RAM (PSRAM). Internally it's just DRAM, but it's made to behave
like SRAM from an outside point of view.

- Audio: Macronix DSP
  - Integrated within Flipper

- DVD Reader:
  - Reads miniDVD sized Nintendo optical discs.
  - Discs are 1.46 GiB, read at constant angular velocity (in practice, this means data in the outer
    part of the disc is read faster than data in the inner part)

Here's an overview of the GameCube's motherboard, with the most important components labeled:

<img src="images/gc-motherboard.png" width="80%">
<div class="caption">
Image by Rodrigo Copetti, 
<a href="resources.html#gamecube-architecture---a-pratical-analysis">Gamecube Architecture - A Pratical Analysis</a>
</div>

And here's a diagram of the architecture:

<img src="images/arch-diagram.png" width=100%>
<div class="caption">
Image by Rodrigo Copetti, 
<a href="resources.html#gamecube-architecture---a-pratical-analysis">Gamecube Architecture - A Pratical Analysis</a>
</div>

A note on buses:
- Northbridge: Connects the CPU to the Flipper. It is 64-bit and runs on the Flipper clock.
- Southbridge: Connects both 12 MiB 1T-SRAM chips to the Flipper. It is 64-bit and runs at double 
  the Flipper clock. 
- Eastbridge: Connects ARAM to the Flipper. It is 8-bit and runs at half the Flipper clock.