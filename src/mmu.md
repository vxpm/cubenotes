# Memory Mapping in the Gekko

The Gekko has two main ways of mapping logical addresses to physical ones. The first is a mechanism
called BATs (Block Address Translation), which most games use exclusively. The second one is a
classic segmentation mechanism with page tables.

Most games do not use page tables and, instead, just use the default BAT configuration provided by
the Dolphin OS.

> [!NOTE]
> PowerPC manuals refer to an untranslated address as an _effective address_, which cubenotes instead
> calls a _logical address_.

> [!WARNING]
> BATs and page tables/segmentation are **not** exclusive and, therefore, might be used together.
> They might also both be disabled, in which case the Gekko is operating under real addressing mode.

## Block Address Translation (BAT)

The BAT mechanism allows the Gekko to define up to 8 "blocks" which map a range of logical addresses
to a range of physical addresses. These 8 blocks are split into two: one half dedicated to instruction
address translation and the other half dedicated to data address translation.

Each block is controlled by a pair of registers, e.g. IBAT2U and IBAT2L control the [I]nstruction
BAT block 2. Blocks have three main properties:

<div class="frame">

### Block length

The length of the block, ranging from the minimum of 128 KiB to the maximum of 256 MiB, stepping in
powers of two (i.e. 128 Kib, 256 Kib, ..., 128 MiB, 256 MiB).

### Logical address start

This is the start of the block in the logical address space. This value must be a multiple of the
block length.

### Physical address start

This is the start of the block in the physical address space. This value must be a multiple of the
block length.

</div>

> [!WARNING]
> BAT blocks should not overlap. If they do, the behaviour is unspecified.

## Segmentation and Page Tables

The segmentation mechanism works by splitting the logical address space into 16 chunks of 256 MiB.
Each segment is associated with a register which controls how to map a logical address in it to a
52-bit virtual address.

## The translation pipeline

The BAT mechanism always take precedence over the segmentation mechanism.
