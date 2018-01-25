---
layout: post
title: "The ||= Ruby Misconception"
date: 2018-01-25
author: Pratik Sampat
category: Web Development
finished: true
---

![VIM](https://www.bigbinary.com/assets/services/ror/rubygem-73b83c79780e7e71d4a159177f2cbdb95b07466141beab0380842122d27f4f93.svg)

`a ||= b` is often perceived as `a = a || b` but it's more like `a || a = b`

In the misconception, a is always set after ruby decides a or b is logically true.

But `||=` reads more if the left hand side of the `||` comparison is true, there's no need to check the right hand side.

**Don't confuse `+=` or `-=` or [op]= with anything related to `||=` or `&&=`. They're entirely different ideas and are implemented entirely differently.**

Some examples you can run in `irb`:

```ruby

a = nil
b = 20
a ||= b # a || a = b
=> 20 #since a is nil, it uses b

# More complicated example:

h = {}

def h.[]=(k, v)
  puts "Setting hash key #{k} with #{v.inspect}"
  super
end

# 1. The standard ||= approach
h[:x] ||= 10 #h[:x] is initially nil so now it is set as 10
h[:x] ||= 20 #h[:x] is now 10 so it still renders 10

# 2. The a = a || b approach
h[:y] = h[:y] || 10 #h[:y] is now set to 10
h[:y] = h[:y] || 20 #h[:y] decides between 10 || 20, both are true so it uses the left value and reassigns h[:y] with the same value

# 3. The a || a = b approach
h[:z] || h[:z] = 10 #same as ||=
h[:z] || h[:z] = 20 #same as ||=

# Output
# => Setting hash key x with 10
# => Setting hash key y with 10
# => Setting hash key y with 10
# => Setting hash key z with 10
```
