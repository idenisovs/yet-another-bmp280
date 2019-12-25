/// <reference types="node" />
import Measurements from './measurements';
export default class Calibration {
    t: number[];
    p: number[];
    constructor(raw: Buffer);
    compensate(raw: Measurements): Measurements;
}
