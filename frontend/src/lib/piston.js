// Piston API is a service for code execution

const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // FIX: Cloudflare/Piston blocks requests without a User-Agent
        "User-Agent": "my-coding-app/1.0.0", 
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    // If still getting 401, log the text to see if it's a "Rate Limit" message
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `HTTP error! status: ${response.status} - ${errorText}`,
      };
    }

    const data = await response.json();

    // Piston returns 200 even if code has syntax errors, 
    // we must check the 'run' object specifically.
    if (data.run.code !== 0 && data.run.stderr) {
      return {
        success: false,
        output: data.run.output,
        error: data.run.stderr,
      };
    }

    return {
      success: true,
      output: data.run.output || "No output",
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
