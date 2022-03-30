import * as vscode from 'vscode';
import { CommandCodeLensProvider } from './commandCodeLensProvider';
import cp = require('child_process');
import { basename } from 'path';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('markdown.run.command', (args) => {
			var editor = vscode.window.activeTextEditor;
			var currentFilePath = "";
			if (editor != undefined) {
				currentFilePath = editor.document.fileName;
				currentFilePath = currentFilePath.substring(0, currentFilePath.lastIndexOf('/'))
			}
			var term = vscode.window.activeTerminal;

			if (term == undefined) {
				term = vscode.window.createTerminal();
				term.sendText("cd " + currentFilePath);
			}
			// check if there's a running command in the active terminal, if there is one
			// create a new term
			term.show();
			term.sendText(args.command);
		})
	);

	context.subscriptions.push(
		vscode.languages.registerCodeLensProvider({ language: 'markdown', scheme: 'file' },
			new CommandCodeLensProvider())
	);
}

export function deactivate() { }
