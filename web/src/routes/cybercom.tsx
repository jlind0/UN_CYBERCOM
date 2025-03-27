import { Suspense } from 'react';
import { dynamic } from 'tuono';

interface MyData {
  subscription_id: bigint;
}

interface AppProps {
  data: MyData;
}

const LazyComponent = dynamic(() => import('../components/CybercomView'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

function App({ data }: AppProps) {
  return (
    <div>
      <h1>Welcome</h1>
      <Suspense>
        <LazyComponent data={data} />
      </Suspense>
    </div>
  );
}

export default App;
