#![allow(clippy::needless_pass_by_value)]
use specta::collect_types;
use tauri::{AppHandle, Builder, Wry};
use tauri_specta::ts;

pub fn register_command_handlers(builder: Builder<Wry>) -> Builder<Wry> {
    #[cfg(debug_assertions)]
    ts::export(collect_types![], "../src/ipc.ts").expect("unable to generate specta types");

    builder.invoke_handler(tauri::generate_handler![load_default])
}

#[tauri::command]
#[specta::specta]
fn load_default(app: AppHandle) {
    ()
}
