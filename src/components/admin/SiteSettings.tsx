"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { AlertCircle, Lock, UserPlus, LogIn, Shield } from "lucide-react";
import { toast } from "sonner";

export default function SiteSettings() {
  const settings = useQuery(api.siteSettings.get);
  const updateSettings = useMutation(api.siteSettings.updateSettings);

  const handleToggleRegistration = async (enabled: boolean) => {
    try {
      await updateSettings({
        registrationEnabled: enabled,
        signInEnabled: settings?.signInEnabled ?? true,
      });
      toast.success(enabled ? "Registration enabled" : "Registration disabled");
    } catch (error) {
      toast.error("Failed to update registration setting");
      console.error(error);
    }
  };

  const handleToggleSignIn = async (enabled: boolean) => {
    try {
      await updateSettings({
        registrationEnabled: settings?.registrationEnabled ?? true,
        signInEnabled: enabled,
      });
      toast.success(enabled ? "Sign-in enabled" : "Sign-in disabled");
    } catch (error) {
      toast.error("Failed to update sign-in setting");
      console.error(error);
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
        <p className="text-muted-foreground">
          Manage authentication and access control for your website
        </p>
      </div>

      {/* Warning Card */}
      <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
            <AlertCircle className="h-5 w-5" />
            Important Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-yellow-800 dark:text-yellow-400">
          <p>
            Disabling sign-in or registration will prevent users from accessing these features.
            Make sure you have at least one admin account that can sign in before disabling authentication.
          </p>
        </CardContent>
      </Card>

      {/* Authentication Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication Settings
          </CardTitle>
          <CardDescription>
            Control user registration and sign-in access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Registration Toggle */}
          <div className="flex items-start justify-between space-x-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="registration" className="text-base font-semibold cursor-pointer">
                  User Registration
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Allow new users to create accounts on your website. When disabled, the registration page will display a message that registration is currently unavailable.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <div className={`h-2 w-2 rounded-full ${settings.registrationEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs font-medium">
                  {settings.registrationEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <Switch
              id="registration"
              checked={settings.registrationEnabled}
              onCheckedChange={handleToggleRegistration}
            />
          </div>

          {/* Sign-In Toggle */}
          <div className="flex items-start justify-between space-x-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <LogIn className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="signin" className="text-base font-semibold cursor-pointer">
                  User Sign-In
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Allow users to sign in to their accounts. When disabled, the sign-in page will display a message that sign-in is temporarily unavailable. Use with caution.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <div className={`h-2 w-2 rounded-full ${settings.signInEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs font-medium">
                  {settings.signInEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <Switch
              id="signin"
              checked={settings.signInEnabled}
              onCheckedChange={handleToggleSignIn}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Current Access Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Registration</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  settings.registrationEnabled 
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                }`}>
                  {settings.registrationEnabled ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {settings.registrationEnabled 
                  ? 'Users can create new accounts'
                  : 'New account creation is disabled'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sign-In</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  settings.signInEnabled 
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                }`}>
                  {settings.signInEnabled ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {settings.signInEnabled 
                  ? 'Users can access their accounts'
                  : 'Account access is disabled'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last Updated Info */}
      {settings.updatedAt && (
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {new Date(settings.updatedAt).toLocaleString()}
        </div>
      )}
    </div>
  );
}
