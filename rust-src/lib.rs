use napi_derive::napi;
use std::collections::HashMap;
use std::path::Path;

#[napi]
pub struct FileProcessor {
    cache: HashMap<String, String>,
}

#[napi]
impl FileProcessor {
    #[napi(constructor)]
    pub fn new() -> Self {
        FileProcessor {
            cache: HashMap::new(),
        }
    }

    /// High-performance file content reading with caching
    #[napi]
    pub fn read_file_content(&mut self, file_path: String) -> String {
        if let Some(cached) = self.cache.get(&file_path) {
            return cached.clone();
        }

        match std::fs::read_to_string(&file_path) {
            Ok(content) => {
                self.cache.insert(file_path, content.clone());
                content
            }
            Err(_) => String::new(),
        }
    }

    /// Fast regex matching for export patterns
    #[napi]
    pub fn find_exports(&self, content: String) -> Vec<String> {
        use regex::Regex;
        
        let export_patterns = vec![
            r"export\s+(?:default\s+)?(?:function|const|let|var|class|interface|type|enum)\s+(\w+)",
            r"export\s*\{([^}]+)\}",
            r"export\s+default\s+(\w+)",
        ];

        let mut exports = Vec::new();
        
        for pattern in export_patterns {
            if let Ok(regex) = Regex::new(pattern) {
                for cap in regex.captures_iter(&content) {
                    if let Some(match_str) = cap.get(1) {
                        exports.push(match_str.as_str().to_string());
                    }
                }
            }
        }

        exports
    }

    /// Optimized path collection
    #[napi]
    pub fn collect_paths(&self, root_dir: String, allowed_extensions: Vec<String>) -> Vec<String> {
        let mut paths = Vec::new();
        
        if let Ok(entries) = std::fs::read_dir(&root_dir) {
            for entry in entries.flatten() {
                if let Ok(file_type) = entry.file_type() {
                    if file_type.is_file() {
                        if let Some(extension) = entry.path().extension() {
                            let ext_str = extension.to_string_lossy();
                            if allowed_extensions.iter().any(|ext| ext_str.ends_with(ext)) {
                                if let Ok(path_str) = entry.path().to_str() {
                                    paths.push(path_str.to_string());
                                }
                            }
                        }
                    }
                }
            }
        }

        paths
    }

    /// Memory-efficient string processing
    #[napi]
    pub fn process_strings(&self, strings: Vec<String>) -> Vec<String> {
        strings
            .into_iter()
            .filter(|s| !s.is_empty())
            .map(|s| s.trim().to_string())
            .collect()
    }
}

#[napi]
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