//const WANDBOX_API = "http://localhost:3000/api";

const LANGUAGE_VERSIONS = {
  javascript: { compiler: "nodejs-20.17.0" },
  python: { compiler: "cpython-3.10.15" },
  java: { compiler: "openjdk-jdk-21+35" },
  cpp: { compiler: "gcc-head" },
};

export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compiler: languageConfig.compiler,
        code: code,
        filename: `main.${getFileExtension(language)}`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `HTTP error! status: ${response.status} - ${errorText}`,
      };
    }

    const data = await response.json();

    if (data.compiler_error) {
      return {
        success: false,
        output: data.program_output || "",
        error: data.compiler_error,
      };
    }

    if (data.program_error) {
      return {
        success: false,
        output: data.program_output || "",
        error: data.program_error,
      };
    }

    return {
      success: true,
      output: data.program_output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}