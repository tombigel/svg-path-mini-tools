# svg-path-utils
## A collection of minimalistic SVG path manipulation utilities
### Based on the work of [@jkroso](https://github.com/jkroso) and [@michaelrhodes](https://github.com/michaelrhodes):  

https://github.com/michaelrhodes/scale-svg-path  
https://github.com/jkroso/serialize-svg-path  
https://github.com/jkroso/parse-svg-path  
https://github.com/jkroso/abs-svg-path  
https://github.com/jkroso/rel-svg-path  

**License: MIT**

### API

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
