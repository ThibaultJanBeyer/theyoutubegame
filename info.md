# Remove duplicates
```
sort input.txt | uniq > output.txt
```

# Add ' at beginning of word and ' at end and , at end:
```
sed "s/^/'/g" _words2.txt | sed "s/$/'/g" | sed "s/$/,/g" >> words.js
```
