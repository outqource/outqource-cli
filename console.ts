import * as chalk from "chalk";

type ConsoleColor = "red" | "cyan";

declare global {
  interface Console extends Record<ConsoleColor, (...args: any[]) => void> {}
}

console = {
  ...console,
  red: (...props: any[]) => console.log(chalk.red(props)),
  cyan: (...props: any[]) => console.log(chalk.cyan(props)),
};
