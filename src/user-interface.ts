import readline from 'readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

export type QuestionOption = { optionDescription:string, action: () => Promise<void>}
export type QuestionOptions = {[option:string]: QuestionOption}

function toMap(options: QuestionOptions): Map<string, [string, () => Promise<void>]>{
    return new Map(
        Object
            .entries(options)
            .map((entry) =>{
            return [entry[0], [entry[1].optionDescription, entry[1].action]]
        })) 
}

export class UserInterface {
    clear(){
       console.clear()
    }

    async wait_for_enter(){
        await rl.question("");
    }

    write_line(str:string){
        console.log(str)
    }

    async ask_question(question:string, options: QuestionOptions): Promise<void>{
        return this.ask_question_internal(question, toMap(options))
    }

    private async ask_question_internal(str:string, answers: Map<string, [string, () => Promise<void>]>): Promise<void>{
        let question_with_opt = this.format_question(str, answers);
        let result = await rl.question(question_with_opt);
        let a = answers.get(result)
        console.log(a)
        if (!a) {
            this.write_line("Unknown Answer - try again");
            await this.ask_question_internal(str, answers);
        }else {
            console.log("found option", a)
            a[1]()
        }
    }

    pause(time_seconds: number){
        return new Promise(resolve => setTimeout(resolve, time_seconds * 1000))
    }


    private format_question(question: string, answers: Map<string, [string, () => Promise<void>]>){
        let optionsText = Array.from(answers.entries()).map(op => {
            let optionKey = op[0];
            let optionDescription = op[1][0];
            return `[${optionKey}] - ${optionDescription}`;
        });

        return `\r\n${question}\r\n${optionsText.join("\r\n")}\r\n\r\n>`
    }
}

export const user_interface = new UserInterface();
