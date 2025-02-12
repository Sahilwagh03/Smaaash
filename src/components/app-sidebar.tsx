"use client"

import * as React from "react"
import { NavConfig } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { sideBarConstant } from "@/constant/dashboard"
import { NavMain } from "./nav-main"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sideBarConstant.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sideBarConstant.sideNavMain} Navtitle='Insights'/>
        <NavMain items={sideBarConstant.configItems} Navtitle='Configurations'/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sideBarConstant.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
