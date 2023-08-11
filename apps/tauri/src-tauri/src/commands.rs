#![allow(clippy::needless_pass_by_value)]
use specta::collect_types;
use tauri::{Builder, Wry};
use tauri_specta::ts;

pub fn register_command_handlers(builder: Builder<Wry>) -> Builder<Wry> {
    #[cfg(debug_assertions)]
    ts::export(collect_types![greet_from_rust], "../src/ipc.ts")
        .expect("unable to generate specta types");

    builder.invoke_handler(tauri::generate_handler![greet_from_rust])
}

#[tauri::command]
#[specta::specta]
fn greet_from_rust(msg: String) -> String {
    format!("Hello from rust - {msg}")
}
