const aiTurn = (currentPlayer, checkDraw, checkWin, declareDraw, declareWinner, switchPlayer, updateScore) => {
    const aiPlayed = currentPlayer.play();
    if (aiPlayed) {
        const win = checkWin(currentPlayer);
        if (win) {
            declareWinner(currentPlayer, win);
            updateScore(currentPlayer);
            return;
        }
        const draw = checkDraw();
        if (draw) {
            declareDraw();
            return;
        }
        switchPlayer();
    }
};

export default aiTurn;
