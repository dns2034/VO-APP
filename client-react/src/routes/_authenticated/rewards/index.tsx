import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/rewards/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/client/rewards/"!</div>
}
