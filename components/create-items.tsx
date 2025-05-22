"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Field = {
  key: string
  label: string
  type?: "text" | "number" | "select"
  options?: { value: string; label: string }[]
  placeholder?: string
}

type CreateItemModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: Record<string, any>) => void
  onUpdate: (data: Record<string, any>) => void
  fields: Field[]
  title?: string
  initialData?: Record<string, any>
  isEditing?: boolean
}

export function ItemModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  fields,
  title = "Create Item",
  initialData,
  isEditing = false,
}: CreateItemModalProps) {
  const [form, setForm] = useState<Record<string, any>>(initialData || {})

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    }
  }, [initialData])

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      onUpdate(form)
    } else {
      onCreate(form)
    }
    setForm({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">{isEditing ? `Edit ${title}` : title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-sm sm:text-base">{field.label}</Label>
              {field.type === "select" && field.options ? (
                <select
                  id={field.key}
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border rounded px-2 py-1.5 text-sm sm:text-base"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.key}
                  type={field.type || "text"}
                  placeholder={field.placeholder || ""}
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="text-sm sm:text-base"
                />
              )}
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-0 sm:space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="w-full sm:w-auto"
            >
              {isEditing ? "Save Changes" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}