# Video Interface (VI)

The video interface is responsible for outputing a video signal to a display from a framebuffer in
main RAM, named the eXternal FrameBuffer (XFB).

While the video signal outputs a specific resolution depending on it's mode, the XFB can have
multiple dimensions. In order to work around this issue, the VI will resample the XFB to fit the
actual display resolution.
