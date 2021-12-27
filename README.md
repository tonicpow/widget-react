# Widget (React Component)

> Easy integration using React

[![last commit](https://img.shields.io/github/last-commit/tonicpow/widget-react.svg?style=flat&v=1)](https://github.com/tonicpow/widget-react/commits/master)
[![version](https://img.shields.io/github/release-pre/tonicpow/widget-react.svg?style=flat&v=1)](https://github.com/tonicpow/widget-react/releases)
[![Sponsor](https://img.shields.io/badge/sponsor-TonicPow-181717.svg?logo=github&style=flat&v=1)](https://github.com/sponsors/TonicPow)
[![slack](https://img.shields.io/badge/slack-tonicpow-orange.svg?style=flat&v=1)](https://atlantistic.slack.com/app_redirect?channel=tonicpow)
[![npm](https://img.shields.io/npm/v/@tonicpow/widget-react?v=1)](https://www.npmjs.com/package/@tonicpow/widget-react)

## Table of Contents

- [Features](#Features)
- [Installation](#installation)
- [Documentation](#documentation)
- [Examples](#examples)
- [Code Standards](#code-standards)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create banner widgets
- Create share button widgets

## Installation

```shell script
yarn
```

<br/>

## Documentation

Read more about the [TonicPow API](https://docs.tonicpow.com) platform.

<details>
<summary><strong><code>Supported Browsers</code></strong></summary>

TonicPow supports all commonly used browsers. Below is a list of popular browsers and their minimum supported version.
If we're missing a browser, suggest one [via an issue](https://github.com/tonicpow/widget-react/issues/new).

| Browser | Platform | Min Version |
|:--------|:---------|:------------|
| Android | Mobile   | 67.0        |
| Bottle  | Desktop  | 0.1         |
| Brave   | Desktop  | 55.0        |
| Chrome  | Desktop  | 55.0        |
| Chrome  | Mobile   | 74.0        |
| Edge    | Desktop  | 17.0        |
| Firefox | Desktop  | 52.0        |
| Firefox | Mobile   | 67.0        |
| IE      | Desktop  | ---         |
| Opera   | Desktop  | 42.0        |
| Opera   | Mobile   | ---         |
| Safari  | Desktop  | 10.1        |
| Safari  | Mobile   | 10.3        |

</details>

<details>
<summary><strong><code>Library Deployment</code></strong></summary>

[goreleaser](https://github.com/goreleaser/goreleaser) for easy binary or library deployment to Github and can be installed via: `brew install goreleaser`.

The [.goreleaser.yml](.goreleaser.yml) file is used to configure [goreleaser](https://github.com/goreleaser/goreleaser).

Use `make release-snap` to create a snapshot version of the release, and finally `make release` to ship to production.

</details>

<details>
<summary><strong><code>Makefile Commands</code></strong></summary>

View all `makefile` commands

```shell script
make help
```

List of all current commands:

```text
audit                Checks for vulnerabilities in dependencies
build                Builds the package for web distribution
clean                Remove previous builds and any test cache data
install              Installs the dependencies for the package
lint                 Runs the standard-js lint tool
outdated             Checks for outdated packages via npm
release              Deploy to npm
test                 Runs all tests
help                 Show this help message
release              Full production release (creates release in Github)
release-test         Full production test release (everything except deploy)
release-snap         Test the full release (build binaries)
replace-version      Replaces the version in HTML/JS (pre-deploy)
tag                  Generate a new tag and push (tag version=0.0.0)
tag-remove           Remove a tag if found (tag-remove version=0.0.0)
tag-update           Update an existing tag to current commit (tag-update version=0.0.0)
```

</details>

<br/>

## Examples

View some [example TonicPow widgets](https://tonicpow.com/guides/promoters/create-widget)

<br/>

## Code Standards

Always use the language's best practices and don't optimize early :P

<br/>

## Usage

To see the available widgets and run in standalone mode, we've conveniently added all components to storybook.

```shell script
yarn storybook
```

To use this in your project, just do

```
import TonicPowWidget from "@tonicpow/widget-react"
<TonicPowWidget widgetId="your-widget-id">
```

We are using it! Visit [our website](https://tonicpow.com) to see it in action.

<br/>

## Maintainers

| [<img src="https://github.com/mrz1836.png" height="50" alt="MrZ" />](https://github.com/mrz1836) | [<img src="https://github.com/rohenaz.png" height="50" alt="Satchmo" />](https://github.com/rohenaz) |
|:------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|
|                                [MrZ](https://github.com/mrz1836)                                 |                                [Satchmo](https://github.com/rohenaz)                                 |

<br/>

## Contributing

View the [contributing guidelines](.github/CONTRIBUTING.md) and follow the [code of conduct](.github/CODE_OF_CONDUCT.md).

### How can I help?

All kinds of contributions are welcome :raised_hands:!
The most basic way to show your support is to star :star2: the project, or to raise issues :speech_balloon:.
You can also support this project by [becoming a sponsor on GitHub](https://github.com/sponsors/TonicPow) :clap:
or by making a [**bitcoin donation**](https://tonicpow.com/?utm_source=github&utm_medium=sponsor-link&utm_campaign=widget-react&utm_term=widget-react&utm_content=widget-react) to ensure this journey continues indefinitely! :rocket:

<br/>

## License

[![License](https://img.shields.io/badge/license-Open%20BSV-brightgreen.svg?style=flat&v=1)](/LICENSE)
