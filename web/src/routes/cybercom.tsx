import { dynamic } from 'tuono'

const LazyComponent = dynamic(() => import('../components/CybercomView'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function CybercomPage({data} : any) {
  return (
    <div>
      <h1>Welcome</h1>
      <LazyComponent data={data} />
    </div>
  )
}