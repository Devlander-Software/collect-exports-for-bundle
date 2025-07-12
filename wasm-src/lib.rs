use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct ExportMatch {
    pub name: String,
    pub line: u32,
    pub export_type: String,
}

#[wasm_bindgen]
pub struct ExportAnalyzer {
    patterns: Vec<String>,
}

#[wasm_bindgen]
impl ExportAnalyzer {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        ExportAnalyzer {
            patterns: vec![
                "export\\s+(?:default\\s+)?(?:function|const|let|var|class|interface|type|enum)\\s+(\\w+)".to_string(),
                "export\\s*\\{([^}]+)\\}".to_string(),
                "export\\s+default\\s+(\\w+)".to_string(),
            ]
        }
    }

    /// High-performance export analysis
    #[wasm_bindgen]
    pub fn analyze_exports(&self, content: &str) -> Result<JsValue, JsValue> {
        let mut exports = Vec::new();
        let lines: Vec<&str> = content.lines().collect();

        for (line_num, line) in lines.iter().enumerate() {
            for pattern in &self.patterns {
                if let Some(captures) = self.match_pattern(line, pattern) {
                    exports.push(ExportMatch {
                        name: captures,
                        line: (line_num + 1) as u32,
                        export_type: self.determine_export_type(line).to_string(),
                    });
                }
            }
        }

        JsValue::from_serde(&exports).map_err(|e| JsValue::from_str(&e.to_string()))
    }

    /// Optimized string processing
    #[wasm_bindgen]
    pub fn process_strings(&self, strings: &JsValue) -> Result<JsValue, JsValue> {
        let input: Vec<String> = strings.into_serde()
            .map_err(|e| JsValue::from_str(&e.to_string()))?;

        let processed: Vec<String> = input
            .into_iter()
            .filter(|s| !s.is_empty())
            .map(|s| s.trim().to_string())
            .collect();

        JsValue::from_serde(&processed).map_err(|e| JsValue::from_str(&e.to_string()))
    }

    fn match_pattern(&self, line: &str, pattern: &str) -> Option<String> {
        // Simplified regex matching for WASM
        if pattern.contains("\\w+") {
            if let Some(pos) = line.find("export") {
                let after_export = &line[pos..];
                if let Some(name_start) = after_export.find(|c: char| c.is_alphanumeric()) {
                    let name_part = &after_export[name_start..];
                    let name_end = name_part.find(|c: char| !c.is_alphanumeric()).unwrap_or(name_part.len());
                    return Some(name_part[..name_end].to_string());
                }
            }
        }
        None
    }

    fn determine_export_type(&self, line: &str) -> &str {
        if line.contains("export default") {
            "default"
        } else if line.contains("export {") {
            "named"
        } else if line.contains("export type") {
            "type"
        } else {
            "unknown"
        }
    }
}

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u64 {
    if n <= 1 {
        return n as u64;
    }
    
    let mut a = 0u64;
    let mut b = 1u64;
    
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    
    b
} 