import { dynamic } from 'tuono';

interface MyData {
  subscription_id: bigint;
}

interface AppProps {
  data: MyData;
}

const LazyComponent = dynamic(() => import('../components/CybercomView'), {
  ssr: true,
  loading: () => <div>Loading...</div>,
});

function App({ data }: AppProps) {
  return (
    <div>
      <h1>Welcome</h1>
      {typeof window !== 'undefined' && <LazyComponent data={data} />}
    </div>
  );
}

export default App;
