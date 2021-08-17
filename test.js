const get2ndSmallest = (arr) => {
  const length = arr.length;
  if ( length < 2 ) {
    throw Error('Invaild Input.')
  }
  let first = Infinity, second = Infinity;
  for( let i = 0; i < length; i++ ) {
    if (arr[i] < first) {
      second = first;
      first = arr[i];
    }
    else if (second > arr[i] && second !== first) {
      second = arr[i];
    }
  }
  if( second === Infinity ) {
    throw Error('There is no second smallest element');
  } else {
    return second
  }
}

console.log(get2ndSmallest([12, 13, 1, 10, 34, 9]))