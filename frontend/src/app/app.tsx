// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputOperation } from '../components/InputOperation/InputOperation';
import { Latches } from '../components/latches/Latches';
import { OperationList } from '../components/OperationsList/OperationList';


export function App() {
  const apiUrl:string = process.env.REACT_APP_BACKEND_URL || "localhost:3000";
    const apiKey:string = process.env.REACT_APP_BACKEND_API_KEY || "";
const ufa = "asdf";
  return (
    <main>
      <section>
        <InputOperation />
        <Latches />
      </section>
      <section>
        <OperationList />
      </section>
      <p>apiKey {apiKey} </p>
      <p>apiURL {apiUrl} </p>
    </main>
  );
}

export default App;
