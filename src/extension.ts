import * as vscode from 'vscode';

let timer: any | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Focus Tchad VSCode est actif !');

    // 1. Surveillance des modifications du texte
    const onEdit = vscode.workspace.onDidChangeTextDocument(() => {
        if (!timer) {
            startMotivationTimer();
        }
    });

    // 2. Surveillance de la sauvegarde (Ctrl+S)
    const onSave = vscode.workspace.onDidSaveTextDocument(() => {
        stopMotivationTimer();
    });

    context.subscriptions.push(onEdit, onSave);
}

function startMotivationTimer() {
    if (timer) return;

    // Récupération dynamique du délai (défaut 5 min)
    const config = vscode.workspace.getConfiguration('focusTchad');
    const minutes = config.get<number>('delaiRappel') || 1;
    const delaiMs = minutes * 60 * 1000;

    timer = setTimeout(() => {
        const citations = [
            "🚀 Focus Tchad : N'oublie pas d'enregistrer ton progrès !",
            "💪 Chaque ligne de code nous rapproche du but. Sauvegarde !",
            "🔥 La persévérance paie. Enregistre ton travail.",
            "💻 Le code, c'est la vie, mais n'oublie pas le Ctrl+S !"
        ];
        
        const message = citations[Math.floor(Math.random() * citations.length)];
        vscode.window.showWarningMessage(message);
        
        timer = undefined; 
    }, delaiMs); 
}

function stopMotivationTimer() {
    if (timer) {
        clearTimeout(timer);
        timer = undefined;
        vscode.window.setStatusBarMessage("💾 Progrès sécurisé !", 4000);
    }
}

// Nettoyage automatique à la fermeture de VS Code
export function deactivate() {
    if (timer) {
        clearTimeout(timer);
    }
}