Add ' at beginning of word and ' at end and , at end:
```
sed "s/^/'/g" _words.txt | sed "s/$/'/g" | sed "s/$/,/g" >> words.js
```
