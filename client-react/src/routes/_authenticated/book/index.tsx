import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/book/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/book/"!</div>
}
