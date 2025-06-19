import curses
import random

# Initialize the screen

def main(stdscr):
    curses.curs_set(0)  # hide cursor
    stdscr.nodelay(1)
    stdscr.timeout(100)

    sh, sw = stdscr.getmaxyx()
    box = [[3, 3], [sh-3, sw-3]]  # playable box

    for y in range(box[0][0], box[1][0]):
        stdscr.addstr(y, box[0][1], '|')
        stdscr.addstr(y, box[1][1]-1, '|')
    for x in range(box[0][1], box[1][1]):
        stdscr.addstr(box[0][0], x, '-')
        stdscr.addstr(box[1][0]-1, x, '-')

    snake = [[sh//2, sw//2 + i] for i in range(3)]  # initial snake
    direction = curses.KEY_LEFT

    food = [
        random.randint(box[0][0]+1, box[1][0]-2),
        random.randint(box[0][1]+1, box[1][1]-2)
    ]
    stdscr.addch(food[0], food[1], '*')

    while True:
        next_key = stdscr.getch()
        if next_key in [curses.KEY_UP, curses.KEY_DOWN, curses.KEY_LEFT, curses.KEY_RIGHT]:
            direction = next_key

        head = snake[0].copy()
        if direction == curses.KEY_UP:
            head[0] -= 1
        elif direction == curses.KEY_DOWN:
            head[0] += 1
        elif direction == curses.KEY_LEFT:
            head[1] -= 1
        elif direction == curses.KEY_RIGHT:
            head[1] += 1

        # Collision with wall
        if (head[0] in [box[0][0], box[1][0]-1] or
                head[1] in [box[0][1], box[1][1]-1] or
                head in snake):
            msg = 'Game Over!'
            stdscr.addstr(sh//2, sw//2 - len(msg)//2, msg)
            stdscr.nodelay(0)
            stdscr.getch()
            break

        snake.insert(0, head)
        if head == food:
            food = None
            while food is None:
                nf = [
                    random.randint(box[0][0]+1, box[1][0]-2),
                    random.randint(box[0][1]+1, box[1][1]-2)
                ]
                if nf not in snake:
                    food = nf
            stdscr.addch(food[0], food[1], '*')
        else:
            tail = snake.pop()
            stdscr.addch(tail[0], tail[1], ' ')

        stdscr.addch(head[0], head[1], '#')


if __name__ == '__main__':
    curses.wrapper(main)
