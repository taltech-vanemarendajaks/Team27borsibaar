"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { toast } from "sonner";

interface Organization {
  id: number;
  name: string;
}

interface CurrentUser {
  organizationId?: number;
}

export function OrganizationSwitcher() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const userRes = await fetch("/api/backend/account", {
          credentials: "include",
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setCurrentUser(userData);
        }

        // Fetch organizations
        const orgsRes = await fetch("/api/backend/organizations", {
          credentials: "include",
        });
        if (orgsRes.ok) {
          const orgsData = await orgsRes.json();
          setOrganizations(Array.isArray(orgsData) ? orgsData : []);
        }
      } catch (error) {
        toast.error("Failed to load organizations");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrganizationChange = async (value: string) => {
    const newOrgId = parseInt(value, 10);
    if (isNaN(newOrgId) || !currentUser) return;

    setSwitching(true);
    try {
      const response = await fetch("/api/backend/account/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ organizationId: newOrgId }),
      });

      if (response.ok) {
        // Reload the page to refresh all organization-specific data
        window.location.reload();
      } else {
        toast.error("Failed to switch organization");
        console.error("Failed to switch organization");
        setSwitching(false);
      }
    } catch (error) {
      toast.error("Failed to switch organization");
      console.error("Error switching organization:", error);
      setSwitching(false);
    }
  };

  if (loading || !currentUser?.organizationId) {
    return null;
  }

  const currentOrg = organizations.find(
    (org) => org.id === currentUser.organizationId,
  );

  return (
    <Select
      value={currentUser.organizationId?.toString()}
      onValueChange={handleOrganizationChange}
      disabled={switching || organizations.length <= 1}
    >
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <Building2 className="!w-4 !h-4" />
          <SelectValue>
            {switching
              ? "Switching..."
              : currentOrg?.name || "Select organization"}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {organizations.map((org) => (
          <SelectItem key={org.id} value={org.id.toString()}>
            {org.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
