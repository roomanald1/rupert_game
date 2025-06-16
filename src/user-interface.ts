import { bold, greenBright } from 'colorette';
import figlet from 'figlet';
import inquirer from 'inquirer';
import readline from 'readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

export function questionOption(str: string, action: () => Promise<void>, type: "question" | "seperator" = "question"): QuestionOption {
    return ({ optionDescription: str, action, type })
}
export type QuestionOption = { optionDescription: string, action: () => Promise<void>, type: "question" | "seperator" }

function toMap(options: QuestionOption[]): Map<string, { type: "seperator" | "question", action: () => Promise<void> }> {
    return new Map(options
        .filter(_ => _)
        .map((entry) => {
            return [entry.optionDescription, { action: entry.action, type: entry.type }]
        }))
}

export class UserInterface {
    end() {
        rl.close();
    }
    clear() {
        console.clear()
    }

    async wait_for_enter() {
        await rl.question("");
    }

    write_title(str: string) {
        console.log(bold(greenBright(figlet.textSync(str, "Ogre"))))
    }

    write_line(str: string) {
        console.log(str)
    }

    async ask_question_input(question: string, answer: string): Promise<boolean> {
        let result = await inquirer.prompt([{
            type: 'input',
            name: 'prompt',
            message: question
        }]);

        if (result.prompt.toLowerCase() == answer.toLowerCase()) {
            return true
        }
        return false;
    }

    async ask_question(question: string, options: QuestionOption[]): Promise<void> {
        return this.ask_question_internal(question, toMap(options))
    }

    private async ask_question_internal(str: string, answers: Map<string, { type: "seperator" | "question", action: () => Promise<void> }>): Promise<void> {

        this.write_line("");
        let choices = Array.from(answers.entries()).map(e => {
            if (e[1].type === "seperator") {
                return new inquirer.Separator()
            } else {
                return `${e[0]}`
            }
        })

        let result = await inquirer.prompt([{
            type: 'list',
            name: 'prompt',
            message: str,
            loop: false,
            choices,
            pageSize: 10
        }]);

        let a = answers.get(result.prompt)
        if (!a) {
            this.write_line("Unknown Answer - try again");
            await this.ask_question_internal(str, answers);
        } else {
            a.action()
        }
    }

    pause(time_seconds: number) {
        return new Promise(resolve => setTimeout(resolve, time_seconds * 1000))
    }
}

export const user_interface = new UserInterface();
