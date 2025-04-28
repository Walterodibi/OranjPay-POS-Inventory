"use client"

import { useState } from "react"
import { Search, UserPlus } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { users } from "@/lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [openInviteDialog, setOpenInviteDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openManageRolesDialog, setOpenManageRolesDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const usersPerPage = 8

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Handle checkbox selection
  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(currentUsers.map((user) => user.id))
    }
  }

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-green-50 text-green-700 border-green-200"
      case "Cashier":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Owner":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  // Show toast notification
  const showUserUpdatedToast = (userName: string) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span>{`"${userName}" details updated`}</span>
        </div>
      ),
      description: (
        <div className="flex gap-4">
          <button className="text-sm font-medium">Undo</button>
          <button className="text-sm font-medium">View profile</button>
        </div>
      ),
      variant: "default",
    })
  }

  const handleUpdateUser = (user) => {
    setSelectedUser(user)
    setOpenUpdateDialog(true)
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader
        title="Users"
        description="Invite your teammates or staffs and customize which feature you want them to have access to"
      />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {selectedUsers.length > 0 ? <span>{selectedUsers.length} selected</span> : <span>1 users</span>}
            </h2>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="pl-9 w-[240px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setOpenManageRolesDialog(true)}
              >
                <span>Manage roles</span>
              </Button>

              <Button
                className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white"
                onClick={() => setOpenInviteDialog(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Invite user
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="p-4 text-left">S/N</th>
                  <th className="p-4 text-left font-medium text-sm">Name</th>
                  <th className="p-4 text-left font-medium text-sm">Email Address</th>
                  <th className="p-4 text-left font-medium text-sm">Role</th>
                  <th className="p-4 text-right font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className="border-b hover:bg-muted/20">
                    <td className="p-4 text-sm">{index + 1}</td>
                    <td className="p-4">
                      <div className="font-medium">{user.name}</div>
                    </td>
                    <td className="p-4 text-sm">{user.email}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={`rounded-md px-2 py-1 text-xs ${getRoleColor(user.role)}`}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-[#635BFF] text-white hover:bg-[#635BFF]/90"
                          onClick={() => handleUpdateUser(user)}
                        >
                          Update
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      {/* Invite User Dialog */}
      <Dialog open={openInviteDialog} onOpenChange={setOpenInviteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Invite New User</DialogTitle>
            <DialogDescription>Invite team members and assign them a role</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <span className="text-red-500 mr-1">*</span>Email Address
              </Label>
              <Input id="email" placeholder="Enter email address of team member" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subaccounts" className="flex items-center">
                <span className="text-red-500 mr-1">*</span>Assign Subaccounts
              </Label>
              <Select>
                <SelectTrigger id="subaccounts">
                  <SelectValue placeholder="Select subaccount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary Account</SelectItem>
                  <SelectItem value="secondary">Secondary Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store" className="flex items-center">
                <span className="text-red-500 mr-1">*</span>Assign store
              </Label>
              <Select>
                <SelectTrigger id="store">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Store</SelectItem>
                  <SelectItem value="branch1">Branch 1</SelectItem>
                  <SelectItem value="branch2">Branch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center">
                <span className="text-red-500 mr-1">*</span>Role
              </Label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-[#635BFF] hover:bg-[#635BFF]/90" onClick={() => setOpenInviteDialog(false)}>
              Invite new user
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update User Dialog */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Update User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="update-email" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>Email Address
                </Label>
                <Input id="update-email" defaultValue={selectedUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-subaccounts" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>Assign Subaccounts
                </Label>
                <div className="flex items-center border rounded-md p-2 bg-gray-100">
                  <span className="px-2 py-1 bg-gray-200 rounded text-sm mr-2">Primary Account</span>
                  <button className="ml-auto text-gray-400">×</button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-store" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>Assign Store
                </Label>
                <Select>
                  <SelectTrigger id="update-store">
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Store</SelectItem>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                    <SelectItem value="branch2">Branch 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-role" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>Role
                </Label>
                <Select defaultValue="O">
                  <SelectTrigger id="update-role">
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="O">Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="w-full bg-[#635BFF] hover:bg-[#635BFF]/90"
              onClick={() => {
                showUserUpdatedToast(selectedUser?.name || "User")
                setOpenUpdateDialog(false)
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Roles Dialog */}
      <Dialog open={openManageRolesDialog} onOpenChange={setOpenManageRolesDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Manage Roles</DialogTitle>
            <DialogDescription>Last updated Monday 11th June 2022</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="default-role">
            <TabsList>
              <TabsTrigger value="default-role">Default Role</TabsTrigger>
              <TabsTrigger value="custom-role">Custom Role</TabsTrigger>
            </TabsList>
            <TabsContent value="default-role" className="mt-4">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="p-4 text-left">S/N</th>
                      <th className="p-4 text-left font-medium text-sm">Role</th>
                      <th className="p-4 text-right font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "Owner" },
                      { id: 2, name: "Admin" },
                      { id: 3, name: "Business manager" },
                      { id: 4, name: "Store keeper" },
                      { id: 5, name: "Developer" },
                      { id: 6, name: "Customer support" },
                      { id: 7, name: "Waybill manager" },
                      { id: 8, name: "Sales cashier" },
                      { id: 9, name: "Cashier" },
                      { id: 10, name: "Store manager" },
                    ].map((role) => (
                      <tr key={role.id} className="border-b">
                        <td className="p-4">{role.id}</td>
                        <td className="p-4">{role.name}</td>
                        <td className="p-4 text-right">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-[#635BFF] text-white hover:bg-[#635BFF]/90"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="custom-role" className="mt-4">
              <div className="flex justify-end mb-4">
                <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90">
                  <span className="mr-1">+</span> Create Role
                </Button>
              </div>
              <div className="border rounded-md p-8 text-center">
                <p>No custom roles created yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
