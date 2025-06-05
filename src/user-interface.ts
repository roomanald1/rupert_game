import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export class UserInterface {
    clear(){
       console.clear()
    }
    write_line(str:string){
        console.log(str)
    }
    ask_question(str:string): Promise<string>{
        return new Promise<string>((resolve) =>  rl.question(str, (answer) => resolve(answer.toLowerCase())));
    }

    show_message(str:string) {
        console.log(str);
    }
}

export const user_interface = new UserInterface();