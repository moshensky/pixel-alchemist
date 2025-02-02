# Challenge analyzis and break down notes

## Initial brain dump

- new repository
- new TS project using vite vitest
- setup linter/formatting - biome
- use [React Testing Library](https://testing-library.com)
- redux toolkit
- storybook
- github action to run automated tests
- use github pages to deploy the app
- handle network error failures
- use pagination next/previous with items count per page
- tailwind css
- check lorem picsum api documentation for all necessary apis for image manipulating and browsing
- use query string for storage, sanitized query strings with fallbacks to defaults
- browser history api
- react router or just hand code it
- use fp-ts (validation? find a use case), zod
- validate input for editing images
- download the image
- use error boundaries
- do not over engineer
- unit test components: get by text, by rule, test behavior, check callbacks
- maybe add to readme design considerations (technicalities)

## Break down

### Core requirements

> This is a content creation tool that can edit selected images and download them

1. Use [Lorem Picsum](https://picsum.photos) API
1. Image gallery
  - paginated list of images
  - image preview with author's name
  - on image click (or maybe the whole item, which includes author's name) navigate to image editing functionality
2. Edit image
  - editing features
    - [ ] size adjustments using height and width (do we want lock the ratio option?)
    - [ ] grayscale mode (what does mode mean?)
    - [ ] blur with grade between 1 - 10
  - show live preview of edited image (do we want to show the original somewhere as well?)
  - download the image
3. State management and navigation
  - persist state through page refreshes
  - maintain navigation history (should we persist and go back/forward through image editing actions, i.e. undo/redo)

### Technical considerations

- Consider image sizes for image gallery (should we use webp?)
- Lorem Picsum API Integration via redux toolkit query
- URL state management for navigation combined with redux toolkit
- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- React for the UI
- Tailwind CSS for styling
- Make the app responsive
- Caching data?

### API integration

There are 1084 images.

#### Image api

Base url `https://picsum.photos/id/{imageId}/{imageWidth}/{imageHeight}`.

Image can be grayscaled and/or blurred by appending query string to the base url:
  - grayscale
  - blur={blurValue}, where blurValue [1, 10]

Get concrete image with size:

```txt
https://picsum.photos/id/{id}/{width}/{height}
https://picsum.photos/id/237/200/300
https://picsum.photos/id/237/200/200
https://picsum.photos/id/237/200/600
```

Mage image grayscale:

```txt
https://picsum.photos/id/{id}/{width}/{height}?grayscale
https://picsum.photos/id/237/200/300?grayscale
```

Blur image:

```txt
https://picsum.photos/id/{id}/{width}/{height}?blur={<1-10>}
https://picsum.photos/id/237/200/300?grayscale
```

#### List images api

Base url `https://picsum.photos/v2/list`.
Returns an array of:

```json
{
  "id": "0",
  "author": "Alejandro Escamilla",
  "width": 5000,
  "height": 3333,
  "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
  "download_url": "https://picsum.photos/id/0/5000/3333"
}
```

Query string options:

- to request concrete page: `page={pageNumber}`
- set items per page: `limit={itemsCount}`

The `Link` header includes pagination information about the next/previous pages, i.e:

```txt
For: https://picsum.photos/v2/list?page=2&limit=100
<https://picsum.photos/v2/list?page=1&limit=100>; rel=\"prev\", <https://picsum.photos/v2/list?page=3&limit=100>; rel=\"next\"

For: https://picsum.photos/v2/list?page=1&limit=100
<https://picsum.photos/v2/list?page=2&limit=100>; rel="next"
```
