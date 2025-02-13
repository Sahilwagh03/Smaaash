"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminSettingsPage: React.FC = () => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedDetails = JSON.parse(localStorage.getItem("adminDetails") || "{}");
    if (savedDetails) {
      setAdminName(savedDetails.name || "");
      setAdminEmail(savedDetails.email || "");
      setAdminPhone(savedDetails.phone || "");
      setProfileImage(savedDetails.profileImage || null);
    }
  }, []);

  const handleSave = () => {
    const details = {
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      profileImage,
    };
    localStorage.setItem("adminDetails", JSON.stringify(details));
    toast.success("Admin details saved!");
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profile image uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    toast.info("Profile image removed!");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      <div className="grid grid-cols-1 gap-6">
        {/* Profile Picture Card using ShadCN's Avatar */}
        <Card>
          <CardHeader className="font-semibold">Profile Picture</CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="Profile" />
                ) : (
                  <AvatarFallback>{adminName ? adminName.charAt(0) : "A"}</AvatarFallback>
                )}
              </Avatar>
              {profileImage && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0"
                  onClick={handleRemoveProfileImage}
                >
                  <XCircle size={18} />
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Admin Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <Input
                  type="text"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
