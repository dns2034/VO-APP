import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/auth/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guest/auth/forgot-password/"!</div>
}
