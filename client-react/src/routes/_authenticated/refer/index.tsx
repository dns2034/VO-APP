import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/refer/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/refer/"!</div>
}
