import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "ACME Corporation",
    jobTitle: "Inspector",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    reportCompletions: true,
    productUpdates: false,
  });

  useEffect(() => {
    if (user) {
      let firstName = "";
      let lastName = "";
      if (user.fullName) {
        const parts = user.fullName.trim().split(" ");
        firstName = parts[0];
        lastName = parts.slice(1).join(" ");
      } else if (user.name) {
        const parts = user.name.trim().split(" ");
        firstName = parts[0];
        lastName = parts.slice(1).join(" ");
      }

      setForm({
        firstName,
        lastName,
        email: user.email || "",
        company: user.company || "ACME Corporation",
        jobTitle: user.job_title || "Inspector",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      if (user.notifications) {
        setNotifications({
          reportCompletions: !!user.notifications.reportCompletions,
          productUpdates: !!user.notifications.productUpdates,
        });
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      return updated;
    });
  };

  const handleSaveProfile = async () => {
    if (form.newPassword !== form.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }
    if (form.newPassword && !form.currentPassword) {
      toast({
        title: "Current password required",
        description: "Please enter your current password to change it.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Update profile
      const profileRes = await fetch("http://3.128.160.75:8000/accounts/update-profile/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          company: form.company,
          job_title: form.jobTitle,
          notifications,
        }),
      });

      if (!profileRes.ok) {
        const errorData = await profileRes.json();
        throw new Error(errorData.detail || "Profile update failed");
      }

      // Update password if requested
      if (form.currentPassword && form.newPassword) {
const pwdRes = await fetch("http://3.128.160.75:8000/accounts/password-update/", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${user.token}`,
  },
  body: JSON.stringify({
    currentPassword: form.currentPassword,
    newPassword: form.newPassword,
  }),
});
        if (!pwdRes.ok) {
          const pwdError = await pwdRes.json();
          throw new Error(pwdError.detail || "Password update failed");
        }
      }

      toast({
        title: "Profile Updated",
        description: "Please sign in again to apply changes.",
      });

      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      if (updateUser) {
        await updateUser();
      }

      navigate("/signin");
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      toast({
        variant: "destructive",
        title: "Account Deletion Requested",
        description: "Your account deletion request has been submitted.",
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <DashboardHeader user={user ?? { name: "", email: "" }} />
        <main className="flex-1 px-6 py-6 w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    value={form.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password to change password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    value={form.newPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Report Completion Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when your inspection reports are completed.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.reportCompletions}
                    onCheckedChange={() => handleNotificationToggle("reportCompletions")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Product Updates & Announcements</h3>
                    <p className="text-sm text-muted-foreground">
                      Stay informed about new features and improvements to the platform.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.productUpdates}
                    onCheckedChange={() => handleNotificationToggle("productUpdates")}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-8">
              <div className="grid grid-cols-2 gap-4 p-6 border rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
                  <p className="text-base">Beta User</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                  <p className="text-base">June 15, 2023</p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-base font-semibold mb-4">Account Management</h3>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
