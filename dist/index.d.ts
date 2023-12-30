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
declare class Mena {
    private task;
    private numLinesPrinted;
    private options;
    private calime;
    constructor(options?: MenaOptions);
    private clearLine;
    update(value: string | number, text?: string): void;
    private printProgressBar;
    private printText;
}
export default Mena;
