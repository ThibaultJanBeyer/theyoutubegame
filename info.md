# Remove duplicates
```
sort _words2.txt | uniq > output.txt
```

# Add ' at beginning of word and ' at end and , at end:
```
sed "s/^/'/g" output.txt | sed "s/$/',/g" >> words.js
```
