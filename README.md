# Phantom Components

**Phantom Components** came about from the recent release of the exciting new technology, React VR, which grants software developers a much more streamlined way into the world of programming in virtual reality. 

Currently, there is a gap in the VR world between VR content and already existing web applications. The potential that VR gives us is endless, with people already taking advantage to create incredibly immersive experiences in the form of games, spatial visualizations, and artistic projects. However, websites remain static, clunky, and uninteractive. Our goal is to bridge this gap and bring the modern web application into this new platform.

This module will hopefully give developers a few extra tools they need to get started with React VR without worrying about the formatting.

## Current list of components (still in development):
### `Title`
Renders a fading in title for your site, along with a start button to enter your site. Refer to our demo site in order to use this properly. This component takes the following props:
- `title`: Changes title of site.

### `Navbar`
Provides a bottom-positioned navigation bar that is visible throughout the entire exploration of the site. Refer to our demo site in order to use this properly. The `Navbar` component takes the following props:
- `content`: Currently, the only way to put links into the navbar is by creating a `content` object as follows:
- `navbarStyle`: merges with default styling of the `Navbar` component.
- `linkStyle`: merges with the default styling of the `NavbarItem` component.

### `ContentPlane`
Wraps and centers the page (excluding the `Title` and `NavBar` components) in a spherical plane for better presentation. Looks best with a maximum of 5-6 component units.

### `Cards`
#### `TextCard`, `ImageCard`, `VideoCard`
Three components for individual cards on the `ContentPlane`. They all take the following props:

- `flex`: How many units you want the card to take up on the `ContentPlane`. The default is set to 1.

The `TextCard` component takes the following additional prop:
- `text`: The text you want to display. You can also just add text in between `TextCard` tags.

The `ImageCard` and `VideoCard` components take the following additional prop:
- `src`: A link to the image/video.
#### `ImageCaption`
The same as `ImageCard`, but takes in the extra following prop:
- `caption`: The caption you want to display. You can also just add the caption in between `ImageCaption` tags.
- `alwaysShow`: A boolean value of whether you want the caption to always be visible (`true`) or only when you hover over the photo (`false`). The default is set to false.
#### `Gallery`
Similar to the various cards, except that multiple `GalleryItems` can be taken in and are dynamically arranged in rows and columns. The `Gallery` component takes in the following props:
- `rows`: The number of rows in the gallery. The default is set to 2.
- `cols`: The number of columns in the gallery. The default is set to 3.
- `flex`: How many units you want the gallery to take up on the `ContentPlane`. The default is calculated dynamically based on its content.
##### `GalleryItem`
A subcomponent of the `Gallery`. This component takes the following props:
- `type`: Specifies type of item ("image", "text", or "video")
- `text`: Used for the `text` type.
- `src`: Used for the `image` and `video` types.

#### `CardContainer`
Wraps each card (`ImageCaption`, `ImageCard`, `TextCard`, `VideoCard`, `Gallery`) to provide appropriate spacing on the `ContentPlane`. This functionality is already included by default, but for custom components it may be useful.

### `Carousel`
This is a holder for multiple images or textblocks in the form of dynamically-created `CarouselItems`, with buttons used to scroll through the collection. The `Carousel` component takes the following props:

- `flex`: How many units you want the card to take up on the `ContentPlane`. The default is set to 1.
- `type`: A string indicating the type of collection you want ('image' or 'text').
- `imageCollection`: If of type 'image', the `imageCollection` prop will take an array of URLs associated with the images you want to display.
- `maxTextLength`: The number of characters you want before the text wraps onto a new card.