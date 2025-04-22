function spiral(size) {
  //   generate matrix start
  let rows = size;
  let cols = size;
  let matrix = [];
  let counter = 0;

  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = counter;
      counter++;
    }
  }
  console.log(matrix);
  console.log("==========================");
  //   generate matrix end

  //   get value row and col start

  let x = 0;
  let y = 0;

  let batasAtas = size;
  let batasBawah = 0;

  let result = [];
  while (result.length < size * size) {
    //   left to right
    for (; x < batasAtas; x++) {
      result.push(matrix[y][x]);
    }

    x--;
    y++;

    //   up to down
    for (; y < batasAtas; y++) {
      result.push(matrix[y][x]);
    }

    y--;
    x--;

    //   right to left
    for (; x >= batasBawah; x--) {
      result.push(matrix[y][x]);
    }

    x++;
    y--;

    //   down to up
    for (; y > batasBawah; y--) {
      result.push(matrix[y][x]);
    }
    x++;
    y++;
    batasAtas--;
    batasBawah++;
  }
  console.log(result);
  //   get value row and col end
}

spiral(5);
spiral(6);
spiral(7);
