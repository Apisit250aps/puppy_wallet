'use client'

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { data, status } = useSession()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {status === 'loading' ? (
                <>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={data!.user!.image as string}
                      alt={data!.user!.name as string}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                </>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                {status === 'loading' ? (
                  <>
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-3 w-32 rounded" />
                  </>
                ) : (
                  <>
                    <span className="truncate font-medium">
                      {data!.user!.name as string}
                    </span>
                    <span className="truncate text-xs">
                      {data!.user!.email as string}
                    </span>
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              {status === 'loading' ? (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="grid flex-1 gap-1">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-3 w-32 rounded" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={data!.user!.image as string}
                      alt={data!.user!.name as string}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {data!.user!.name as string}
                    </span>
                    <span className="truncate text-xs">
                      {data!.user!.email as string}
                    </span>
                  </div>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
