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
> BATs and page tables/segmentation are **not** exclusive and, therefore, used together.
> Translation using BATs has precedence over translation using page tables, and if both fail then
> an exception occurs.

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

The segmentation mechanism works by splitting the logical address space into 16 contiguous
segments of 256 MiB. These segments are then subdivided into 4 KiB pages. Each segment is associated
with a segment descriptor register which controls how to map a logical address in it to a virtual
address, which is 52 bit.

The most significant 40 bits of a virtual address are what's called a virtual page number. This value
is used to search for a corresponding entry in the page table, which will then map it to a physical
page number, which is 20 bit. Replacing the virtual page number with the physical page number yields
the physical address and the result of the translation.

### Page Table

The page table is hash table of entry groups, each containing 8 entries.

## The translation pipeline

The BAT mechanism always take precedence over the segmentation mechanism.
