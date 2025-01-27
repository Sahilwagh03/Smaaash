"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationLinks, thrillZoneActivities, partiesAndEvents } from '../../../constant/navigationLink';

export function CustomNavigationMenu() {
    const pathname = usePathname();
  
    return (
      <NavigationMenu>
        <NavigationMenuList>
          {navigationLinks.map((link) => (
            <NavigationMenuItem key={link.title}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), 'text-[1rem] font-semibold bg-transparent')}
                  active={pathname === link.href}
                >
                  {link.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
  
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-[1rem] font-semibold bg-transparent">Parties & Events</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                    </Link>
                  </NavigationMenuLink>
                </li>
                {partiesAndEvents.map((event) => (
                  <ListItem
                    key={event.title}
                    href={event.href}
                    title={event.title}
                    active={pathname === event.href}
                    className="hover:bg-accent"
                  >
                    {event.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
  
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-[1rem] font-semibold  bg-transparent">Thrill Zone</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {thrillZoneActivities.map((activity) => (
                  <ListItem
                    key={activity.title}
                    title={activity.title}
                    href={activity.href}
                    active={pathname === activity.href}
                    className="hover:bg-accent"
                  >
                    {activity.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { active?: boolean }
>(({ className, title, children, active, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild active={active}>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-background hover:text-[var(--brand-primary)] focus:bg-background focus:text-[var(--brand-primary)]",
                        active && "text-[var(--brand-primary)]",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";