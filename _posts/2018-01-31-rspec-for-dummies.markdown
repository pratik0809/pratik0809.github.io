---
layout: post
title: "RSpec for Dummies"
date: 2018-01-31
author: Pratik Sampat
category: Web Development
finished: true
---

<img src="http://rspec.info/images/logo_ogp.png" width="200" alt="RSpec Logo">

Not knowing where to start with RSpec testing is extremely hard.  It felt foreign,
I didn't like it. I understood the importance, but it just felt like a huge
mental block to take the time to understand the convention.  Where do I use a
`describe`? Why am I using `context`? I learn by doing so here's an iterative
process of creating a simple `Car` class to better understand RSpec.

Let's start with installing RSpec gem without which you could never run your tests
that you spent your blood, sweat and tears on.

```terminal
$ gem install rspec
```

By convention, spec (specification) files are put into a `spec` folder in your root
directory. Let's do that:

```terminal
$ mkdir spec
```
And create our first spec file.  Typically, spec files are named as a `<what-i-am-testing>_spec.rb` file...

```terminal
$ touch spec/car_spec.rb
```
And add our first `describe` block
```ruby
# spec/calculator_spec.rb

describe Car do
end
```

That's it. That's all we needed for our first test. All the things everyone says
about TDD (Test Driven Development), here it is! First test! Ok, how do we run it tho?
Just run:

```terminal
$ rspec spec/car_spec
```

Ah ha! But it's not gonna work buddy. There's no `Car` class yet.

```terminal
> An error occurred while loading ./car_spec.rb.
> Failure/Error:
>  describe Car do
>  end
>
> NameError:
>  uninitialized constant Car
# ./car_spec.rb:1:in `<top (required)>'
> No examples found.
```

So we create car.rb in the lib directory since RSpec automatically reads .rb files
in the lib/ directory:

```ruby
# lib/car.rb

class Car
end
```

This allows us to `require` without specifying the relative path from the specs
directory. Let's tell our spec test to look for our newly created `Car` class:

```ruby
# spec/car_spec.rb

require "car"

describe Car do # Car class
end
```

And now we run our test:

```terminal
$ rspec spec/car_spec
```

And we should see:
```terminal
> No examples found.


> Finished in 0.00029 seconds (files took 0.0921 seconds to load)
> 0 examples, 0 failures
```

![Ooo](https://media1.tenor.com/images/119ce11c12297bc21b7538f03cb0f437/tenor.gif?itemid=4801322)

No failures. But it says no examples found? RSpec is referred to as BDD testing.
Check out this [post](https://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/)
to learn more about the difference between BDD and TDD. Essentially, in the world
of BDD, every test is an 'example (hint: `it` blocks are examples).

## The Describe Block
Let's imagine we have accelerate and decelerate methods onto our `Car` class so we can
make these cars go faster and slower. To begin testing process, we use a `describe`
block to describe the behavior of a group of examples we are concerned with.
In our case, the behaviors we are interested in are the instance methods of our `Car` class.
Typically, the convention is to use a '.' when referring to a class method's name
and a '#' when referring to an instance method's name.

```ruby
# spec/car_spec.rb

require "car"

describe Car do           
  describe "#accelerate" do
    # accelerate will be an instance method on Car
  end

  describe "#decelerate" do
    # decelerate will be an instance method on Car
  end
end
```

## The Context Block
Our car_spec still doesn't have any examples.  Our next step is to use `context`
blocks to articulate 'when' scenarios for our accelerate and decelerate methods.
Let's think about what limitations we want for our cars.  Our cars can't be
going over 80mph, we need to be safe; it's a rough world out there. Our cars
can't be going at a negative speed either. We need to add `context` blocks for
those scenarios:

```ruby
# spec/car_spec.rb

require "car"

describe Car do            
  describe "#accelerate" do
    context "when current speed is less than 80mph" do
      # A Car is accelerated and when the speed is < than 80mph...
    end

    context "when current speed is equal to or more than 80mph" do
      # A Car is accelerated and when the speed is >= than 80mph...
    end
  end

  describe "#decelerate" do
    context "when current speed is greater than 0mph" do
      # A Car is decelerated and when the speed is > than 0mph...
    end

    context "when current speed is equal to or less than 0mph" do  
      # A Car is decelerated and when the speed is <= than 0mph...
    end
  end
end
```

## The It block
Still no examples to run! Let's outline what we want to test for these context
blocks. We should set the speed of the car outside the limits and
test the class behaves as expected.

```ruby
# spec/car_spec.rb

require "car"

describe Car do
  describe "#accelerate" do
    context "when current speed is less than 80mph" do
      it "does not remain the same current speed" do
      end
      it "increases by 5mph" do
      end
    end

    context "when current speed is equal to or more than 80mph" do
      it "stays at 80mph" do
      end
    end
  end


  describe "#decelerate" do
    context "when current speed is greater than 0mph" do
      it "does not remain the same current speed" do
      end
      it "decreases by 5mph" do
      end
    end

    context "when current speed is equal to or less than 0mph" do
      it "stays at 0mph" do
      end
    end
  end
end
```

And we need to make some changes to the `Car` class:

```ruby
# lib/car.rb

class Car
  attr_reader :speed

  def initialize(name, speed)
    @name = name
    @speed = speed
  end

  def accelerate
  end
end
```

What's our output now when we run our RSpec test?

```terminal
$ rspec spec/car_spec.rb

> ......
>
> Finished in 0.00395 seconds (files took 0.10337 seconds to load)
> 6 examples, 0 failures
```
The dots indicate a successful test. But that's not right, our `Car` class
doesn't even know how to accelerate or decelerate. It's an empty method!

**This is where expectations come in.**

## The Expect Matcher

Each `It` block is an example, within the block you can add RSpec built-in matchers
to test the behavior you've described so far. These matchers pass/fail based on
the conditions you specify. Below you'll see I've made myself a porsche, an instance of
`Car`, and set its speed (instance variable) to 75mph.  I then call accelerate and expect it
not to remain the same.

```ruby
# spec/car_spec.rb

require "car"

describe Car do
  describe "#accelerate" do
    context "when current speed is less than 80mph" do

      current_speed = 75
      porsche = Car.new('porsche', 75)
      porsche.accelerate

      it "does not remain the same current speed" do
        expect(porsche.speed).not_to eql(current_speed)
      end

      it "increases by 5mph" do
        expect(porsche.speed).to eql(80)
      end

    end

    context "when current speed is equal to or more than 80mph" do
      it "stays at 80mph" do
      end
    end
  end


  describe "#decelerate" do
    context "when current speed is greater than 0mph" do
      it "does not remain the same current speed" do
      end
      it "decreases by 5mph" do
      end
    end

    context "when current speed is equal to or less than 0mph" do
      it "stays at 0mph" do
      end
    end
  end
end
```

Great, now let's see what happens when we run our spec test:

```terminal
$ rspec spec/car_spec.rb

> FF....
>
> Failures:
>
>   1) Car#accelerate when current speed is less than 80mph does not remain the same current speed
>      Failure/Error: expect(porsche.speed).not_to eql(current_speed)
>      
>        expected: value != 75
>             got: 75
>      
>        (compared using eql?)
>      # ./spec/car_spec.rb:14:in `block (4 levels) in <top (required)>'
>
>   2) Car#accelerate when current speed is less than 80mph increases by 5mph
>      Failure/Error: expect(porsche.speed).to eql(80)
>      
>        expected: 80
>             got: 75
>      
>        (compared using eql?)
>      # ./spec/car_spec.rb:18:in `block (4 levels) in <top (required)>'
>
> Finished in 0.02755 seconds (files took 0.10212 seconds to load)
> 6 examples, 2 failures
>
> Failed examples:
>
> rspec ./spec/car_spec.rb:13 # Car#accelerate when current speed is less than 80mph does not remain the same current speed
> rspec ./spec/car_spec.rb:17 # Car#accelerate when current speed is less than 80mph increases by 5mph
```

![I don't know what we're yelling about](https://media.giphy.com/media/Vd63bJpbT9M76/giphy.gif)

## Making our tests pass
That's a lot of yelling from RSpec.  What's going on? So we know 2 examples failed.
RSpec very clearly lets us know we were expecting it not to equal 75 but porsche returned 75.
It should have also updated speed to 80 but it remained at 75. **The logic for
accelerate and decelerate hasn't been added to `Car`.**  

Time to update the `Car` class:

```ruby
# lib/car.rb

class Car
  attr_reader :speed

  def initialize(name, speed)
    @name = name
    @speed = speed
  end

  def accelerate
    @speed = @speed + 5
  end
end
```

That's easy. Re-run our test:

```terminal
......

Finished in 0.00721 seconds (files took 0.13622 seconds to load)
6 examples, 0 failures
```

No failures! This is the idea behind TDD/BDD, fail your own tests and then fix them.
In part 2 of this post, I'll continue to build on this example and finish the rest of
the tests.
