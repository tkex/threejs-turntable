# threejs-turntable

An interactive turntable built in Three.js that includes light scenes, materials and textures, 3d FBX objects (models made with Blender), primitives, raycasting, tween animations, physics, events and sounds. Created to solidify the various concepts of Three.js in a practical way.

Sounds can be played when the turntable is interacted with. Turn the lift lever, push the buttons and lastly the vinyl to crack out the sounds! For physics, the turntable can be thrown around in the scene with balls (pressing `space` as much as one desires).

# Quick setup

- Clone the repository
- Download the dependend libraries:
  - Three.js: https://github.com/mrdoob/three.js/tree/master
  - dat.gui: https://github.com/dataarts/dat.gui/tree/master
  - ThreeCSG: https://github.com/chandlerprall/ThreeCSG/tree/master
  - Cannon.js: https://github.com/schteppe/cannon.js/tree/master
  - Howler.js: https://github.com/goldfire/howler.js/tree/master
- Create a folder named `lib` in the cloned repo folder
- Setup the file structure inside the folder as shown (copy all libs into the lib folder):
  ```
   |
   +---turntable
   |   |   ChromeFileAccess.bat
   |   |   index.html
   |   |   tt-detail.png
   |   |   UI.png
   |   |
   |   \---src
   |       |   main.js
   |       |
   |       +---animation
   |       |       Animation.js
   |       |
   |       +---audiofiles
   |       |       vinyl_sound.mp3
   |       |
   |       +---eventfunctions
   |       |       calculateMousePosition.js
   |       |       executeKeyAction.js
   |       |       executeRaycast.js
   |       |       setTurntableSound.js
   |       |       updateAspectRatio.js
   |       |
   |       +---images
   |       |       floorTexture.jpg
   |       |       tableTexture.png
   |       |       vinylTexture.jpg
   |       |
   |       +---models
   |       |       pillowBlender.fbx
   |       |       tableBlender.fbx
   |       |
   |       +---objects
   |       |       addFloor.js
   |       |       addInterior.js
   |       |       addLamp.js
   |       |       addLights.js
   |       |       addPillowsFromFile.js
   |       |       addTableFromFile.js
   |       |       addTurntable.js
   |       |
   |       \---physics
   |               Physics.js
   |
   \---lib
       |
       +---cannon.js-master
       |
       +---dat.gui-master
       |
       +---howler.js-master
       |
       +---three.js-master
       |
       \---ThreeCSG-master
  ```
- If using Chrome: Adjust the path in the batch script `ChromeFileAccess.bat` to your Chrome installation/executeable. Needed to allow local file access for the started Chrome instance. In this case f.e. used to be able to access the texture files. Otherwise the texture are not getting rendered. An alternative could be using a (configured) HTTP webserver instead using that option.
- Optional: If desired the vinyl sound in the audiofiles folder can be changed. Out of copyright I replaced the initial sound file with an own soundtrack -- which do not fit the scene well but does the job. F.e. https://www.youtube.com/watch?v=QSBco8kVuZM is fitting pretty well.
- Run the index.html

# External image sources

https://www.pexels.com/de-de/foto/boden-holz-holzboden-muster-172292/
https://www.pexels.com/de-de/foto/braun-hd-wallpaper-holz-nahansicht-172289/
https://www.pexels.com/de-de/foto/album-aufzeichnen-klang-klassisch-167092/
