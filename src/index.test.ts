import { parse, serialize, scaleSegments, relative, absolute, scalePath } from './index';
import { PathSegments } from './types';

describe('SVG Path Parser', () => {
  let segmentsParsed: PathSegments, segmentsComplexAbs: PathSegments, segmentsComplexRel: PathSegments, segmentsSimple: PathSegments;
  beforeEach(() => {
     segmentsParsed = [['M', 10, 10], ['L', 50, 50],['L', 100, 100], ['C', 50, 50, 70, 70, 80, 80], ['Z']];
     segmentsComplexAbs = [['M', 10, 10], ['L', 20, 20], ['V', 30], ['H', 30], ['A', 10, 20, 30, 40, 10, 20, 30], ['Z']];
     segmentsComplexRel = [['m', 10, 10], ['l', 10, 10], ['v', 10], ['h', 10], ['a', 10, 20, 30, 40, 10, -10, 0], ['z']];
     segmentsSimple = [['M', 10, 10], ['L', 20, 20]];
  })

  describe('parse', () => {
    test('parse', () => {
      const path = 'M10 10 L50 50 L100 100 C50 50, 70 70, 80 80 Z';
      const result = parse(path);
      expect(result).toEqual(segmentsParsed);
    });

    test('parse M with implicit L', () => {
      const path = 'M10, 10 50, 50 L100 100 C50 50, 70 70, 80 80 Z';
      const result = parse(path);
      expect(result).toEqual(segmentsParsed);
    })

    test('parse relative M with implicit L', () => {
      const path = 'm10, 10 40, 40 L100 100 C50 50, 70 70, 80 80 Z';
      const result = absolute(parse(path));
      expect(result).toEqual(segmentsParsed);
    })

    test('parse M with two implicit Ls', () => {
      const path = 'M10, 10 50, 50 100, 100 C50 50, 70 70, 80 80 Z';
      const result = parse(path);
      expect(result).toEqual(segmentsParsed);
    })

    test('throw on error', () => {
      const path = 'M10 10 L50 C50 50, 70 70, 80 80 Z';
      expect(() => parse(path)).toThrow('malformed path data: L50');
    })
  })

  test('serialize', () => {
    const result = serialize(segmentsSimple);
    expect(result).toBe('M10,10L20,20');
  });

  test('scaleSegments', () => {
    const result = scaleSegments(segmentsComplexAbs, { sx: 2, sy: 2 });
    expect(result).toEqual([['M', 20, 20], ['L', 40, 40], ['V', 60], ['H', 60], ['A', 20, 40, 30, 40, 10, 40, 60], ['Z']]);
  });

  test('relative', () => {
    const result = relative(segmentsComplexAbs);
    expect(result).toEqual(segmentsComplexRel);
  });

  test('absolute', () => {
    const result = absolute(segmentsComplexRel);
    expect(result).toEqual(segmentsComplexAbs);
  });

  test('scalePath', () => {
    const path = serialize(segmentsSimple);
    const result = scalePath(path, 2, 2);
    expect(result).toBe('M20,20L40,40');
  });
});
