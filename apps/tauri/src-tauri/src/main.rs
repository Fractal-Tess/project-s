#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use commands::register_command_handlers;
use tauri::{Builder as TauriBuilder, RunEvent};

mod commands;
mod error;
mod prelude;

fn main() {
    let app = TauriBuilder::default().plugin(tauri_plugin_window_state::Builder::default().build());

    let app = register_command_handlers(app);

    app.build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_, e| {
            if matches!(e, RunEvent::Ready) {
                println!("Window is ready");
            }
        });
}
