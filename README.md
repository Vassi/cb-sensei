## Development / Local Use

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. It doesn't run very well outside of the overlay renderer anymore now that we're lock aware and such but it's possible to overload those settings.

The page will reload if you make edits but if you run into any errors you'll need to click 'Reload Overlay' in ACT.

----

### Setup

___This overlay requires both NGLD and Cactbot plugins to be installed___

1. Click on the OverlayPlugin WSServer tab
2. Click on Stream/Local Overlay
3. Make sure the server is started and running.
4. In the URL Generator click on Overlay -> Ember Overlay
5. Note the _value_ of the OVERLAY_WS variable ex: `?OVERLAY_WS=ws://127.0.0.1:10501/ws`
6. Add a new overlay (it doesn't matter what kind I don't think, but Custom -> MiniParse should be fine)
7. Make sure Show and Enable overlay are checked and Clickthrough and Lock _are not_.
8. Add the url from `yarn start` and append the OVERLAY_WS variable copied earlier but it needs to be renamed as HOST, it should look something like: `http://localhost:3000/?HOST=ws://127.0.0.1:10501/ws`
9. Double check you renamed `OVERLAY_WS` to `HOST`

Future:
Host overlay so it can have a non-localhost addy.