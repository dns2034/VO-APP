import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reset-password/"!</div>
}
