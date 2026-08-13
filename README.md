# ⚡ VS Code Essential Workflow & Shortcut Guide

A quick reference guide for editor navigation, OS emoji pickers, and essential productivity shortcuts.

---

## 🪟 Editor & Window Management

Split your editor to view or edit the same file side-by-side, or manage multiple files efficiently.

### Split Screen Workflow

1. Open any file in VS Code.
2. Press `Ctrl + \` (or `Cmd + \` on macOS).
3. VS Code splits your current file into two editor panes.

| SHORTCUT              | ACTION                      |
| :-------------------- | :-------------------------- |
| `Ctrl + \`            | Split active editor         |
| `Ctrl + 1`            | Focus first editor group    |
| `Ctrl + 2`            | Focus second editor group   |
| `Ctrl + 3`            | Focus third editor group    |
| `Ctrl + W`            | Close current active editor |
| `Ctrl + K` `Ctrl + W` | Close all open editors      |
| `Ctrl + B`            | Toggle side bar visibility  |

---

## 😀 Native OS Emoji Pickers

You **do not need an extension** to type emojis in VS Code. Emojis are standard Unicode characters provided directly by your operating system.

### Quick Reference Table

| OS             | Shortcut / Method                          |
| :------------- | :----------------------------------------- |
| **Windows** 🪟 | `Win + .` or `Win + ;`                     |
| **macOS** 🍎   | `Cmd + Ctrl + Space`                       |
| **Linux** 🐧   | `Ctrl + Shift + E` _(IBus)_ or `Ctrl + .`  |
| **Android** 📱 | Tap built-in emoji key on virtual keyboard |

> **Note:** Linux shortcuts can vary depending on your desktop environment (GNOME, KDE) and active input method engine.

### How to Insert Emojis

1. Place your cursor inside any file or string.
2. Trigger your OS shortcut listed above.
3. Search or select your desired emoji.

### Code Examples

```javascript
// Expressive status indicators in code
const todo = "Learn React ⚛️";
const completed = "Task completed ✅";
const error = "Something went wrong ❌";
const warning = "Check boundary conditions ⚠️";
```

# 🚀 VS Code Essential Workflow Boosters & Advanced Shortcuts

A quick-copy guide focused strictly on multi-cursor editing, line manipulation, navigation, terminal controls, and built-in features.

---

## 🎯 Multi-Cursor & Selection

Edit multiple lines or terms simultaneously to speed up refactoring.

| Windows / Linux          | macOS                      | Action                                    |
| :----------------------- | :------------------------- | :---------------------------------------- |
| `Alt + Click`            | `Option + Click`           | Insert cursor at position                 |
| `Ctrl + Alt + Up / Down` | `Cmd + Option + Up / Down` | Add cursor directly above / below         |
| `Ctrl + D`               | `Cmd + D`                  | Select next matching word                 |
| `Ctrl + Shift + L`       | `Cmd + Shift + L`          | Select **all** matching instances         |
| `Shift + Alt + I`        | `Shift + Option + I`       | Place cursor at end of each selected line |
| `Ctrl + U`               | `Cmd + U`                  | Undo last cursor operation                |

---

## ✏️ Line & Block Editing

Manipulate code structures instantly without cutting or pasting.

| Windows / Linux           | macOS                        | Action                            |
| :------------------------ | :--------------------------- | :-------------------------------- |
| `Alt + Up / Down`         | `Option + Up / Down`         | Move current line up or down      |
| `Shift + Alt + Up / Down` | `Shift + Option + Up / Down` | Duplicate current line up or down |
| `Ctrl + Shift + K`        | `Cmd + Shift + K`            | Delete current line               |
| `Ctrl + Enter`            | `Cmd + Enter`                | Insert new line below             |
| `Ctrl + Shift + Enter`    | `Cmd + Shift + Enter`        | Insert new line above             |
| `Ctrl + /`                | `Cmd + /`                    | Toggle line comment               |
| `Shift + Alt + A`         | `Shift + Option + A`         | Toggle block comment              |

---

## 🔍 Navigation & Search

Jump through files, methods, and workspaces cleanly.

| Windows / Linux      | macOS                  | Action                               |
| :------------------- | :--------------------- | :----------------------------------- |
| `Ctrl + P`           | `Cmd + P`              | Quick Open file by name              |
| `Ctrl + Shift + P`   | `Cmd + Shift + P`      | Open Command Palette                 |
| `Ctrl + Shift + F`   | `Cmd + Shift + F`      | Global search across project         |
| `Ctrl + G`           | `Cmd + G`              | Jump to line number                  |
| `Ctrl + Shift + O`   | `Cmd + Shift + O`      | Go to symbol/function in active file |
| `Alt + Left / Right` | `Ctrl + - / Shift + -` | Jump to previous / next location     |

---

## 🛠️ Integrated Terminal & Code Intelligence

| Windows / Linux   | macOS                | Action                          |
| :---------------- | :------------------- | :------------------------------ |
| `Ctrl + \`        | `Ctrl + \`           | Toggle integrated terminal      |
| `Ctrl + Shift + ` | `Cmd + Shift + `     | Open new terminal instance      |
| `Shift + Alt + F` | `Shift + Option + F` | Format document                 |
| `Ctrl + .`        | `Cmd + .`            | Trigger Quick Fix / Suggestions |
| `F12`             | `F12`                | Jump to definition              |
| `Alt + F12`       | `Option + F12`       | Peek definition inline          |
| `Shift + F12`     | `Shift + F12`        | Show all references             |

---

## 💡 Productivity Hacks & Features

- **Emmet Boilerplate:** Type `!` and press `Tab` in HTML/JSX files to generate a document scaffold instantly.
- **Tag Matching:** Enable `"editor.linkedEditing": true` in settings (`Ctrl + ,`) to sync edits on matching HTML/JSX tags.
- **Auto-Save:** Set `"files.autoSave": "afterDelay"` to write changes automatically.
- **Markdown Live Preview:** Press `Ctrl + Shift + V` (`Cmd + Shift + V` on macOS) to preview `.md` files side-by-side.
