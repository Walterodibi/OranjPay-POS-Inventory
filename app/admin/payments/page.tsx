"use client"

import { useState } from "react"
import { CreditCard, Plus, QrCode, Settings, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function PaymentMethodsPage() {
  const [cashEnabled, setCashEnabled] = useState(true)
  const [cardEnabled, setCardEnabled] = useState(true)
  const [qrEnabled, setQrEnabled] = useState(true)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payment Methods</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-[#635bff] hover:bg-[#635bff]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Methods</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Cash
                  </CardTitle>
                  <Switch checked={cashEnabled} onCheckedChange={setCashEnabled} />
                </div>
                <CardDescription>Traditional cash payment handling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                      <span>15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Today's Volume:</span>
                      <span>₦25,500.00</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Card
                  </CardTitle>
                  <Switch checked={cardEnabled} onCheckedChange={setCardEnabled} />
                </div>
                <CardDescription>Credit and debit card processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Today's Volume:</span>
                      <span>₦18,200.00</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    QR Code
                  </CardTitle>
                  <Switch checked={qrEnabled} onCheckedChange={setQrEnabled} />
                </div>
                <CardDescription>Mobile payment via QR code scanning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Today's Transactions:</span>
                      <span>5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Today's Volume:</span>
                      <span>₦12,800.00</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Method Performance</CardTitle>
              <CardDescription>Compare transaction volumes across different payment methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Payment method performance chart will be displayed here.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Global Payment Settings</CardTitle>
              <CardDescription>Configure settings that apply to all payment methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Receipt Printing</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically print receipts for all transactions
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Email Receipts</div>
                    <div className="text-sm text-muted-foreground">
                      Send email receipts when customer email is provided
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Transaction Timeout</div>
                    <div className="text-sm text-muted-foreground">
                      Cancel transactions after 2 minutes of inactivity
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Offline Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Allow transactions when internet connection is unavailable
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Transactions by Payment Method</CardTitle>
              <CardDescription>View transaction history grouped by payment method.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Cash Transactions
                  </h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={`cash-${i}`} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium">Transaction #{1000 + i}</div>
                          <div className="text-sm text-muted-foreground">
                            {i === 1 ? "Today, 10:30 AM" : i === 2 ? "Today, 09:15 AM" : "Yesterday, 04:45 PM"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₦{(Math.random() * 5000 + 1000).toFixed(2)}</div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Card Transactions
                  </h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={`card-${i}`} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium">Transaction #{1010 + i}</div>
                          <div className="text-sm text-muted-foreground">
                            {i === 1 ? "Today, 11:45 AM" : i === 2 ? "Today, 08:30 AM" : "Yesterday, 03:15 PM"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₦{(Math.random() * 8000 + 2000).toFixed(2)}</div>
                          <Badge
                            className={
                              i === 2
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {i === 2 ? "Refunded" : "Completed"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    QR Code Transactions
                  </h3>
                  <div className="space-y-2">
                    {[1, 2].map((i) => (
                      <div key={`qr-${i}`} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium">Transaction #{1020 + i}</div>
                          <div className="text-sm text-muted-foreground">
                            {i === 1 ? "Today, 01:30 PM" : "Yesterday, 05:45 PM"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₦{(Math.random() * 6000 + 1500).toFixed(2)}</div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
