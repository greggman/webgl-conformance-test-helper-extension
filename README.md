# WebGL Conformance Test Helper Extension

The idea for this is that some parts of the WebGL spec require checking
compositiing results. There's no way for a webpage to get compositing
results but an extension supposedly can so, via an extension allow
certain WebGL tests to take screenshots.

Unfortunately the bug I wanted it to catch it didn't catch.

Chrome 62 doesn't correctly composite `premultipliedAlpha: false`
but when using the extension API to check the results the capture
has the correct colors even though the browser window itself does not.

That doesn't mean this extension is useless but it does mean catching
compositor bugs is more complicated than just using this extension.

## Usage

If you want to play around with it, download the files

In Chrome go to `about:extensions` and `Load Unpacked Extension`. Select
the `extension` folder. Now copy the **ID** shown on that page for the extension.

Edit the file `example/js/webgl-conformance-test-extension-helper.js` and
past the id at the top of the file where it says

    const editorExtensionId = "pfnccnilkknnncbaafhcaoeoifhjmibb";

Serve the `example` folder using a server of your choice like `python -m SimpleHTTPServer`.

Open the `example/premultipled-alpha-false-composite-test.html` through your server
like `http://localhost:8000/example/premultipled-alpha-false-composite-test.html`

The correct result would be `[brown|green] [brown|green]` where the first
[brown|green] is the WebGL canvas and the second is the screen capture

An incorrect result would be `[orange|green] [orange|green]` but because the
bug is complicated the screenshot result is taking a different path and generating
the correct `[brown|green]`.

<img width="868" alt="webgl-conformane-test-extension-laugh" src="https://user-images.githubusercontent.com/234804/32837282-3e3906ec-ca50-11e7-8603-096464c9a502.png">

