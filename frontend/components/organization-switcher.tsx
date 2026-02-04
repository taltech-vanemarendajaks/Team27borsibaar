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

  const currentOrg = organizations.find(
    (org) => org.id === currentUser?.organizationId,
  );

  const getDisplayText = () => {
    if (loading) return "Loading...";
    if (!currentUser?.organizationId) return "No organization";
    return currentOrg?.name || "Select organization";
  };

  const displayText = getDisplayText();

  // Dynamic font size based on text length
  const getFontSize = () => {
    const length = displayText.length;
    if (length <= 10) return "text-lg";
    if (length <= 20) return "text-base";
    return "text-sm";
  };

  const isDisabled =
    loading ||
    switching ||
    !currentUser?.organizationId ||
    organizations.length <= 1;

  return (
    <Select
      value={currentUser?.organizationId?.toString() || ""}
      onValueChange={handleOrganizationChange}
      disabled={isDisabled}
    >
      <SelectTrigger className="w-full h-12 border-0 shadow-none bg-transparent hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 transition-colors">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Building2 className="!w-6 !h-6 shrink-0" />
          <span className={`${getFontSize()} font-medium`}>{displayText}</span>
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
