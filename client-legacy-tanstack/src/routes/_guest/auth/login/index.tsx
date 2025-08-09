import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guest/auth/login/"!</div>
}
