const cells = document.querySelectorAll('.cell');
        const playerInfo = document.querySelector('.player-info p');
        const restartBtn = document.querySelector('.restart-btn');
        let currentPlayer = 'X';
        let board = ['', '', '', '', '', '', '', '', ''];
        let isGameActive = true;

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const symbols = {
            X: '❌',
            O: '❤️'
        };

        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        restartBtn.addEventListener('click', restartGame);

        function handleCellClick(event) {
            const cell = event.target;
            const index = cell.getAttribute('data-index');

            if (board[index] !== '' || !isGameActive) {
                return;
            }

            board[index] = currentPlayer;
            cell.innerHTML = symbols[currentPlayer];
            checkResult();
        }

        function checkResult() {
            let roundWon = false;
        
            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (board[a] === '' || board[b] === '' || board[c] === '') {
                    continue;
                }
                if (board[a] === board[b] && board[a] === board[c]) {
                    roundWon = true;
                    break;
                }
            }
        
            if (roundWon) {
                playerInfo.innerHTML = `Player <span style="font-size: 1.5em;">${symbols[currentPlayer]}</span> Wins!`;
                isGameActive = false;
                return;
            }
        
            if (!board.includes('')) {
                playerInfo.textContent = 'It\'s a Draw!';
                isGameActive = false;
                return;
            }
        
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerInfo.textContent = `Player ${symbols[currentPlayer]}'s Turn`;
        }
        

        function restartGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            isGameActive = true;
            currentPlayer = 'X';
            cells.forEach(cell => (cell.innerHTML = ''));
            playerInfo.textContent = `Player ${symbols[currentPlayer]}'s Turn`;
        }