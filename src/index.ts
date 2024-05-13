import {
  PathSegments,
  ScaleFactors,
  MoveSegment,
  SegmentType,
  VerticalSegment,
  ArcSegment,
  Segment,
  AbsSegment,
  RelSegmentType,
  RelSegment,
  HorizontalSegment,
  AbsSegmentType,
} from './types';

/**
 * expected argument lengths
 */
const length: { [key in RelSegmentType]: number } = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };
/**
 * segment pattern
 */
const segment = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
/**
 * number pattern
 */
const number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

const parseValues = (args: string): number[] => (args.match(number) || []).map(Number);

export function parse(path: string): PathSegments {
  const data: PathSegments = [];
  path.replace(segment, (match, type: SegmentType, args: string) => {
    let relType = type.toLowerCase() as RelSegmentType;
    const argsParsed = parseValues(args);

    // If special case of implicit LineTo after M fake the next L
    if (relType === 'm' && argsParsed.length > 2) {
      data.push([type, ...argsParsed.splice(0, 2)] as MoveSegment);
      relType = 'l';
      type = type === 'm' ? 'l' : 'L';
    }

    // Loop for implicit commands
    do {
      // If the number of parameters is wrong, fail
      if (argsParsed.length < length[relType]) {
        throw new Error(`malformed path data: ${match.trim()}`)
      };
      // push command and args and continue if more args are expected
      data.push([type, ...argsParsed.splice(0, length[relType])] as Segment);
    } while (length[relType] && argsParsed.length >= length[relType])

    return match;
  });
  return data;
}

export function serialize(segments: PathSegments): string {
  return segments.reduce((str, segment) => str + segment[0] + segment.slice(1).join(','), '');
}

export function scaleSegments(segments: PathSegments, { sx, sy }: ScaleFactors): PathSegments {
  return segments.map<Segment>((segment) => {
    const [type, ...args] = segment;

    if (type.toLowerCase() === 'v') {
      (segment as VerticalSegment)[1] *= sy;
      return segment;
    }

    if (type.toLowerCase() === 'a') {
      const arcSegment = segment as ArcSegment;
      arcSegment[1] *= sx;
      arcSegment[2] *= sy;
      arcSegment[6] *= sx;
      arcSegment[7] *= sy;
      return arcSegment;
    }

    return [type, ...args.map((val: number, i: number) => (val *= i % 2 ? sx : sy))] as Segment;
  });
}

export function relative(path: PathSegments): RelSegment[] {
  let startX = 0;
  let startY = 0;
  let x = 0;
  let y = 0;

  return path.map((segment) => {
    const [type, ...args] = segment;
    const relType = type.toLowerCase() as RelSegmentType;
    segment = [relType, ...args] as RelSegment;

    // is absolute
    if (type != relType) {
      segment[0] = relType;
      switch (type) {
        case 'A':
          (segment as ArcSegment)[6] -= x;
          (segment as ArcSegment)[7] -= y;
          break;
        case 'V':
          (segment as VerticalSegment)[1] -= y;
          break;
        case 'H':
          (segment as HorizontalSegment)[1] -= x;
          break;
        default:
          for (let i = 1; i < segment.length; ) {
            (segment[i++] as number) -= x;
            (segment[i++] as number) -= y;
          }
      }
    }

    // update cursor state
    switch (relType) {
      case 'z':
        x = startX;
        y = startY;
        break;
      case 'h':
        x += (segment as HorizontalSegment)[1];
        break;
      case 'v':
        y += (segment as VerticalSegment)[1];
        break;
      case 'm':
        x += (segment as MoveSegment)[1];
        y += (segment as MoveSegment)[2];
        startX += (segment as MoveSegment)[1];
        startY += (segment as MoveSegment)[2];
        break;
      default:
        x += segment[segment.length - 2] as number;
        y += segment[segment.length - 1] as number;
    }

    return segment;
  });
}

export function absolute(path: PathSegments): AbsSegment[] {
  let startX = 0;
  let startY = 0;
  let x = 0;
  let y = 0;

  return path.map((segment) => {
    const [type, ...args] = segment;
    const absType = type.toUpperCase() as AbsSegmentType;
    segment = [absType, ...args] as AbsSegment;

    // is relative
    if (type != absType) {
      segment[0] = absType;
      switch (type) {
        case 'a':
          (segment as ArcSegment)[6] += x;
          (segment as ArcSegment)[7] += y;
          break;
        case 'v':
          (segment as VerticalSegment)[1] += y;
          break;
        case 'h':
          (segment as HorizontalSegment)[1] += x;
          break;
        default:
          for (let i = 1; i < segment.length; ) {
            (segment[i++] as number) += x;
            (segment[i++] as number) += y;
          }
      }
    }

    // update cursor state
    switch (absType) {
      case 'Z':
        x = startX;
        y = startY;
        break;
      case 'H':
        x = (segment as HorizontalSegment)[1];
        break;
      case 'V':
        y = (segment as VerticalSegment)[1];
        break;
      case 'M':
        [x, y] = [(segment as MoveSegment)[1], (segment as MoveSegment)[2]];
        [startX, startY] = [x, y];
        break;
      default:
        [x, y] = [segment[segment.length - 2] as number, segment[segment.length - 1] as number];
    }

    return segment;
  });
}

export function scalePath(path: string, sx: number, sy: number): string {
  return serialize(scaleSegments(parse(path), { sx, sy }));
}
