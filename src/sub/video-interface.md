# Video Interface (VI)

The video interface is responsible for outputing a video signal to a display from a framebuffer in
main RAM, named the eXternal FrameBuffer (XFB).

While the video signal outputs a specific resolution depending on it's mode, the XFB can have
multiple dimensions. In order to work around this issue, the VI will resample the XFB to fit the
actual display resolution.

## Analog Video

VI mostly deals with analog video signals, which are a bit complicated. Here's an attempt to give
an overview on the topic.

```admonish
For more information, consult the [analog video resources](../resources.md#analog-video).
```

Analog video works by scanning an image through a screen from left to right, top to bottom. In order
to produce the correct image, the scanning beam must change it's "color" according to it's position,
which is done by timing parts of the scanning process.

The scan is made up of samples, which are the color information. These samples are then grouped into
scan lines (or lines, for short), which are the rows of the image.

There's two main ways to scan an image out: _progressive_ and _interlaced_. First, we'll take a look
at progressive video, since it's simpler to understand and works as a base for interlaced.

### Progressive Video

In progressive video, the whole image is scanned out at once. The video signal starts scanning a line
of samples (i.e. a row of the image), which goes roughly like this:

- Emit a synchronization pulse (H-Sync) to inform the screen of when to start drawing the line. This
  is also the end of the _front porch_ and the beggining of the _back porch_.
- Emit a color burst signal, which is used to calibrate the color level of the screen. This is also
  the end of the _back porch_ and the _horizontal blanking period_.
- Emit the active video section. This is the actual image data of the current line.
- Emit a blank signal to allow the beam to recover. This is the start of the _front porch_ and the
  _horizontal blanking period_.

Once the line is finished, the beam goes back to the start of the next line in the scan. This is the
purpose of the _front porch_ section.

## Registers

### VI Vertical Timing (`0x0C00_2000`, 2 bytes)

| Bits  | Name                      | Description                                      |
| ----- | ------------------------- | ------------------------------------------------ |
| 0..4  | Equalization Pulse Length | Length of the EQU pulse in half-lines            |
| 4..14 | Active Video Length       | Length of the active video section in half-lines |
