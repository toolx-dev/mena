import Calime from "calime";

type Color = [number, number, number];

interface MenaOptions {
    barLength?: number;
    completedChar?: string;
    incompleteChar?: string;
    barStartChar?: string;
    barEndChar?: string;
    completeCharColor?: Color[];
    incompleteCharColor?: Color[];
}

class Mena {
    private task: {
        name: string;
        isComplete: boolean;
    };
    private numLinesPrinted: number;
    private options: MenaOptions;
    private calime: Calime;

    constructor(options: MenaOptions = {}) {
        this.task = {
            name: '',
            isComplete: false,
        };
        this.numLinesPrinted = 0;

        this.options = {
            barLength: options.barLength ?? 40,
            completedChar: options.completedChar ?? "━",
            incompleteChar: options.incompleteChar ?? "━",
            barStartChar: options.barStartChar ?? "",
            barEndChar: options.barEndChar ?? "",
            completeCharColor: options.completeCharColor ?? [[255, 255, 0], [255, 55, 255], [33, 33, 255]],
            incompleteCharColor: options.incompleteCharColor ?? [[60, 60, 60]]
        };

        this.calime = new Calime('');
    }

    private clearLines(numLines: number): void {
        for (let i = 0; i <= numLines; i++) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.moveCursor(0, -1);
        }
    }

    update(value: string | number, text?: string): void {
        this.clearLines(this.numLinesPrinted);
        if (typeof value === 'string') {
            console.log(this.printText(value));
        } else {
            this.task.isComplete = value >= 1;
            console.log(this.printProgressBar(value, text));
        }
    }

    private printProgressBar(progress: number, text?: string): string {
        const {
            barLength,
            completedChar,
            incompleteChar,
            barStartChar,
            barEndChar,
            completeCharColor,
            incompleteCharColor,
        } = this.options as {
            barLength: number;
            completedChar: string;
            incompleteChar: string;
            barStartChar: string;
            barEndChar: string;
            completeCharColor: Color[];
            incompleteCharColor: Color[];
        };

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

    private printText(text: string, color: Color = [255, 255, 255], backgroundColor?: Color): string {
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
