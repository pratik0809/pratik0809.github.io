---
layout: post
title: "Jekyll Code Syntax Highlighting"
date: 2018-01-29
author: Pratik Sampat
category: Web Development
finished: true
---

![Pygments CSS Theme Builder](https://i.imgur.com/5l4rjvV.png)

In an attempt to figure out how to style code syntax in markdown blocks, for my [résumé]({{ site.baseurl }}/resume/), I found out Jekyll automatically comes bundled with a pure ruby gem called [Rouge](https://github.com/jneen/rouge) which was adapted from the original Python syntax highlighter [Pygments](http://pygments.org/).

Let's jump right into it.

1. First off go to the [Pygments CSS Theme Builder](http://jwarby.github.io/jekyll-pygments-themes/builder.html).  This website allows you to customize your syntax down to multi-line comments, single-line comments, keywords, variables, operators, and virtually any part of your code.
2. Click 'Save' at the top to download the CSS version of your customized syntax highlighter.
3. Ensure you have the Rouge gem installed:
    ```ruby
    gem install rouge
    ```
4. In `config.yml` add `highlighter: rouge`
5. Add your customized CSS file to your `css` folder.
6. This was the tricky part, I couldn't figure out how to use my customized CSS in markdown.  However, it's quite easy using HTML. First add the stylesheet to your HTML head.  
    ```html
    <head>
    ...
    <link href="/css/syntax.css" rel="stylesheet">
    ...
    </head>
    ```
7. Next add the liquid template to highlight your code:
    ```html
    { % highlight js % } // you need to set proper language args here
    console.log('I am now highlighted based on your CSS'); // your code here
    { % endhighlight % }
    ```
8. And you'll get:
```js
console.log('I am now highlighted based on your CSS'); // your code here
```


## Resources

* [Syntax Highlighting in Jekyll With Rouge](https://sacha.me/articles/jekyll-rouge/)
* [Jekyll-Syntax Highlighting for Jekyll](http://haokanga.github.io/jekyll/2016/07/08/syntax-highlighting-for-jekyll.html)
