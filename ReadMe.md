# Tic-Tac-Toe Game in JavaScript with AI
**Features**
*   Unbeatable AI (One Player)
*   Beatable AI (One Player)
*   Two Players

Hi, I'm Kenny, a Web App developer to-be. In this README file I'll share briefly how I went about building this game. ***Just the unbeatable AI part though.***

***PLEASE READ:** Actually, I'm excited to be sharing this, it's one of my greatest achievements as a developer to implement the **AI** of this game from memory without consulting how other devs went about it. And why I'm more excited is that, I implemented both AIs without trying it out at some junction of the implementation until I was fully done implementing it. And I got no bug!!! Isn't that crazy??? Thanks. My belief is that whatever program you already code in your brain and it works, you should be confident that it's gonna work on the computer too. I'll share my Algorithm here.*

***Disclaimer:** I got the inspiration of the Game's UI from a Tic-Tac-Toe Game on my Android Phone, it's just inspiration, I didn't fully replicate the design. I find it hard designing a UI in situations where I'm focused on implementing the JavaScript functionality. Thanks for understanding.*

## Unbeatable AI Algorithm:
### **Steps:**
*   **If the cells are empty,** which means the AI is the first Player, the AI will play randomly in any cell.
*   **If one cell is played,** which means the human player is the first player, the AI will play randomly in the other cells that are empty.
* **Provided the above cases have been met:**
    * The AI will look first for a winCombo e.g `[0, 1, 2]` in which it has played in it's cell twice e.g `['AI', 'AI', '']`, *if found*, the AI will play in the remaining last cell which will cause a win for the AI.
    * *If not found*: Then the AI will look for a winCombo e.g `[0, 4, 8]` in which the human player has played in it's cell twice e.g `['HU', '', 'HU']`, *if found*, the AI will block it by playing in the remaining last cell.
    * *If not found*: Then the AI will look for a winCombo e.g `[0, 3, 6]` in which it has played in it's cell once e.g `['AI', '', '']`, *if found*, the AI will play in any of the empty ones.
* **If none of the above cases are true:** The gameboard will now have only one cell empty, which means we will have a tie game. Then AI will play in the last cell. And we have a **Tie game!**

Thanks for checking me out, you're free to use this algorithm in any tutorial or any project. And if you like, I'm not imposing it, you can make reference to me. It'll be my pleasure.

Game is live for testing: [Click here](https://tic-tac-toe-game-in-javascript.hostman.site/)    
Follow me on Twitter: [Twitter](https://twitter.com/Oluwarinolasam2)