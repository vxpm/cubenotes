# Video Interface (VI)

The video interface is responsible for outputing a video signal to a display from a framebuffer in
main RAM, named the eXternal FrameBuffer (XFB).

For a high level overview on the topic of analog video, take a look at the [analog video](vi/analog-video.md)
page.

## Registers

```admonish
Lengths are in samples unless stated otherwise.
```

```admonish warning title="Work in Progress"
Not all registers are described here yet
```

### VI Vertical Timing (`0x0C00_2000`, 2 bytes)

This register configures the vertical timing properties of the video signal.

| Bits  | Name                      | Description                                      |
| ----- | ------------------------- | ------------------------------------------------ |
| 0..4  | Equalization Pulse Length | Double the length of the EQU pulse in half-lines |
| 4..14 | Active Video Length       | Length of the active video section in half-lines |

### VI Display Config (`0x0C00_2002`, 4 bytes)

| Bits  | Name                 | Description                                                      |
| ----- | -------------------- | ---------------------------------------------------------------- |
| 0     | Enable               | Enable video timing generation and data requests                 |
| 1     | Reset                | Clears all requests and puts the interface into an idle state    |
| 2     | Progressive          | Whether progressive video mode is enabled (interlaced otherwise) |
| 3     | Stereoscopic         | Whether the 3D stereoscopic effect is enabled[^stereoscopic]     |
| 4..6  | Display Latch 0 Mode |                                                                  |
| 6..8  | Display Latch 1 Mode |                                                                  |
| 8..10 | Video Format         | Current video format (0 = NTSC, 1 = Pal50, 2 = Pal60, 3 = Debug) |

[^stereoscopic]: Nothing uses this.

### VI Horizontal Timing 0 (`0x0C00_2004`, 4 bytes)

This register configures part of the horizontal timing properties of the video signal.

| Bits   | Name                            | Description                                               |
| ------ | ------------------------------- | --------------------------------------------------------- |
| 0..7   | Sync Length                     | Length of the HSync pulse                                 |
| 7..17  | Sync Start to Blank End Length  | Length of interval between HSync start and HBlank end     |
| 17..27 | Half-line to Blank Start Length | Length of interval between the half-line and HBlank start |

### VI Horizontal Timing 1 (`0x0C00_2008`, 4 bytes)

This register configures part of the horizontal timing properties of the video signal.

| Bits   | Name                            | Description                                                  |
| ------ | ------------------------------- | ------------------------------------------------------------ |
| 0..9   | Half-line length                | Length of a half-line                                        |
| 16..23 | Sync Start to Color Burst End   | Length of interval between HSync start and Color Burst end   |
| 24..31 | Sync Start to Color Burst Start | Length of interval between HSync start and Color Burst start |

### VI Odd Field Vertical Timing (`0x0C00_200C`, 4 bytes)

This register configures the vertical timing properties of the video signal of the odd field.

| Bits   | Name                 | Description                                      |
| ------ | -------------------- | ------------------------------------------------ |
| 0..10  | Pre-blanking length  | Length of the pre-blanking period, in half-lines |
| 16..26 | Post-blanking length | Length of the pre-blanking period, in half-lines |

### VI Even Field Vertical Timing (`0x0C00_2010`, 4 bytes)

This register configures the vertical timing properties of the video signal of the even field.

Same bits as `VI Odd Field Vertical Timing`.

### VI Top Field Base Register (`0x0C00_201C`, 4 bytes)

This register configures the address of the XFB for the odd field.

| Bits   | Name              | Description                                      |
| ------ | ----------------- | ------------------------------------------------ |
| 0..24  | Base              | Bits 0..24 of the XFB address in physical memory |
| 24..28 | Horizontal Offset |                                                  |
| 28     | Shift             | Whether to shift the base address right by 5     |

### VI Bottom Field Base Register (`0x0C00_2024`, 4 bytes)

This register configures the address of the XFB for the even field.

| Bits  | Name  | Description                                      |
| ----- | ----- | ------------------------------------------------ |
| 9..24 | Base  | Bits 9..24 of the XFB address in physical memory |
| 28    | Shift | Whether to shift the base address right by 5     |

### VI Current Line (Vertical Counter) (`0x0C00_202C`, 2 bytes)

This register contains a counter for the current line in the frame. It starts at 1 and increases
every HSync, up to the number of lines per frame. It is reset at the start of a new frame.

```admonish
In interlaced mode, a frame is composed of the two fields.
```

### VI Current Sample (Horizontal Counter) (`0x0C00_202E`, 2 bytes)

This register contains a counter for the current sample in the line. It starts at 1 and increases
every sample, up to the number of samples per frame. It is reset at the start of a new line.

### VI Display Interrupt 0 (`0x0C00_2030`, 4 bytes)

This register configures the VI interrupt 0.

| Bits   | Name              | Description                         |
| ------ | ----------------- | ----------------------------------- |
| 0..9   | Horizontal Target | Target value for the current sample |
| 16..25 | Vertical Target   | Target value for the current line   |
| 28     | Mask              | Whether this interrupt is enabled   |
| 31     | Status            | Whether this interrupt is active    |

```admonish warning
The value to write in order to acknowledge the interrupt is 0 instead of the usual 1.
```

### VI Display Interrupt 1 (`0x0C00_2034`, 4 bytes)

This register configures the VI interrupt 1.

Same bits as `VI Display Interrupt 0`.

### VI Display Interrupt 2 (`0x0C00_2038`, 4 bytes)

This register configures the VI interrupt 2.

Same bits as `VI Display Interrupt 0`.

### VI Display Interrupt 3 (`0x0C00_203C`, 4 bytes)

This register configures the VI interrupt 3.

Same bits as `VI Display Interrupt 0`.
