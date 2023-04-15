import { ICommand, botCommand } from "./factories/command/command.factory.types"
import { ping } from './commands/ping.command';
import { helpCommand } from './commands/help.command';

export const commands: Record<string, ICommand> = {ping, helpCommand}

export const aliasUnique = (commands: Record<string, ICommand>): boolean => {
    const aliases = Object.values(commands).map(command => command.aliases).flat();
    return aliases.length === new Set(aliases).size;
}

export const getCommandRouter: (commands: Record<string, ICommand>) => Map<string, botCommand> = (commands) => {
    const commandRouter = new Map<string, botCommand>();
    Object.entries(commands).forEach(([commandName, command]) => {
        commandRouter.set(command.commandName, command.run);
        command.aliases.forEach(alias => {
            commandRouter.set(alias, command.run);
        })
    })
    return commandRouter;
}
