import $ from 'jquery'
function sum(...args) {
  return args.reduce((x, y) => x + y, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4,5));
// eslint-disable-next-line
console.log($);
