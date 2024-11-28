"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Play, Terminal, Sun, Moon } from 'lucide-react';
import Editor from '@monaco-editor/react';
import axios from "axios";

// Define types for language data
interface LanguageData {
  language: string;
  version: string;
  icon: () => JSX.Element;
}

// Define type for the `languageMap` object
interface LanguageMap {
  [key: string]: LanguageData;
}

const languageMap: LanguageMap = {
  javascript: {
    language: "javascript",
    version: "18.15.0",
    icon: () => (
      <img
        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
        alt="JavaScript"
        className="rounded-full	object-cover object-bottom w-6 h-6"
      />
    ),
  },
  typescript: {
    language: "typescript",
    version: "5.0.3",
    icon: () => (
      <img
        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
        alt="TypeScript"
        className="rounded-full object-cover object-bottom w-6 h-6"
      />
    ),
  },
  rust: {
    language: "rust",
    version: "1.68.2",
    icon: () => (
      <img
        src="https://w7.pngwing.com/pngs/114/914/png-transparent-rust-programming-language-logo-machine-learning-haskell-crab-animals-cartoon-crab.png"
        alt="Rust"
        className="rounded-full object-cover object-bottom w-6 h-6"
      />
    ),
  },
  c: {
    language: "c",
    version: "10.2.0",
    icon: () => (
      <img
        src="https://w7.pngwing.com/pngs/724/306/png-transparent-c-logo-c-programming-language-icon-letter-c-blue-logo-computer-program-thumbnail.png"
        alt="C"
        className="rounded-full object-cover object-bottom w-6 h-6"
      />
    ),
  },
  java: {
    language: "java",
    version: "15.0.2",
    icon: () => (
      <img
        src="https://banner2.cleanpng.com/20180805/iot/8db265e00790702392f413b6d2f71637.webp"
        alt="Go"
        className="rounded-full object-cover object-bottom w-6 h-6"
      />
    ),
  },
  php: {
    language: "php",
    version: "8.2.3",
    icon: () => (
      <img
        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg"
        alt="PHP"
        className="rounded-full object-cover object-bottom w-6 h-6"
      />
    ),
  },
  csharp: {
    language: "csharp",
    version: "6.12.0",
    icon: () => (
      <img
        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg"
        alt="Csharp"
        className="rounded-full object-cover object-bottom w-6 h-6"
      />
    ),
  },
  python: {
    language: "python",
    version: "3.10.0",
    icon: () => (
      <img
        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
        alt="Python"
        className="rounded-full object-cover object-bottom w-6 h-6"
      />
    ),
  },
};

const defaultCodes: { [key: string]: string } = {
  javascript:` 
// JavaScript Hello World
// Edit the code below and click 'Run' to execute

console.log("Hello, JavaScript!");`,
  
  typescript:` 
// TypeScript Hello World
// Modify the code and press 'Run' to see the output

console.log("Hello, TypeScript!");`,
  
  rust:` 
// Rust Hello World Program
// Change the code and click 'Run' to execute

fn main() {
  println!("Hello, Rust!");
}`,
  
  c: `
// C Hello World Program
// Edit the code and press 'Run' to see the result

#include <stdio.h>

int main() {

    printf("Hello World");

    return 0;
}`,
  
  java:` 
// Java Hello World Class
// Modify the code and click 'Run' to execute

public class HelloWorld {
  public static void main(String[] args) {
      System.out.println("Hello, Java!");
  }
}`,
  
  php: `
<?php
// PHP Hello World Script
// Edit the code and press 'Run' to see the output

echo "Hello, PHP!";
?>`,
  
  csharp:` 
// C# Hello World Program
// Change the code and click 'Run' to execute

using System;

class HelloWorld {
  static void Main(string[] args) {
      Console.WriteLine("Hello, C#!");
  }
}`,
  
  python:` 
# Python Hello World
# Edit the code and press 'Run' to see the output

print("Hello, Python!")`,

};

const CodeEditor: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>("python");
  const [code, setCode] = useState<string>(defaultCodes[selectedLang]);
  const [output, setOutput] = useState<string>("> Output will appear here");
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleTheme = (): void => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("codeEditorTheme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("codeEditorTheme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const handleLanguageChange = (lang: string): void => {
    setSelectedLang(lang);
    setCode(defaultCodes[lang]);
    setOutput("> Output will appear here");
  };

  const executeCode = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = {
        language: languageMap[selectedLang].language,
        version: languageMap[selectedLang].version,
        files: [{ name: "main", content: code || defaultCodes[selectedLang] }],
        stdin: "",
      };

      const response = await axios.post("https://emkc.org/api/v2/piston/execute", data);

      if (response.data.run.output) {
        setOutput("> " + response.data.run.output.replace(/\n/g, "\n> "));
      } else if (response.data.run.stderr) {
        setOutput("Error: " + response.data.run.stderr);
      } else {
        setOutput("> Program executed successfully with no output");
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
      console.log("Error", error);
    }
    setIsLoading(false);
  };

  const copyCode = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div
      className={`flex flex-col sm:flex-row h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-[110px] right-6 z-10 p-2 sm:top-8 rounded-full bg-transparent hover:bg-gray-300 transition-all"
        title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-full sm:w-20 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100 border-r border-gray-300"
        } h-auto sm:h-full flex sm:flex-col items-center gap-4 p-4 overflow-x-auto`}
      >
        {Object.entries(languageMap).map(([key, lang]) => (
          <button
            key={key}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
              selectedLang === key
                ? isDarkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : isDarkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-200 text-gray-600"
            }`}
            title={`${lang.language} (${lang.version})`}
            onClick={() => handleLanguageChange(key)}
          >
            {lang.icon()}
          </button>
        ))}
      </div>

      {/* Main Editor Section */}
      <div className="flex-1 flex flex-col p-4 sm:ml-4 overflow-hidden w-full">
        {/* Code Editor */}
        <div
          className={`flex-1 mb-4 rounded-lg overflow-hidden ${
            isDarkMode
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-800 border border-gray-300"
          }`}
        >
          <div className="p-4 w-full overflow-x-auto">
            {/* Header Section */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              {/* Language Information and Copy Button */}
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {capitalizeFirstLetter(selectedLang)} ({languageMap[selectedLang].version})
                </span>
                <button
                  onClick={copyCode}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all ${
                    isDarkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy
                      className={`h-4 w-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Run Button */}
              <button
                onClick={executeCode}
                className={`flex items-center gap-2 px-4 mr-11 py-2 rounded-md text-white transition-all ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500"
                    : "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
                }`}
                disabled={isLoading}
              >
                <Play className="h-4 w-4" />
                <span>{isLoading ? "Running..." : "Run"}</span>
              </button>
            </div>

            {/* Code Editor */}
            <Editor
              language={languageMap[selectedLang]?.language}
              theme={isDarkMode ? "vs-dark" : "light"}  // Use default Monaco themes
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
              }}
              height="400px" // Adjust height as needed
            />
          </div>
        </div>

      {/* Output Section */}
      <div
        className={`h-48 rounded-lg overflow-hidden ${
          isDarkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Terminal
              className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            />
            <span
              className={`font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Output
            </span>
          </div>
          <div
            className={`font-mono text-sm whitespace-pre-wrap h-32 overflow-y-auto p-2 rounded-md ${
              isDarkMode
                ? "bg-gray-900 text-green-500"
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            {output}
          </div>
        </div>
      </div>
</div>

    </div>
  );
};

export default CodeEditor;
