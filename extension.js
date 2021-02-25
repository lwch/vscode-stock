// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { clear } = require('console');
const vscode = require('vscode');
const stock = require('./stock')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	var hide = {};
	var bars = {};
	var cb = function(bar, obj) {
		if (obj.rate > 0) {
			bar.color = 'red';
		} else if (obj.rate < 0) {
			bar.color = 'lawngreen';
		}
		bar.text = `${obj.name}: ${obj.current}  ${obj.rate}%`;
	}
	var interval = vscode.workspace.getConfiguration('stock').get('interval');
	if (!interval) interval = 1000;
	setInterval(function() {
		var stks = vscode.workspace.getConfiguration('stock').get('stocks');
		for (var i in stks) {
			var stk = stks[i];
			var bar = bars[stk];
			if (!bar) {
				if (hide[stk]) continue;
				(function(stk) {
					var off = vscode.commands.registerCommand('extension.statusbar-stock.off-'+stk, function() {
						hide[stk] = true;
						bars[stk].dispose();
					});
					context.subscriptions.push(off);
				})(stk);
				bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
				bar.command = 'extension.statusbar-stock.off-'+stk;
				bar.show();
				context.subscriptions.push(bar);
				bars[stk] = bar;
			}
			stock.get(stks[i], bar, cb);
		}
		for (var k in bars) {
			var found = false;
			for (var i in stks) {
				if (stks[i] == k) {
					found = true;
					break;
				}
			}
			if (!found) {
				bars[k].dispose();
				delete bars[k];
			}
		}
	}, interval);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
