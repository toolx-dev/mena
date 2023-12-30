import { beforeEach, describe, expect, it, vi } from 'vitest';
import Mena from '../src/index'; 

describe('Mena', () => {
    let mena;

    beforeEach(() => {
        vi.spyOn(global.console, 'log');
        global.process.stdout.clearLine = vi.fn();
        global.process.stdout.cursorTo = vi.fn();
        global.process.stdout.moveCursor = vi.fn();

        mena = new Mena();
        vi.clearAllMocks();
    });

    it('should initialize with default options', () => {
        expect(mena).toBeDefined();
    });

    it('should accept custom options', () => {
        const options = {
            barLength: 50,
            completedChar: '=',
            incompleteChar: '-',
        };
        const customMena = new Mena(options);
        expect(customMena.options.barLength).toBe(50);
    });

    it('should update with a numeric progress value', () => {
        const progress = 0.5;
        mena.update(progress);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('50%'));
    });

    it('should clear previous output before updating', () => {
        mena.update(0.5);
        expect(global.process.stdout.clearLine).toHaveBeenCalled();
        expect(global.process.stdout.cursorTo).toHaveBeenCalled();
    });
});
