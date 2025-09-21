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

The scan signal is made up of samples, which are the color information. These samples are then grouped
into scan lines (or lines, for short), which are the rows of the image.

There's two main ways to scan an image out: _progressive_ and _interlaced_. First, we'll take a look
at progressive video, since it's simpler to understand and works as a base for interlaced.

### Progressive Video

In progressive video, the whole image is scanned out at once. The video signal starts scanning out a
line of samples (i.e. a row of the image), which goes roughly like this:

```
┄──Time───> (Repeats)

┌───────┐─────────────────┌──────┐─────────────┌──────┐──────────────────┐
│       │                 │      │             │      │                  │
│       │ Horizontal Sync │      │ Color Burst │      │   Active Video   │
│       │                 │      │             │      │                  │
└───────┘─────────────────└──────┘─────────────└──────┘──────────────────┘

                          │─────── Back Porch ────────│

│────── Front Porch ──────│

│───────────────── Horizontal Blank ──────────────────│
```

This diagram represents what the video signal is emitting and what section these parts belong to.
There are three parts to the signal:

- Horizontal Sync: This is a pulse with the purpose of synchronizing lines so that they start at the
  same horizontal position. In practice, this tells the screen when to move the beam to the start of
  the next line.
- Color Burst: A burst of color data used to "calibrate" the color level of the screen.
- Active Video: This is the actual image data (i.e. the samples) of the current line.

Then, there are three sections:

- Front Porch: Period between end of active video and the end of horizontal sync.
- Back Porch: Period between end of horizontal sync and start of active video. The beam movement
  happens during this section.
- Horizontal Blank: This is any period outside of the active video signal.

This process repeats for each scan line until the last one, where things go a little differently:
there's no next line to scan out - the beam needs to go back to the top, where the scanning process
can restart.

In order to do that, a vertical synchronization signal also exists, and it works similarly to the
horizontal synchronization mechanism:

```
┄──Time───> (Repeats)

┌───────┐─────────────────┌────────────────┐──────────────────┐
│       │                 │                │                  │
│       │  Vertical Sync  │                │   Active Video   │
│       │                 │                │                  │
└───────┘─────────────────└────────────────┘──────────────────┘

                          │── Back Porch ──│

│────── Front Porch ──────│

│───────────── Vertical Blank ─────────────│
```

Similarly to the horizontal mechanism:

- Vertical Sync: This is a pulse that tells the screen to move the beam back to the top so it can
  start scanning out a new image.
- Active Video: This is the actual image data (i.e. the samples) of the current scan.

The sections are the same as the for the horizontal synchronization mechanism, except, of course,
they refer to the vertical synchronization.

### Interlaced Video

Interlaced video is like progressive video, except it splits the scan (i.e. the image) into two parts
with alternating scan lines, called _fields_.

The odd field scans out odd lines, while the even field scans out even lines. Together, these fields
make up a whole scan.

## Registers

### VI Vertical Timing (`0x0C00_2000`, 2 bytes)

| Bits  | Name                      | Description                                      |
| ----- | ------------------------- | ------------------------------------------------ |
| 0..4  | Equalization Pulse Length | Length of the EQU pulse in half-lines            |
| 4..14 | Active Video Length       | Length of the active video section in half-lines |
