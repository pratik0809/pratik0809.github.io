---
layout: post
title: "Replace outdated built-in vim with MacVim"
subtitle:
date: 2018-01-24
author: Pratik Sampat
category: Web Development
finished: true
---

![VIM](https://cdn.makeuseof.com/wp-content/uploads/2011/05/vim-editor_logo-300x300.png)

Replace outdated built-in vim with MacVim:

**Option 1**:
  ```bash
  $ brew install macvim --override-system-vim
  ```

If you need the app bundle linked in `/Applications`...
  ```bash
  $ brew linkapps
  ```

**Option 2**:
  1. Download latest mvim release: [http://macvim-dev.github.io/macvim/](http://macvim-dev.github.io/macvim/)
  2. Add to Applications folder
  3. Add alias in ~/.zshrc: `$ alias vim="/Applications/MacVim.app/Contents/MacOS/Vim"`
