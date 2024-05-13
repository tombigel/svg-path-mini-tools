export type RelMoveSegment = ["m", number, number];
export type AbsMoveSegment = ["M", number, number];
export type MoveSegment = RelMoveSegment | AbsMoveSegment;
export type RelLineSegment = ["l", number, number];
export type AbsLineSegment = ["L", number, number];
export type LineSegment = RelLineSegment | AbsLineSegment;
export type RelHorizontalSegment = ["h", number];
export type AbsHorizontalSegment = ["H", number];
export type HorizontalSegment = RelHorizontalSegment | AbsHorizontalSegment;
export type RelVerticalSegment = ["v", number];
export type AbsVerticalSegment = ["V", number];
export type VerticalSegment = RelVerticalSegment | AbsVerticalSegment;
export type RelClosePathSegment = ["z"];
export type AbsClosePathSegment = ["Z"];
export type ClosePathSegment = RelClosePathSegment | AbsClosePathSegment;
export type RelBezierCurveSegment = ["c", number, number, number, number, number, number];
export type AbsBezierCurveSegment = ["C", number, number, number, number, number, number];
export type BezierCurveSegment = RelBezierCurveSegment | AbsBezierCurveSegment;
export type RelFollowingBezierCurveSegment = ["s", number, number, number, number];
export type AbsFollowingBezierCurveSegment = ["S", number, number, number, number];
export type FollowingBezierCurveSegment = RelFollowingBezierCurveSegment | AbsFollowingBezierCurveSegment;
export type RelQuadraticCurveSegment = ["q", number, number, number, number];
export type AbsQuadraticCurveSegment = ["Q", number, number, number, number];
export type QuadraticCurveSegment = RelQuadraticCurveSegment | AbsQuadraticCurveSegment;
export type RelFollowingQuadraticCurveSegment = ["t", number, number];
export type AbsFollowingQuadraticCurveSegment = ["T", number, number];
export type FollowingQuadraticCurveSegment = RelFollowingQuadraticCurveSegment | AbsFollowingQuadraticCurveSegment;
export type RelArcSegment = ["a", number, number, number, number, number, number, number];
export type AbsArcSegment = ["A", number, number, number, number, number, number, number];
export type ArcSegment = RelArcSegment | AbsArcSegment;

export type Segment =
    | MoveSegment
    | LineSegment
    | HorizontalSegment
    | VerticalSegment
    | ClosePathSegment
    | BezierCurveSegment
    | FollowingBezierCurveSegment
    | QuadraticCurveSegment
    | FollowingQuadraticCurveSegment
    | ArcSegment;

export type RelSegment = 
    | RelMoveSegment
    | RelLineSegment
    | RelHorizontalSegment
    | RelVerticalSegment
    | RelClosePathSegment
    | RelBezierCurveSegment
    | RelFollowingBezierCurveSegment
    | RelQuadraticCurveSegment
    | RelFollowingQuadraticCurveSegment
    | RelArcSegment;

export type AbsSegment =
    | AbsMoveSegment
    | AbsLineSegment
    | AbsHorizontalSegment
    | AbsVerticalSegment
    | AbsClosePathSegment
    | AbsBezierCurveSegment
    | AbsFollowingBezierCurveSegment
    | AbsQuadraticCurveSegment
    | AbsFollowingQuadraticCurveSegment
    | AbsArcSegment;

export type RelSegmentType = RelSegment[0];
export type AbsSegmentType = AbsSegment[0];
export type SegmentType = Segment[0];
export type PathSegments = Segment[];
export type ScaleFactors = { sx: number, sy: number };