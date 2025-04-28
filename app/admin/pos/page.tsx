"use client"

import { useState } from "react"
import { CreditCard, Printer, QrCode, Settings, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function POSPage() {
  const [activeTerminal, setActiveTerminal] = useState("terminal-1")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Point of Sale</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print Reports
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Terminal Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Terminal Status</CardTitle>
            <CardDescription>View and manage your POS terminals.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full">
                <Select value={activeTerminal} onValueChange={setActiveTerminal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select terminal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terminal-1">Terminal 1 - Main Counter</SelectItem>
                    <SelectItem value="terminal-2">Terminal 2 - Side Counter</SelectItem>
                    <SelectItem value="terminal-3">Terminal 3 - Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium">Terminal Status</div>
                  <div className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    Online
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cashier:</span>
                    <span>Sarah Johnson</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transactions Today:</span>
                    <span>24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sales Today:</span>
                    <span>₦45,500.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Transaction:</span>
                    <span>10 minutes ago</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#635bff] hover:bg-[#635bff]/90">Launch Cashier Mode</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Active payment methods for this terminal.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Cash</div>
                    <div className="text-xs text-muted-foreground">Manual cash handling</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  Active
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Card</div>
                    <div className="text-xs text-muted-foreground">Credit/Debit card processing</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  Active
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">QR Code</div>
                    <div className="text-xs text-muted-foreground">Mobile payment processing</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  Active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common POS operations and functions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <Printer className="h-6 w-6 mb-2" />
                <span>Print Last Receipt</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <Settings className="h-6 w-6 mb-2" />
                <span>Open Cash Drawer</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <CreditCard className="h-6 w-6 mb-2" />
                <span>Refund Transaction</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <QrCode className="h-6 w-6 mb-2" />
                <span>Scan Product</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Terminal Activity</CardTitle>
          <CardDescription>Recent transactions and activities on this terminal.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="events">System Events</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="pt-4">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Transaction #{1000 + i}</div>
                      <div className="text-sm text-muted-foreground">
                        {i === 1
                          ? "10 minutes ago"
                          : i === 2
                            ? "25 minutes ago"
                            : i === 3
                              ? "45 minutes ago"
                              : i === 4
                                ? "1 hour ago"
                                : "2 hours ago"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₦{(Math.random() * 10000).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {i % 3 === 0 ? "Card" : i % 3 === 1 ? "Cash" : "QR Code"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="events" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Terminal Login</div>
                    <div className="text-sm text-muted-foreground">3 hours ago</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Sarah Johnson</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Cash Drawer Opened</div>
                    <div className="text-sm text-muted-foreground">2 hours ago</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Manual Operation</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Receipt Printed</div>
                    <div className="text-sm text-muted-foreground">1 hour ago</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Transaction #1003</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
