import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'

import AsideNav from '@/components/widgets/AsideNav'
import Footer from '@/components/widgets/Footer'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const isAuth =
      typeof window !== 'undefined' && localStorage.getItem('accessToken')
    return (
      <div>
        <AsideNav />
        {!isAuth && (
          <div className="flex justify-end gap-2 p-2">
            <Link to="/login" className="btn btn-outline btn-sm">
              Log In
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </div>
        )}
        <Outlet />
        <Footer />
        {/*<TanStackRouterDevtools />*/}
        <TanStackQueryLayout />
      </div>
    )
  },
})
