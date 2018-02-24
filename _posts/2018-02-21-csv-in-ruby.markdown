---
layout: post
title: "CSV manipulation in Ruby"
date: 2018-02-24
author: Pratik Sampat
category: Web Development
finished: true
---

<img src="https://www.zamzar.com/images/filetypes/csv.png" width="200" alt="CSV">

# How ruby reads a CSV file:


<img src="http://i.imgur.com/1Tvf1Ma.jpg" width="200" alt="How Ruby parses a csv file">

1. `require 'csv'` to use built-in csv library
2. `numbers = CSV.read('/path/to/csv/file')` saves entire file to variable
3. `CSV.foreach` will read the CSV line-by-line to preserve memory:
```ruby
CSV.foreach('customers.csv') do |row|
  puts row.inspect
end
# ["Dan", "34", "2548", "Lovin it!"]
# ["Maria", "55", "5054", "Good, delicious food"]
# ["Carlos", "22", "4352", "I am \"pleased\", but could be better"]
# ["Stephany", "34", "6542", "I want bigger steaks!!!!!"]
```

4. `Array#flatten` will remove extra arrays

# Find Duplicates
For this example. I have two CSV files: **numbers_in_excel.csv** and **numbers_in_db.csv**.
I'd like to know if numbers_in_excel contain any duplicates.
After importing your CSV files, run `numbers_in_excel.length` and `numbers_in_excel.uniq.length`
to quickly check for number of duplicates

## Common mistake: Why you cannot use Array#- to find dupes
Remember: `Array#-` returns a new array that is a copy of the array1,
removing any items that also appear in array2. *In other words, returns only unique items from array1*.
So if array2 has every element found in original array, nothing is returned.
Here's an example:
```ruby
> [1, 2, 3, 4, 5] - [ 1, 1, 2, 2, 3, 3, 4, 5 ]
 => []
> [ 1, 1, 2, 2, 3, 3, 4, 5 ] - [ 1, 2, 3, 4, 5 ]
 => []
 ```
## Find duplicates using:

### Method 1: Array#select - O(n^2)
```ruby
def duplicate_values(array)
  array.select{|v| array.count(v) > 1}.uniq
end
```

However keep in mind,
`Array#count` iterates over all the elements in the array, just as `Array#select` does,
so for an array of 500K elements, this could be cripplingly slow, as it'd do 250 billion operations.
(n^2).

### Method 2: Array#group_by - O(n)

 `Array#group_by` returns a hash where the keys are defined by our grouping rule,
 and the values are the corresponding objects from our original collection.

 In other words, it returns a hash where first, the keys are built by running the
 block through every item in array uniquely. Then populating each key's values with every
 item in the array that matches that key. So:
 ```ruby
 # Create a list of names
names = ["Ripley", "McClane", "Ryerson", "Murphy"]
# group by first letter
names_by_letter = names.group_by { |name| name[0] }
# will first generate this:

#{
#    "R" => [],
#    "M" => []
#}

# and then populate each key's values by items in the array that equal the key:

#{
#    "R" => [
#        [0] "Ripley",
#        [1] "Ryerson"
#    ],
#    "M" => [
#        [0] "McClane",
#        [1] "Murphy"
#    ]
#}
```

So, we can easily find duplicates using this. Remember Array#select will return
elements that return true for a block provided:

```ruby
[1, 2, 2, 3].group_by{ |e| e }
# {1=>[1], 2=>[2, 2], 3=>[3]}
[1, 2, 2, 3].group_by{ |e| e }.select { |k, v| v.size > 1 }
# {2=>[2, 2]}
[1, 2, 2, 3].group_by{ |e| e }.select { |k, v| v.size > 1 }.map(&:first)
# [2]
```

>  Source: [Stackoverflow](https://stackoverflow.com/questions/30336581/ruby-find-duplicates-in-an-array)
{:.source}

# Find Existing By Comparing

I wanted to find out how many numbers in CSV file 1 (numbers_in_excel)
were present in CSV file 2 (numbers_in_db) as I want to make sure they exist.
Sure enough, `Array#-` can help me with this.

My original approach:
```ruby
numbers_in_excel.length
# => 982
numbers_in_db.length
# => 5678
(numbers_in_excel - numbers_in_db).length
#  => 981
# This is wrong, it should be 40. There were 30 numbers in the excel provided that weren't in the db.
```
Digging deeper to find out why the array difference wasn't working as expected:
```ruby
numbers_in_excel[0]
#  => ["5157763506", "DID_PSTN_PROSODY_ANALYTICS_REC"]
numbers_in_db[0]
# => ["5157763506", "DID_PSTN_PROSODY_ANALYTICS"]
```
Notice the second property is not the same, hence all values are considered unique and return 981
instead of the 30 expected. Let's slice it up.

```ruby
def take_out_props (arr)
  arr.map { |num| num.slice(0) }
end
take_out_props(numbers_in_excel)
#  => [["5157763506"]...]
take_out_props(numbers_in_db)
# => [["5157763506"]...]
# now our arrays can be compared with equal values
(take_out_props(numbers_in_excel.uniq) - take_out_props(numbers_in_db)).length
#  => 30
```
