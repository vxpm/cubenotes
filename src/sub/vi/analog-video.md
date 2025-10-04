# Analog Video

```admonish warning
This page is a very high level overview of analog video, and I'm not very knowledgeable on the topic.
Take everything here with a grain of salt.

For more information, consult the [analog video resources](../../resources.md#analog-video).
```

Analog video works by scanning an image through a screen from left to right, top to bottom. In order
to produce the correct image, the scanning beam must change it's "color" according to it's position,
which is done by timing parts of the scanning process.

The scanning beam is controlled by an analog video signal, which can be thought of as being composed
of three component signals:

- **Color** signal, which contains the actual color information (called _samples_)
- **Horizontal synchronization (HSync)** signal, which tells the screen to take the scanning beam back
  to the start of the next scan line
- **Vertical synchronization (VSync)** signal, which tells the screen to take the scanning beam back to
  the top of the screen so it can start scanning out a new image

There's two ways to scan an image out: _progressive_ and _interlaced_. First, we'll take a look at
progressive video, since it's simpler to understand and works as a base for interlaced.

## Progressive Video

In progressive video, the whole image is scanned out at once. The video signal starts scanning out a
line of samples (i.e. a row of image data), which goes roughly like this:

```
                              │────── H. Back Porch ──────│

  │───── H. Front Porch ──────│

  │───────────────── Horizontal Blank ────────────────────│

Color:
1                                   ╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷       ╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷
0 ──────────────────────────────────┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴───────┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴
                                      Color Burst                 Active Video
HSync:
1         ┌───────────────────┐
0 ────────┘                   └───────────────────────────────────────────────────────

VSync:
1
0 ────────────────────────────────────────────────────────────────────────────────────
```

This diagram represents what the video signal is emitting and what section these parts belong to.
Note that this diagram is cyclic (i.e. it repeats once it reaches the end).

The signal starts out by emitting a HSync pulse, telling the screen to move the beam to the start of
the next line. Then, there's a burst of color information (the _color burst_), used to "calibrate"
the color level of the screen. Finally, the actual color information is sent (_active video_).

The process can be split into three sections:

- Front Porch: Period between end of active video and the end of HSync pulse.
- Back Porch: Period between end of HSync pulse and start of active video. This section exists to
  give time for the beam to move back to the start of the line.
- Horizontal Blank: This is any period outside of the active video signal.

This process repeats for each scan line until the last one, where things go a little differently:
there's no next line to scan out - the beam needs to go back to the top, where the scanning process
can restart. This is when VSync comes into play:

```
       │──────────────────────── Vertical Blank ──────────────────────────│

Color:
1 ╷╷╷╷╷╷                                                             ╷╷╷  ╷╷╷╷╷╷
0 ┴┴┴┴┴┴─────────────────────────────────────────────────────────────┴┴┴──┴┴┴┴┴┴──────
    AV                                                                B     AV

HSync:
1         ┌───────┐               ┌───────┐               ┌───────┐               ┌───
0 ────────┘       └───────────────┘       └───────────────┘       └───────────────┘

VSync:
1         ┌───────────────────────────────────────────────────────┐
0 ────────┘                                                       └───────────────────
```

Similarly to the first diagram, this diagram represents what the video signal is emitting when it
reaches the end of a scan.

The signal emits a VSync pulse, telling the screen to move the beam back to the top of the screen.
The VSync lasts for a few scan lines, where nothing is actually scanned out.

The Vertical Blank is the period between the end of the last visible line in a scan and the start of
first visible line in the next scan.

If we zoom out and take a look at a whole scan, it would look something like this:

```
Color:
1 ╷╷╷╷╷╷╷╷        ╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷╷
0 ┴┴┴┴┴┴┴┴────────┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴

HSync:
1 ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷  ╷
0 ┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──

VSync:
1         ┌───────┐
0 ────────┘       └───────────────────────────────────────────────────────────────────
```

## Interlaced Video

Interlaced video is like progressive video, except it splits the scan (i.e. the image) into two parts
with alternating scan lines, called _fields_.

The odd field scans out odd lines, while the even field scans out even lines. Together, these fields
make up a whole scan.
