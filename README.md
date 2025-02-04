# ![logo](./public/favicon-32x32.png) Pixel Alchemist

[![CI](https://github.com/moshensky/pixel-alchemist/actions/workflows/ci.yml/badge.svg)](https://github.com/moshensky/pixel-alchemist/actions/workflows/ci.yml)

A React-based image manipulation tool that allows users to edit and download images from [Lorem Picsum](https://picsum.photos/).

[View Demo](https://pixel-alchemist.moshensky.com)

## Features

- Browse and select images from Lorem Picsum gallery
- Adjust image dimensions with aspect ratio lock
- Apply effects:
  - Grayscale conversion
  - Blur adjustment
- Real-time preview
- Download modified images
- Responsive design
- URL-based state management for shareable edits

## Architecture

- **React** for UI components
- **Redux Toolkit** with RTK Query for API integration
- **React Router** for routing and URL-based state
- **TailwindCSS** for styling
- **Zod** for runtime type validation
- **Vitest** for testing
- **React Intl** for i18n

### Interesting Implementation Details

- URL-based state management for editor settings
- Debounced image preview updates
- Maintainable aspect ratio logic
- Pure functional dimension calculations
- Controlled form components with local state
- Unit testing

## Development

```bash
# Set Node.js version
nvm use

# Install dependencies
npm install

# Start development server
npm run start

# Run tests
npm test

# Run storybook
npm run storybook

# Type checking
npm run tsc

# Type checking in wathch mode
npm run tsc:watch

# Lint & format
npm run lint

# Lint, format & fix
npm run lint:fix

# Extract translations
npm run i18n:extract

# Compile translated files
npm run i18n:compile
```

## Build and Deploy

Execute with appropriate version and port:

```sh
./ops/deploy/deploy.sh --set-version vX.X.X --port X
```

## Future Enhancements

- Automate message extractions for translation services
- Automate translated messages compilations
- Implement ability to switch languages
- Light/dark color schemes
- Add more image effects and filters
- Image cropping functionality
- Custom aspect ratio presets
