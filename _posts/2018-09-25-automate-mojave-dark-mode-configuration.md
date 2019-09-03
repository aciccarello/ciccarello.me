---
layout: "post"
categories: "blog"
title: "Automate Mojave Dark mode configuration"
date: 2018-09-25
tags: technology
image: /assets/img/imac-dark-mode-thumbnail.jpg
image_alt: Mac computer with dark desktop theme
---

If you like to [automate your macOS configuration](https://kalis.me/dotfiles-
automating-macos-system-configuration/) via bash scripts and have recently
setup Mojave, you may be wondering how to enable dark mode, the configuration
is called "AppleInterfaceStyle" and can be set using the following command.

    defaults write "Apple Global Domain" "AppleInterfaceStyle" "Dark"

If you would like to revert back to the default (light) theme, delete the key.

    defaults delete "Apple Global Domain" "AppleInterfaceStyle"

Both enabling and disabling will require a restart of your computer to take
affect. If you would like to try out the theme immediately, open the General
tab of the mac preferences.

    open /System/Library/PreferencePanes/Appearance.prefPane
