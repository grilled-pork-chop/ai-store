import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { useMatches, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react"

export default function DynamicBreadcrumb() {
  const matches = useMatches()
  const { location } = useRouterState()
  const basepath = import.meta.env.BASE_URL || "/"

  if (location.pathname === basepath || location.pathname === "/") return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matches.map((route, i) => {
          const isLast = i === matches.length - 1
          const breadcrumbStatic = route?.staticData?.breadcrumb
          const label =
            typeof breadcrumbStatic === "function"
              ? breadcrumbStatic(route)
              : breadcrumbStatic ?? route.pathname ?? "Unknown"

          const href = `${basepath.replace(/\/$/, "")}${route.pathname}`

          return (
            <Fragment key={route.id}>
              <BreadcrumbItem>
                {!isLast ? (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
