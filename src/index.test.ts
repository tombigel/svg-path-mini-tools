import { parse, serialize, scaleSegments, relative, absolute, scalePath } from './index';
import { PathSegments } from './types';

describe('SVG Path Parser', () => {
  describe('parse', () => {
    test('parse', () => {
      const path = 'M10 10 L50 50 C50 50, 70 70, 80 80 Z';
      const result = parse(path);
      expect(result).toEqual([['M', 10, 10], ['L', 50, 50], ['C', 50, 50, 70, 70, 80, 80], ['Z']]);
    });

    test('parse M with implicit L', () => {
      const path = 'M10, 10 50, 50 C50 50, 70 70, 80 80 Z';
      const result = parse(path);
      expect(result).toEqual([['M', 10, 10], ['L', 50, 50], ['C', 50, 50, 70, 70, 80, 80], ['Z']]);
    })

    test('parse M with two implicit Ls', () => {
      const path = 'M10, 10 50, 50 100, 100 C50 50, 70 70, 80 80 Z';
      const result = parse(path);
      expect(result).toEqual([['M', 10, 10], ['L', 50, 50],['L', 100, 100], ['C', 50, 50, 70, 70, 80, 80], ['Z']]);
    })

    test('throw on error', () => {
      const path = 'M10 10 L50 C50 50, 70 70, 80 80 Z';
      expect(() => parse(path)).toThrow('malformed path data: L50');
    })
  })


  test('serialize', () => {
    const segments: PathSegments = [['M', 10, 10], ['L', 20, 20]];
    const result = serialize(segments);
    expect(result).toBe('M10,10L20,20');
  });

  test('scaleSegments', () => {
    const segments: PathSegments = [['M', 10, 10], ['L', 20, 20]];
    const result = scaleSegments(segments, { sx: 2, sy: 2 });
    expect(result).toEqual([['M', 20, 20], ['L', 40, 40]]);
  });

  test('relative', () => {
    const segments: PathSegments = [['M', 10, 10], ['L', 20, 20]];
    const result = relative(segments);
    expect(result).toEqual([['m', 10, 10], ['l', 10, 10]]);
  });

  test('absolute', () => {
    const segments: PathSegments = [['m', 10, 10], ['l', 10, 10]];
    const result = absolute(segments);
    expect(result).toEqual([['M', 10, 10], ['L', 20, 20]]);
  });

  test('scalePath', () => {
    const path = 'M10 10 L20 20';
    const result = scalePath(path, 2, 2);
    expect(result).toBe('M20,20L40,40');
  });
});
