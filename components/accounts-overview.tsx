"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// Import forest-themed icons
import { Send, MoreHorizontal, Leaf, TreeDeciduous, Sprout } from "lucide-react"
import { AddMoneyModal } from "./add-money-modal"
import { SendMoneyModal } from "./send-money-modal"
import { RequestMoneyModal } from "./request-money-modal"

const initialAccounts = [
  { name: "Checking", balance: 7500 },
  { name: "Savings", balance: 560000 },
  { name: "Investment", balance: 5879000 },
]

export function AccountsOverview() {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false)
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false)
  const [isRequestMoneyModalOpen, setIsRequestMoneyModalOpen] = useState(false)

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  const handleAddMoney = (amount) => {
    setAccounts(
      accounts.map((account) =>
        account.name === "Checking" ? { ...account, balance: account.balance + amount } : account,
      ),
    )
  }

  const handleSendMoney = (amount, fromAccount) => {
    setAccounts(
      accounts.map((account) =>
        account.name === fromAccount ? { ...account, balance: account.balance - amount } : account,
      ),
    )
  }

  const handleRequestMoney = (amount, contact) => {
    console.log(`Requested $${amount} from ${contact.name}`)
  }

  return (
    <Card>
      {/* Update the card header icon */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Forest Resources</CardTitle>
        <TreeDeciduous className="h-4 w-4 text-forest-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">Total balance across all accounts</p>
        <div className="mt-4 space-y-2">
          {accounts.map((account) => (
            <div key={account.name} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{account.name}</span>
              <span className="text-sm font-medium">${account.balance.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {/* Update the button icons */}
          <Button size="sm" onClick={() => setIsAddMoneyModalOpen(true)} className="bg-forest-600 hover:bg-forest-700">
            <Sprout className="mr-2 h-4 w-4" /> Plant
          </Button>
          <Button size="sm" onClick={() => setIsSendMoneyModalOpen(true)} className="bg-forest-600 hover:bg-forest-700">
            <Send className="mr-2 h-4 w-4" /> Transfer
          </Button>
          <Button
            size="sm"
            onClick={() => setIsRequestMoneyModalOpen(true)}
            className="bg-forest-600 hover:bg-forest-700"
          >
            <Leaf className="mr-2 h-4 w-4" /> Harvest
          </Button>
          <Button size="sm" variant="outline" className="border-forest-200 dark:border-forest-800">
            <MoreHorizontal className="mr-2 h-4 w-4" /> More
          </Button>
        </div>
      </CardContent>
      <AddMoneyModal
        isOpen={isAddMoneyModalOpen}
        onClose={() => setIsAddMoneyModalOpen(false)}
        onAddMoney={handleAddMoney}
      />
      <SendMoneyModal
        isOpen={isSendMoneyModalOpen}
        onClose={() => setIsSendMoneyModalOpen(false)}
        onSendMoney={handleSendMoney}
        accounts={accounts}
      />
      <RequestMoneyModal
        isOpen={isRequestMoneyModalOpen}
        onClose={() => setIsRequestMoneyModalOpen(false)}
        onRequestMoney={handleRequestMoney}
      />
    </Card>
  )
}
