"use client"

import { useState } from "react"
import { Building, Globe, Lock, Plus, Save, User } from "lucide-react"

import { OranjButton } from "@/components/ui/oranj-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminHeader } from "@/components/admin/admin-header"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("OranjPay Store")
  const [email, setEmail] = useState("contact@oranjpay.com")
  const [phone, setPhone] = useState("+234 123 456 7890")
  const [address, setAddress] = useState("123 Lagos Street, Nigeria")
  const [currency, setCurrency] = useState("NGN")
  const [taxRate, setTaxRate] = useState("7.5")
  const { user } = useAuth()

  return (
    <div className="flex flex-col w-full">
      <AdminHeader title="Settings" description={`Configure your store settings, ${user?.name || "User"}`} />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-sm text-muted-foreground">
              Logged in as <span className="font-medium">{user?.name || "User"}</span>
            </p>
          </div>
          <OranjButton>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </OranjButton>
        </div>

        <Tabs defaultValue="business">
          <TabsList>
            <TabsTrigger value="business">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="business" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your business details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Email</Label>
                    <Input id="business-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Phone</Label>
                    <Input id="business-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-website">Website</Label>
                    <Input id="business-website" placeholder="https://www.example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-address">Address</Label>
                  <Textarea id="business-address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="business-currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="business-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-tax">Tax Rate (%)</Label>
                    <Input id="business-tax" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-logo">Business Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                      <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <OranjButton variant="outline">Upload Logo</OranjButton>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Receipt Settings</CardTitle>
                <CardDescription>Customize your receipt appearance and information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-header">Receipt Header</Label>
                  <Textarea id="receipt-header" placeholder="Thank you for shopping with us!" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-footer">Receipt Footer</Label>
                  <Textarea id="receipt-footer" placeholder="Please come again!" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show Logo on Receipt</div>
                    <div className="text-sm text-muted-foreground">Display your business logo on printed receipts</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payment" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure your payment processing options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Cash Payments</div>
                    <div className="text-sm text-muted-foreground">Accept cash payments at checkout</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Card Payments</div>
                    <div className="text-sm text-muted-foreground">Accept credit and debit card payments</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">QR Code Payments</div>
                    <div className="text-sm text-muted-foreground">Accept mobile payments via QR code</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-4">
                  <OranjButton variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </OranjButton>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tax Configuration</CardTitle>
                <CardDescription>Set up tax rates and calculation methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Enable Tax Calculation</div>
                    <div className="text-sm text-muted-foreground">Automatically calculate taxes on transactions</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Include Tax in Product Prices</div>
                    <div className="text-sm text-muted-foreground">Display product prices with tax included</div>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-tax-rate">Default Tax Rate (%)</Label>
                  <Input id="default-tax-rate" defaultValue="7.5" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Active Users</div>
                    <div className="text-sm text-muted-foreground">6 users currently active</div>
                  </div>
                  <OranjButton variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Manage Users
                  </OranjButton>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">Admin</div>
                      </div>
                    </div>
                    <OranjButton variant="ghost" size="sm">
                      Edit
                    </OranjButton>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">Michael Chen</div>
                        <div className="text-sm text-muted-foreground">Cashier</div>
                      </div>
                    </div>
                    <OranjButton variant="ghost" size="sm">
                      Edit
                    </OranjButton>
                  </div>
                </div>

                <OranjButton>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </OranjButton>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Low stock alerts</div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">New transactions</div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Daily sales reports</div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">User account changes</div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>System Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Low stock alerts</div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">New transactions</div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">User login activity</div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">System updates</div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="alerts@oranjpay.com" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security options for your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <OranjButton variant="outline">Enable</OranjButton>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Password Requirements</div>
                    <div className="text-sm text-muted-foreground">Require strong passwords for all users</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically log out inactive users after 30 minutes
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-2">
                  <OranjButton variant="outline" className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </OranjButton>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Data Privacy</CardTitle>
                <CardDescription>Manage data privacy and retention settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Customer Data Retention</div>
                    <div className="text-sm text-muted-foreground">Store customer data for 1 year</div>
                  </div>
                  <OranjButton variant="ghost" size="sm">
                    Configure
                  </OranjButton>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">Transaction History</div>
                    <div className="text-sm text-muted-foreground">Store transaction history for 5 years</div>
                  </div>
                  <OranjButton variant="ghost" size="sm">
                    Configure
                  </OranjButton>
                </div>

                <div className="pt-2">
                  <OranjButton variant="outline" className="w-full">
                    <Globe className="mr-2 h-4 w-4" />
                    Privacy Policy Settings
                  </OranjButton>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
