
# Online Code Compiler

This is an online code compiler built using Next js, TypeScript, Monaco Editor, and various backend services to execute code. The compiler supports multiple programming languages and allows users to write, execute, and view the output of their code directly in the browser.

## Features

- **Multi-language support:** Supports a variety of programming languages, including JavaScript, TypeScript, Rust, C++, Java, PHP, C#, Python.
- **Editor:** Monaco Editor is used for code editing with syntax highlighting and theming support (dark and light mode).
- **Execution:** The code is executed in the cloud via the [Piston API](https://emkc.org/api/v2/piston/execute).
- **Output:** Display the output of the executed code with a separate output section in the UI.
- **Copy Code:** Option to copy the written code to the clipboard.
- **Responsive Layout:** Designed to work on various screen sizes, including mobile and desktop.

## Prerequisites

Before you begin, ensure that you have the following:

- Node.js installed (version 14.x or higher).
- A modern browser (Chrome, Firefox, etc.).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Pavan0228/Code-Editor.git
    cd Code-Editor
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

    Your project will be available at `http://localhost:3000` in the browser.

## How to Use

1. **Select a Language:** Choose a programming language from the sidebar.
2. **Write Code:** Type your code in the Monaco Editor.
3. **Run the Code:** Press the "Run" button to execute the code. The output will appear below the editor.
4. **Switch Theme:** Toggle between light and dark themes using the theme switch button at the top.
5. **Copy Code:** Press the "Copy" button to copy the code to your clipboard.

## Supported Languages

- JavaScript
- TypeScript
- Rust
- C++
- Java
- PHP
- C#
- Python

## Code Execution

The code is executed on the [Piston API](https://emkc.org/api/v2/piston/execute) backend. The API is designed to support multiple languages and versions and return the output or errors from the execution.

## Code Editor

The Monaco Editor is used for a seamless code editing experience. It offers syntax highlighting, autocompletion, and code formatting for supported languages. You can switch between light and dark modes, as well as adjust font sizes.

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Monaco Editor:** Used for the code editing component.
- **Lucide React:** For the icons used in the UI.
- **Piston API:** For executing the code in various languages.

---

Feel free to adjust the repository URL and any other details specific to your project.