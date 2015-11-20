# angular-win
Easily add support for Windows 10 features in your Angular application.

## Note
This is very much a work in progress and I've not yet tackled the aspect of distributing the library.
You should probably avoid using this in production for now.

While this should work with Windows 10 JavaScript apps, the focus thus far has been on
[Hosted Web Apps](http://blogs.windows.com/buildingapps/2015/07/06/project-westminster-in-a-nutshell/)
(aka. project Westminster)

## Quick start

These instructions are to work on angular-win and try the demo app. Instructions on how to use it in your app
will come at a later date.

You should have node, npm and gulp. Bower and tsd are optional but useful tools. You also need to be running
Windows 10 since that's the whole point of the thing.

First, install the dependencies:

    npm i

Then, build everything and start the demo app:

    gulp

Finally, make sure your Windows 10 is in developer mode (open Settings and search for "developer") and install the
demo app on your system:

    gulp appx

Then you can find and run the "angular-win demo" app. It's a Hosted Web App so you can only start it while the `gulp`
command is running.

The library's source is under `src` while the demo app is under `demo`. Gulp should pick up any change you save
and update the demo app immediately.
