import { Button } from 'ui';
import { loadDefault } from './ipc';
import { addSnippet, db } from './db';
import { path } from '@tauri-apps/api';
function App() {
  db.execute(
    'CREATE TABLE IF NOT EXISTS snippets (id INTEGER PRIMARY KEY);'
  ).then(console.log);
  path.appDir().then(console.log);
  async function handler() {
    addSnippet();
    console.log('here');
    // localStorage.getItem('e')?.split('');
    // await loadDefault();
  }

  return (
    <>
      {/* Header */}
      <main className="form-control justify-center flex-1 items-center">
        <Button onClick={handler}>Load Default</Button>
      </main>
      {/* Footer */}
    </>
  );
}

export default App;
