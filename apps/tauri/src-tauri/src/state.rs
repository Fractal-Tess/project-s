#![allow(unused)]

use std::collections::HashMap;
use std::string::ToString;
use std::sync::Mutex;

use tauri::{Builder, Wry};

pub fn register_managed_state(builder: Builder<Wry>) -> Builder<Wry> {
    builder.manage(Store::default())
}

#[derive(Default)]
pub struct Store {
    store: Mutex<HashMap<String, String>>,
}
impl Store {
    pub fn add_key_val(&self, key: String, val: String) {
        self.store
            .lock()
            .expect("cannot lock store")
            .insert(key, val);
    }
    pub fn read_key(&self, key: &String) -> Option<String> {
        self.store
            .lock()
            .expect("cannot lock store")
            .get(key)
            .map(ToString::to_string)
    }
}
