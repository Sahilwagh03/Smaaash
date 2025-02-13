"use client"

import * as React from "react"
import Image from "next/image"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { sideBarConstant } from "@/constant/dashboard"
import { NavMain } from "./nav-main"
import { GalleryVerticalEnd } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {!open ? (
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand_primary text-white">
            <GalleryVerticalEnd className="size-4" />
          </div>
        ) : (
          <Image
            src="/images/newsmaaashlogotwo.png.jpg"
            alt="News Maaash Logo"
            width={120}
            height={40}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sideBarConstant.sideNavMain} Navtitle="Insights" />
        <NavMain items={sideBarConstant.configItems} Navtitle="Configurations" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sideBarConstant.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
