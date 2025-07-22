import AsideNav from '@/components/widgets/AsideNav'
import Footer from '@/components/widgets/Footer'
import Header from '@/components/widgets/Header'
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const router = useRouter()
    const path = router.state.location.pathname
    const hideAsideAndFooter = path === '/login' || path === '/signup'
    return (
      <div>
        {!hideAsideAndFooter && <AsideNav />}
        <Header />
        <Outlet />
        {!hideAsideAndFooter && <Footer />}
      </div>
    )
  },
})
