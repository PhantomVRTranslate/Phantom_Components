# Phantom Components

**Phantom Components** came about from the recent release of the exciting new technology, React VR, which grants software developers a much more streamlined way into the world of programming in virtual reality. 

Currently, there is a gap in the VR world between VR content and already existing web applications. The potential that VR gives us is endless, with people already taking advantage to create incredibly immersive experiences in the form of games, spatial visualizations, and artistic projects. However, websites remain static, clunky, and uninteractive. Our goal is to bridge this gap and bring the modern web application into this new platform.

This module will hopefully give developers a few extra tools they need to get started with React VR without worrying about the formatting.

### Note about ReactVR
Because of the way that sizing works in ReactVR, everything inside the `ContentPlane` is measured in pixels, while everything else (`Title`, `Navbar`, and `NavbarItem` components) are measured in meters. Keep this in mind when setting font sizes, widths, translations, etc.

## Current list of components (still in development):
### `Title`
Renders a fading in title for your site, along with a start button to enter your site. Refer to our demo site in order to use this properly. This component takes the following props:
- `title`: Changes title of site.
- `startText`: Changes start button text.
- `titleStyling`: Merges with default styling of title.
- `startTextStyling`: Merges with default styling of start button.
- `progressWidth`: This sets the width that the progress bar on the start button will extend up to before activating.

### `Navbar`
Provides a bottom-positioned navigation bar that is visible throughout the entire exploration of the site. Refer to our demo site in order to use this properly. The `Navbar` component takes the following props:
- `content`: Currently, the only way to put links into the navbar is by creating a `content` object as follows:

```javascript
const content = [
        [{label: 'Home', link: '/home'}],
        [{label: 'About', link: '/about'}],
        [{label: 'Gallery', link: '/gallery'}]
    ]

...

<Navbar content={content} />
```
We will be making this easier in later versions.

- `navbarStyle`: Merges with default styling of the `Navbar` component.
- `linkStyle`: Merges with the default styling of the `NavbarItem` component.
- `linkBgColor`: The background color of an unselected link.
- `linkSelectedColor`: The background color of a selected link.
- `progressDisabled`: Whether you want the progress bar to be disabled. By default disabling is determined based on whether the link corresponds to the page you are currently on (similar to the `NavLink` component in the `react-router-dom`).
- `progressColor`: The color of the progress bar on hover.

### `ContentPlane`
Wraps and centers the page (excluding the `Title` and `NavBar` components) in a spherical plane for better presentation. Looks best with a maximum of 5-6 component units.

### `Cards`
#### `TextCard`, `ImageCard`, `VideoCard`
Three components for individual cards on the `ContentPlane`. They all take the following props:

- `flex`: How many units you want the card to take up on the `ContentPlane`. The default is set to 1.
- `cardStyling`: Merges with the default styling of the card.

The `TextCard` component takes the following additional prop:
- `text`: The text you want to display. You can also just add text in between `TextCard` tags.
- `textStyling`: Merges with the default styling for text.

The `ImageCard` and `VideoCard` components take the following additional prop:
- `src`: A link to the image/video.
#### `ImageCaption`
The same as `ImageCard`, but takes in the extra following prop:
- `caption`: The caption you want to display. You can also just add the caption in between `ImageCaption` tags.
- `alwaysShow`: A boolean value of whether you want the caption to always be visible (`true`) or only when you hover over the photo (`false`). The default is set to false.
- `captionStyling`: Merges with the default styling for the caption.
#### `Gallery`
Similar to the various cards, except that multiple `GalleryItems` can be taken in and are dynamically arranged in rows and columns. The `Gallery` component takes in the following props:
- `rows`: The number of rows in the gallery. The default is set to 2.
- `cols`: The number of columns in the gallery. The default is set to 3.
- `flex`: How many units you want the gallery to take up on the `ContentPlane`. The default is calculated dynamically based on its content.
- `galleryStyling`: Merges with the default styling for the gallery.
- `galleryItemStyling`: Merges with the default styling for each `GalleryItem` component.
##### `GalleryItem`
A subcomponent of the `Gallery`. This component takes the following props:
- `type`: Specifies type of item ("image", "text", or "video")
- `text`: Used for the `text` type.
- `src`: Used for the `image` and `video` types.
- `itemStyling`: Overrides default styling for `GalleryItem` component. (Still not 100% working)
#### `CardContainer`
Wraps each card (`ImageCaption`, `ImageCard`, `TextCard`, `VideoCard`, `Gallery`) to provide appropriate spacing on the `ContentPlane`. This functionality is already included by default, but for custom components it may be useful. It takes the following props:
- `flex`: How many units you want the card to take up on the `ContentPlane`. The default is set to 1.
- `cardStyling`: Merges with the default styling for the card.

### `Carousel`
This is a holder for multiple images or textblocks in the form of dynamically-created `CarouselItems`, with buttons used to scroll through the collection. The `Carousel` component takes the following props:

- `flex`: How many units you want the card to take up on the `ContentPlane`. The default is set to 1.
- `type`: A string indicating the type of collection you want ('image' or 'text').
- `imageCollection`: If of type 'image', the `imageCollection` prop will take an array of URLs associated with the images you want to display.
- `maxTextLength`: The number of characters you want before the text wraps onto a new card.
- `cardStyling`: This merges with the default styling for all cards in the carousel.
- `buttonStyling`: This merges with the default styling for the buttons.
- `arrowStyling`: This merges with the default styling for the arrows.

### `GazeButton`
This button is particular to VR, wherein the user simply gazes at the button for a given period of time until it activates or 'clicks'. It takes the following props:
- `timeout`: This corresponds to the amount of time (in milliseconds) that the user must gaze at the button before it activates. The default is set to 1000.
- `buttonStyle`: Merges with the default styling for the button.
- `progressDisabled`: Whether you want the progress bar to be disabled. By default disabling is determined based on whether the link corresponds to the page you are currently on (similar to the `NavLink` component in the `react-router-dom`).
- `progressColor`: The color of the progress bar on hover.
- `progressWidth`: This sets the width that the progress bar will extend up to before activating.
- `onHover`: Callback that will be invoked when the user hovers over the button.
- `onTrigger`: Callback that will be invoked when the user gazes at the button until the timeout finishes.
- `onLeave`: Callback that will be invoked when the user stops hovering over the button.