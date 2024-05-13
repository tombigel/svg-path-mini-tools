// path-utils.ts
import { Segment, ParsedPath, ScaleFactors } from './types';

/**
 * expected argument lengths
 */
const length: { [key: string]: number } = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };
/**
 * segment pattern
 */
const segment: RegExp = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
/**
 * number pattern
 */
const number: RegExp = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

const parseValues = (args: string): number[] => (args.match(number) || []).map(Number);

export function parse(path: string): ParsedPath {
    const data: ParsedPath = [];
    path.replace(segment, (_, command: string, args: string) => {
        let type = command.toLowerCase();
        let argsParsed = parseValues(args);

        if (type == 'm' && argsParsed.length > 2) {
            data.push([command].concat(argsParsed.splice(0, 2)));
            type = 'l';
            command = command == 'm' ? 'l' : 'L';
        }

        while (true) {
            if (argsParsed.length == length[type]) {
                argsParsed.unshift(command);
                return data.push(argsParsed);
            }
            if (argsParsed.length < length[type]) throw new Error('malformed path data');
            data.push([command].concat(argsParsed.splice(0, length[type])));
        }
    });
    return data;
}

export function serialize(segments: ParsedPath): string {
    return segments.reduce((str, seg) => str + seg[0] + seg.slice(1).join(','), '');
}

export function scaleSegments(segments: ParsedPath, { sx, sy }: ScaleFactors): ParsedPath {
    return segments.map((segment) => {
        const name = segment[0].toLowerCase();

        if (name === 'v') {
            segment[1] *= sy;
            return segment;
        }

        if (name === 'a') {
            segment[1] *= sx;
            segment[2] *= sy;
            segment[6] *= sx;
            segment[7] *= sy;
            return segment;
        }

        return segment.map((val, i) => {
            if (!i) {
                return val;
            }
            return (val *= i % 2 ? sx : sy);
        });
    });
}

export function relative(path: ParsedPath): ParsedPath {
    // Implementation...
}

export function absolute(path: ParsedPath): ParsedPath {
    // Implementation...
}

export function scalePath(path: string, sx: number, sy: number): string {
    return serialize(scaleSegments(parse(path), { sx, sy }));
}
