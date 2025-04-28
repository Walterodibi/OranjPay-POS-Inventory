"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, CreditCard, BanknoteIcon as Bank, MoreVertical, Trash2, Edit, Copy } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BanksPage() {
  const [activeTab, setActiveTab] = useState("banks")
  const [openAddBank, setOpenAddBank] = useState(false)
  const [openAddCard, setOpenAddCard] = useState(false)

  const banks = [
    {
      id: 1,
      name: "First Bank",
      accountNumber: "1234567890",
      accountName: "OranjPay Business",
      bankCode: "011",
    },
    {
      id: 2,
      name: "GTBank",
      accountNumber: "0987654321",
      accountName: "OranjPay Savings",
      bankCode: "058",
    },
  ]

  const cards = [
    {
      id: 1,
      type: "Visa",
      number: "•••• •••• •••• 4242",
      expiry: "12/25",
      name: "OranjPay Business",
    },
    {
      id: 2,
      type: "Mastercard",
      number: "•••• •••• •••• 5555",
      expiry: "09/24",
      name: "OranjPay Expenses",
    },
  ]

  return (
    <div className="flex flex-col w-full">
      <AdminHeader title="Banks & Cards" description="Manage your linked bank accounts and payment cards" />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <Tabs defaultValue="banks" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="banks">Bank Accounts</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
            <Button
              className="bg-[#635BFF] hover:bg-[#635BFF]/90"
              onClick={() => (activeTab === "banks" ? setOpenAddBank(true) : setOpenAddCard(true))}
            >
              <Plus className="h-4 w-4 mr-2" />
              {activeTab === "banks" ? "Add Bank Account" : "Add Card"}
            </Button>
          </div>

          <TabsContent value="banks" className="space-y-4">
            {banks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bank className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bank accounts yet</h3>
                  <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
                    Add your bank accounts to receive payments and manage your finances.
                  </p>
                  <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90" onClick={() => setOpenAddBank(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bank Account
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {banks.map((bank) => (
                  <Card key={bank.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{bank.name}</CardTitle>
                          <CardDescription>{bank.accountName}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Account Number</span>
                          <span className="text-sm font-medium">{bank.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Bank Code</span>
                          <span className="text-sm font-medium">{bank.bankCode}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cards" className="space-y-4">
            {cards.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CreditCard className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No cards yet</h3>
                  <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
                    Add your payment cards to make purchases and manage your expenses.
                  </p>
                  <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90" onClick={() => setOpenAddCard(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {cards.map((card) => (
                  <Card key={card.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{card.type}</CardTitle>
                          <CardDescription>{card.name}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Card Number</span>
                          <span className="text-sm font-medium">{card.number}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Expiry Date</span>
                          <span className="text-sm font-medium">{card.expiry}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Bank Account Dialog */}
        <Dialog open={openAddBank} onOpenChange={setOpenAddBank}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
              <DialogDescription>
                Enter your bank account details to link it to your OranjPay account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Select>
                  <SelectTrigger id="bank-name">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-bank">First Bank</SelectItem>
                    <SelectItem value="gtbank">GTBank</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="access">Access Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input id="account-number" placeholder="Enter 10-digit account number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-name">Account Name</Label>
                <Input id="account-name" placeholder="Enter account name" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAddBank(false)}>
                Cancel
              </Button>
              <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90" onClick={() => setOpenAddBank(false)}>
                Add Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Card Dialog */}
        <Dialog open={openAddCard} onOpenChange={setOpenAddCard}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payment Card</DialogTitle>
              <DialogDescription>Enter your card details to link it to your OranjPay account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input id="card-name" placeholder="Enter name as it appears on card" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="XXX" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAddCard(false)}>
                Cancel
              </Button>
              <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90" onClick={() => setOpenAddCard(false)}>
                Add Card
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
