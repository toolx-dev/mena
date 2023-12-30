
<p align="center">
  <a href="https://www.npmjs.com/package/mena" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/toolx-dev/mena/main/logo.png" alt="mena logo" />
  </a>
</p>
<br/>
<p align="center">
  <a href="https://www.npmjs.com/package/@toolx/core"><img src="https://img.shields.io/npm/v/mena" alt="npm package"></a>
  <img alt="NPM" src="https://img.shields.io/npm/l/mena">
</p>
<br/>


# mena

## Introduction
`Mena` is a dynamic progress bar class for Node.js console applications, offering customizable visual elements for real-time progress tracking. Ideal for CLI tools, it enhances user interaction with progress visualization.

::: tip
`Mena` is designed for ease of use and customization, focusing on console progress display. For additional features or complex console UIs, consider specialized libraries.
:::

## Features
- **Customizable Progress Bar**: Tailor the length, characters, and colors of the progress bar.
- **Real-time Updates**: Dynamically update the progress bar in response to application events.
- **Color Support**: Set different colors for complete and incomplete segments.
- **Ease of Use**: Simple API for quick integration into Node.js applications.

## Installation

Install `Mena` in your Node.js project via npm. Ensure your environment supports ESModule syntax for seamless integration. Run the following command:

```bash
npm install mena
```

## Usage
To use `Mena`, import it into your Node.js project, create an instance, and utilize its methods to display and update the progress bar.

```javascript
import Mena from 'mena';

const progressBar = new Mena();
progressBar.update(0.5, 'Processing...'); // Update the progress bar to 50%
```

## API Reference

### Constructor
- `Mena(options?: MenaOptions)` - Initializes the progress bar with optional custom settings.

### Methods
- `update(value: string | number, text?: string): void` - Updates the progress bar or displays a message.

### Interface
- `MenaOptions` - Options for customizing the progress bar's appearance and behavior.

## Contributing
Contributions to `Mena` are welcome. This library is part of the [toolx](https://github.com/williammanco/toolx) library.

## License
`Mena` is open-sourced under the MIT license, suitable for both personal and commercial use.
