import React, { useReducer, useEffect, useState, useRef } from 'react';

const BORDER = 4;
const CELL_SIZE = 20;
const BOARD_SIZE = 20;
const BOARD_CENTER = BOARD_SIZE / 2;

const ACTION_TYPES = {
  'GAME_UPDATE': 'GAME_UPDATE',
  'GAME_OVER': 'GAME_OVER',
  'SNAKE_CHANGE_DIRECTION': 'SNAKE_CHANGE_DIRECTION',
};

const gameUpdate = () => ({ type: ACTION_TYPES.GAME_UPDATE });
const gameOver = () => ({ type: ACTION_TYPES.GAME_OVER });
const snakeChangeDirection = (payload) => ({ type: ACTION_TYPES.SNAKE_CHANGE_DIRECTION, payload });

const cls = {
  snake: 'cell snake',
  food: 'cell food',
  cell: 'cell',
};

const css = {
  'boardSize': {
    width: `${BOARD_SIZE * CELL_SIZE + BORDER}px`,
    height: `${BOARD_SIZE * CELL_SIZE + BORDER}px`,
  },
  'cellSize': {
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
  }
};

const getRandomNumber = () => Math.floor(Math.random() * (BOARD_SIZE - 1));
const getRandomPosition = () => ({ x: getRandomNumber(), y: getRandomNumber() });
const getSnakeHead = ({ body }) => body[0];
const getSnakeTail = ({ body }) => body.slice(1);
const removeLastBodyPiece = ({ body }) => body.slice(0, body.length - 1);

const isPos = (x, y, diffX, diffY) => (x === diffX && y === diffY);

const getClasses = (x, y, snake, food) => (
  isSnake(x, y, snake.body)
  ? cls.snake
  : isPos(x, y, food.x, food.y) 
  ? cls.food
  : cls.cell
);

const isSnakeHitBorder = (snake) => {
  const [x, y] = getSnakeHead(snake);
  return x < 0 || y < 0 || x === BOARD_SIZE || y === BOARD_SIZE;
};

function generateBoard() {
  return new Array(BOARD_SIZE)
    .fill()
    .map(() => new Array(BOARD_SIZE).fill('cell'));
}

function isSnake(x, y, body) {
  return body.filter(([snakeX, snakeY]) => isPos(x, y, snakeX, snakeY)).length;
}

function update({ playground, snake }) {
  const { body, direction } = snake;
  const { board } = playground;
  const [dirX, dirY] = direction;
  const [x, y] = getSnakeHead(snake);

  const head = [x + dirX, y + dirY];
  let tail = removeLastBodyPiece(snake);
  let { food } = playground;

  if (isPos(x, y, food.x, food.y)) {
    food = getRandomPosition();
    tail = body;
  }

  return {
    playground: {
      food,
      board,
      isGameOver: false
    },
    snake: {
      ...snake,
      body: [head, ...tail],
    }
  };
}

const initialState = {
  playground: {
    board: generateBoard(),
    food: getRandomPosition(),
    isGameOver: false,
  },
  snake: {
    body: [[BOARD_CENTER, BOARD_CENTER]],
    direction: [1, 0],
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GAME_UPDATE:
      return update(state);

    case ACTION_TYPES.SNAKE_CHANGE_DIRECTION:
      return {
        ...state,
        snake: {
          ...state.snake,
          direction: action.payload,
        }
      };
    
    case ACTION_TYPES.GAME_OVER:
      return {
        playground: {
          ...state.playground,
          isGameOver: true,
        },
        snake: {
          ...initialState.snake
        }
      };
    
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [int, setInt] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [elem, setElem] = useState({});

  const { playground, snake } = state;
  const { board, food, isGameOver } = playground;

  useEffect(() => {
    let i; 

    if (int) {
      i = setInterval(() => dispatch(gameUpdate()), 100);
    } else {
      clearInterval(i)
    }

    if (isSnakeHitBorder(snake)) {
      dispatch(gameOver());
      clearInterval(i)
    }

    return () => clearInterval(i);
  }, [state, int, snake]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandle);
    return () => window.removeEventListener('keydown', keyDownHandle);
  }, []);

  const keyDownHandle = ({ code }) => {
    switch (code) {
      case 'ArrowUp':
      case 'KeyW':
        dispatch(snakeChangeDirection([0, -1]));
        break;

      case 'ArrowDown':
      case 'KeyS':
        dispatch(snakeChangeDirection([0, 1]));
        break;

      case 'ArrowLeft':
      case 'KeyA':
        dispatch(snakeChangeDirection([-1, 0]));
        break;

      case 'ArrowRight':
      case 'KeyD':
        dispatch(snakeChangeDirection([1, 0]));
        break;
    
      default:
        break;
    }
  };

  const onHover = (hover) => ({ clientX, clientY, target }) => {
    if (!hover) {
      setIsHovered(false);
      setElem({});
    } else {
      setIsHovered(true);
      setElem({ clientX, clientY, target });
    }
  };

  return (
    <div className="view">

      {isHovered && <Tooltip hoveredEl={elem}/>}

      <div 
        className="panel"
        style={{ width: css.boardSize.width }}
      >
        <p>score: {snake.body.length}</p>

        <button 
          onClick={() => setInt((state) => !state)}
        >{int ? 'pause' : 'start'}</button>
      </div>

      <div 
        className={isGameOver ? 'board danger' : 'board'}
        style={css.boardSize}
        onMouseOver={onHover(true)}
        onMouseLeave={onHover(false)}
      >
        {
          board.map((col, x) => (
            <div 
              className="col" 
              key={x}
            >
              {
                col.map((_, y) => (
                  <div 
                    key={y}
                    className={getClasses(x, y, snake, food)}
                    style={css.cellSize}
                  ></div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

function Tooltip({ hoveredEl }) {
  const { clientX = 0, clientY = 0, target } = hoveredEl;
  const [elemWidth, setElemWidth] = useState(null);
  const tooltipRef = useRef();

  useEffect(() => {
    setElemWidth(tooltipRef.current.offsetWidth);
  }, []);

  return (
    <div 
      ref={tooltipRef}
      className="tooltip"
      style={{ left: clientX - elemWidth / 2, top: clientY + 10 }}
    >
      {
        target.className.includes('snake')
        || target.className.includes('food')
        ? target.className.slice(4, target.className.length).trim()
        : target.className
      }
    </div>
  )
}

export default App;
