import Calime from "calime";
class Mena {
    constructor(options = {}) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.task = {
            name: '',
            isComplete: false,
        };
        this.numLinesPrinted = 0;
        this.options = {
            barLength: (_a = options.barLength) !== null && _a !== void 0 ? _a : 40,
            completedChar: (_b = options.completedChar) !== null && _b !== void 0 ? _b : "━",
            incompleteChar: (_c = options.incompleteChar) !== null && _c !== void 0 ? _c : "━",
            barStartChar: (_d = options.barStartChar) !== null && _d !== void 0 ? _d : "",
            barEndChar: (_e = options.barEndChar) !== null && _e !== void 0 ? _e : "",
            completeCharColor: (_f = options.completeCharColor) !== null && _f !== void 0 ? _f : [[255, 255, 0], [255, 55, 255], [33, 33, 255]],
            incompleteCharColor: (_g = options.incompleteCharColor) !== null && _g !== void 0 ? _g : [[60, 60, 60]]
        };
        this.calime = new Calime('');
    }
    clearLines(numLines) {
        for (let i = 0; i <= numLines; i++) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.moveCursor(0, -1);
        }
    }
    update(value, text) {
        this.clearLines(this.numLinesPrinted);
        if (typeof value === 'string') {
            console.log(this.printText(value));
        }
        else {
            this.task.isComplete = value >= 1;
            console.log(this.printProgressBar(value, text));
        }
    }
    printProgressBar(progress, text) {
        const { barLength, completedChar, incompleteChar, barStartChar, barEndChar, completeCharColor, incompleteCharColor, } = this.options;
        const barCount = Math.floor(progress * barLength);
        const emptyCount = barLength - barCount;
        let bar = barStartChar;
        for (let i = 0; i < barCount; i++) {
            const ratio = i / barLength;
            const color = Calime.gradientColor(ratio, ...completeCharColor);
            bar += this.calime.setText(completedChar).color(color).render();
        }
        for (let i = 0; i < emptyCount; i++) {
            const ratio = (barCount + i) / barLength;
            const color = Calime.gradientColor(ratio, ...incompleteCharColor);
            bar += this.calime.setText(incompleteChar).color(color).render();
        }
        bar += barEndChar;
        const progressBarInfo = this.calime.setText(text || `${Math.round(progress * 100)}%`).apply('bold').render();
        this.numLinesPrinted = 1;
        return `${bar} ${progressBarInfo}`;
    }
    printText(text, color = [255, 255, 255], backgroundColor) {
        const calime = new Calime(text);
        let backgroundText = calime.color(color).apply('bold');
        if (backgroundColor) {
            backgroundText.background(backgroundColor);
        }
        this.numLinesPrinted = 1;
        return backgroundText.render();
    }
}
export default Mena;
