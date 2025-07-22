import AsideNav from '@/components/widgets/AsideNav'
import Footer from '@/components/widgets/Footer'
import Header from '@/components/widgets/Header'
import TanStackQueryLayout from '@/integrations/tanstack-query/layout'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <div>
        <AsideNav />
        <Header />
        <Outlet />
        <Footer />
        {/*<TanStackRouterDevtools />*/}
        <TanStackQueryLayout />
      </div>
    )
  },
})
