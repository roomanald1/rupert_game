import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("ts-node/esm", pathToFileURL("./"));


import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Is this a good place to start? [y/n]", 
    (answer) => {
        switch(answer.toLowerCase())
        {
            case "y":
                console.log("You said YES")
                break;
            case "n":
                console.log("You said NO")
                break;
        }
        rl.close()
    }
)