# SVG Path Mini Tools

## A collection of minimalistic SVG path manipulation utilities

### Rationale

For a work project, I needed to scale paths without using on-the-fly transforms. I discovered that almost all SVG manipulation resources are either outdated (8-10 years old) or resemble feature-packed Swiss Army knives.  

So, I began exploring the smallest solutions I could find. This exploration led me to create this compact package. It allows you to parse a path string, convert it to relative or absolute, and scale it.  

**It's less than 2K when minified, and it's fully tested and typed.**  

I'm confident that I'll discover more use cases in the future, leading to additional functionality. However, I'm committed to preventing this from becoming another bloated SVG library.

### Usage

```js
import {scalePath} from 'svg-path-mini-tools'
const scaled = scalePath('M20, 20 L40, 40 Z', 2, 2) // 'M20,20L40,40Z'
```

### Methods

#### `parse(path: string): array[]`

Parses an SVG path data string.  
Generates an array of commands where each command is an array of the form `[command, arg1, arg2, ...]`.

#### `serialize(segments: array[]): string`

Converts parsed path data back into a string.

#### `relative(path: array[]): array[]`

Defines a path using relative points.  
The input is an array of path commands, and the output is a similar array but with all points defined relative to the previous point.

#### `absolute(path: array[]): array[]`

Redefines a path with absolute coordinates.  
The input is an array of path commands, and the output is a similar array but with all points defined in absolute terms.

#### `scaleSegments(segments: array[], sx: number, sy: number): array[]`

Scales the parsed path data by the given `sx` and `sy` factors.

#### `scalePath(path: string, sx: number, sy: number): string`

Scales an SVG path by the given `sx` and `sy` factors.  
The input is a path string, and the output is a similar string but with all points scaled by the given factors.

## License

[MIT](./LICENSE)

## Credits

### Based on the work of [@jkroso](https://github.com/jkroso) and [@michaelrhodes](https://github.com/michaelrhodes)

<https://github.com/jkroso/serialize-svg-path>  
<https://github.com/jkroso/parse-svg-path>  
<https://github.com/jkroso/abs-svg-path>  
<https://github.com/jkroso/rel-svg-path>  
and  
<https://github.com/michaelrhodes/scale-svg-path>  

### Types Based on work from the [DefinitelyTyped](https://github.com/DefinitelyTyped) project  

<https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/abs-svg-path>  
