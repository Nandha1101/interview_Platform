//const WANDBOX_API = "http://localhost:3000/api";
import axiosInstance from "./axios.js";

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

    const response = await axiosInstance.post(`/api/execute`, {
      compiler: languageConfig.compiler,
      code: code,
      filename: `main.${getFileExtension(language)}`,
    });

    const data = response.data;

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
      error: `Failed to execute code: ${error.response?.data?.message || error.message}`,
    };
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
    cpp: "cpp",
  };

  return extensions[language] || "txt";
}