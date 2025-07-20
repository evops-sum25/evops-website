import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import AsideNav from '@/components/widgets/AsideNav'
import Footer from '@/components/widgets/Footer'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <AsideNav />
      <Outlet />
      <Footer />
      {/*<TanStackRouterDevtools />*/}
      <TanStackQueryLayout />
    </>
  ),
})
