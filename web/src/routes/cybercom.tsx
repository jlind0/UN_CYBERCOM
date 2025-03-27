import { dynamic } from 'tuono'
import type { TuonoRouteProps } from 'tuono'
import type { JSX } from 'react'

const LazyComponent = dynamic(() => import('../components/CybercomView'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})
interface SubscriptionData {
  subscription_id: bigint;
}
export default function CybercomPage({
  data,
}: TuonoRouteProps<SubscriptionData>): JSX.Element {
  return (
    <div>
      <h1>Welcome</h1>
      <LazyComponent data={data} />
    </div>
  )
}