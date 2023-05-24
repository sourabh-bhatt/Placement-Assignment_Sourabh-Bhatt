# Debouncing project

After the search, it will wait for a few seconds. Then it will show to the results area.

![](/Question7/debounce.png)

function makeCounter() {
let count = 0;

return function() {
count++;
return count;
};
}
