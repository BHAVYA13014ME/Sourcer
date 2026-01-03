"use client";

import { useState, useEffect } from "react";
import { useCurrentUserClient } from "@/hook/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, Eye, EyeOff } from "lucide-react";
import Loading from "@/components/Loading";
import { EmployeeNavbar } from "@/components/EmployeeNavbar";
import { HrNavbar } from "@/components/HrNavbar";
import { getHrCompanyName } from "@/actions/profile/get-hr-company";
import { loadProfile } from "@/actions/profile/load-profile";
import { saveProfile } from "@/actions/profile/save-profile";
import { toast } from "sonner";

type TabType = "resume" | "private" | "salary" | "security";

interface ProfileData {
  name: string;
  email: string;
  phoneNumber: string;
  jobPosition: string;
  department: string;
  manager: string;
  location: string;
  dateOfBirth: string;
  residingAddress: string;
  nationality: string;
  personalEmail: string;
  gender: string;
  maritalStatus: string;
  dateOfJoining: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  panNo: string;
  uanNo: string;
  employeeId: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  skills: string;
  experience: string;
  education: string;
  certifications: string;
  languages: string;
}

export default function ProfilePage() {
  const { user, status } = useCurrentUserClient();
  const [activeTab, setActiveTab] = useState<TabType>("salary");
  const [showPassword, setShowPassword] = useState(false);
  const [hrCompanyName, setHrCompanyName] = useState<string>("");
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    phoneNumber: "",
    jobPosition: "",
    department: "",
    manager: "",
    location: "",
    dateOfBirth: "",
    residingAddress: "",
    nationality: "",
    personalEmail: "",
    gender: "",
    maritalStatus: "",
    dateOfJoining: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    panNo: "",
    uanNo: "",
    employeeId: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
    languages: "",
  });

  const Navbar = user?.role === "EMPLOYEE" ? EmployeeNavbar : HrNavbar;
  const isEmployee = user?.role === "EMPLOYEE";

  // Load profile data and HR company name
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setIsLoading(true);
      
      // Fetch profile data
      const profileResult = await loadProfile();
      if (profileResult && !profileResult.error) {
        // Ensure name is always set (required field)
        const loadedData = profileResult as ProfileData;
        if (!loadedData.name || loadedData.name.trim() === "") {
          loadedData.name = user.name || "";
        }
        setProfileData(loadedData);
      } else {
        // Initialize with user data if profile not loaded
        setProfileData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          employeeId: user.employeeId || "",
        }));
      }

      // Fetch HR's company name for employees
      if (isEmployee) {
        setIsLoadingCompany(true);
        const result = await getHrCompanyName();
        if (result && !result.error && result.companyName) {
          setHrCompanyName(result.companyName);
        } else {
          // Fallback to user's stored company name
          setHrCompanyName(user.companyName || "");
        }
        setIsLoadingCompany(false);
      } else {
        // For HR, use their own company name
        setHrCompanyName(user.companyName || "");
        setIsLoadingCompany(false);
      }

      setIsLoading(false);
    };

    if (user) {
      fetchData();
    }
  }, [user, isEmployee]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await saveProfile(profileData);
      if (result.success) {
        toast.success(result.success);
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || isLoading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="space-y-6">
          {/* Header */}
          <h1 className="text-3xl font-bold">My Profile</h1>

          {/* Profile Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.image ?? ""} />
                      <AvatarFallback className="bg-red-900 text-white text-2xl">
                        {user.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="name">My Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobPosition">Job Position</Label>
                      <Input
                        id="jobPosition"
                        value={profileData.jobPosition}
                        onChange={(e) => handleInputChange("jobPosition", e.target.value)}
                        placeholder="Enter job position"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-muted cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={profileData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={isLoadingCompany ? "Loading..." : (hrCompanyName || "")}
                      disabled={isEmployee}
                      readOnly={isEmployee}
                      placeholder={isEmployee ? "Company name will appear here" : "Enter company name"}
                      className={isEmployee ? "bg-muted cursor-not-allowed" : ""}
                    />
                    {isEmployee && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Company name is set by your HR and cannot be changed
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profileData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      placeholder="Enter department"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manager">Manager</Label>
                    <Input
                      id="manager"
                      value={profileData.manager}
                      onChange={(e) => handleInputChange("manager", e.target.value)}
                      placeholder="Enter manager name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter location"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab("resume")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "resume"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Resume
            </button>
            <button
              onClick={() => setActiveTab("private")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "private"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Private Info
            </button>
            <button
              onClick={() => setActiveTab("salary")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "salary"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Salary Info
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "security"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Security
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTab === "resume" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="resumeFile">Upload Resume</Label>
                        <Input
                          id="resumeFile"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="cursor-pointer"
                        />
                      </div>
                      <div>
                        <Label htmlFor="skills">Skills</Label>
                        <Input
                          id="skills"
                          value={profileData.skills}
                          onChange={(e) => handleInputChange("skills", e.target.value)}
                          placeholder="Enter your skills"
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="text"
                          value={profileData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          placeholder="Enter years of experience"
                        />
                      </div>
                      <div>
                        <Label htmlFor="education">Education</Label>
                        <Input
                          id="education"
                          value={profileData.education}
                          onChange={(e) => handleInputChange("education", e.target.value)}
                          placeholder="Enter education details"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="certifications">Certifications</Label>
                        <Input
                          id="certifications"
                          value={profileData.certifications}
                          onChange={(e) => handleInputChange("certifications", e.target.value)}
                          placeholder="Enter certifications"
                        />
                      </div>
                      <div>
                        <Label htmlFor="languages">Languages</Label>
                        <Input
                          id="languages"
                          value={profileData.languages}
                          onChange={(e) => handleInputChange("languages", e.target.value)}
                          placeholder="Enter languages known"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "private" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                        />
                      </div>
                      <div>
                        <Label htmlFor="residingAddress">Residing Address</Label>
                        <Input
                          id="residingAddress"
                          placeholder="Enter your address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input
                          id="nationality"
                          placeholder="Enter nationality"
                        />
                      </div>
                      <div>
                        <Label htmlFor="personalEmail">Personal Email</Label>
                        <Input
                          id="personalEmail"
                          type="email"
                          placeholder="Enter personal email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Input
                          id="gender"
                          placeholder="Enter gender"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Input
                          id="maritalStatus"
                          placeholder="Enter marital status"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfJoining">Date of Joining</Label>
                        <Input
                          id="dateOfJoining"
                          type="date"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                        <Input
                          id="emergencyName"
                          value={profileData.emergencyContactName}
                          onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                          placeholder="Enter emergency contact name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          type="tel"
                          value={profileData.emergencyContactPhone}
                          onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                          placeholder="Enter emergency contact phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyRelation">Relationship</Label>
                        <Input
                          id="emergencyRelation"
                          value={profileData.emergencyContactRelation}
                          onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                          placeholder="Enter relationship"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "salary" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dateOfBirth-salary">Date of Birth</Label>
                        <Input
                          id="dateOfBirth-salary"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="residingAddress-salary">Residing Address</Label>
                        <Input
                          id="residingAddress-salary"
                          value={profileData.residingAddress}
                          onChange={(e) => handleInputChange("residingAddress", e.target.value)}
                          placeholder="Enter your address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality-salary">Nationality</Label>
                        <Input
                          id="nationality-salary"
                          value={profileData.nationality}
                          onChange={(e) => handleInputChange("nationality", e.target.value)}
                          placeholder="Enter nationality"
                        />
                      </div>
                      <div>
                        <Label htmlFor="personalEmail-salary">Personal Email</Label>
                        <Input
                          id="personalEmail-salary"
                          type="email"
                          value={profileData.personalEmail}
                          onChange={(e) => handleInputChange("personalEmail", e.target.value)}
                          placeholder="Enter personal email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender-salary">Gender</Label>
                        <Input
                          id="gender-salary"
                          value={profileData.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          placeholder="Enter gender"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maritalStatus-salary">Marital Status</Label>
                        <Input
                          id="maritalStatus-salary"
                          value={profileData.maritalStatus}
                          onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                          placeholder="Enter marital status"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfJoining-salary">Date of Joining</Label>
                        <Input
                          id="dateOfJoining-salary"
                          type="date"
                          value={profileData.dateOfJoining}
                          onChange={(e) => handleInputChange("dateOfJoining", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Bank Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={profileData.accountNumber}
                          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                          placeholder="Enter account number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          value={profileData.bankName}
                          onChange={(e) => handleInputChange("bankName", e.target.value)}
                          placeholder="Enter bank name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          value={profileData.ifscCode}
                          onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                          placeholder="Enter IFSC code"
                        />
                      </div>
                      <div>
                        <Label htmlFor="panNo">PAN No</Label>
                        <Input
                          id="panNo"
                          value={profileData.panNo}
                          onChange={(e) => handleInputChange("panNo", e.target.value)}
                          placeholder="Enter PAN number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="uanNo">UAN No</Label>
                        <Input
                          id="uanNo"
                          value={profileData.uanNo}
                          onChange={(e) => handleInputChange("uanNo", e.target.value)}
                          placeholder="Enter UAN number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="empCode">Emp Code</Label>
                        <Input
                          id="empCode"
                          value={profileData.employeeId}
                          disabled
                          className="bg-muted cursor-not-allowed"
                          placeholder="Enter employee code"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "security" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button className="w-full">Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="twoFactorEnabled">
                          Enable Two-Factor Authentication
                        </Label>
                        <div className="mt-2">
                          <input
                            type="checkbox"
                            id="twoFactorEnabled"
                            className="mr-2"
                          />
                          <label htmlFor="twoFactorEnabled" className="text-sm">
                            Use two-factor authentication for additional security
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="securityQuestions">Security Questions</Label>
                        <Input
                          id="securityQuestions"
                          placeholder="Set up security questions"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleSave}
              disabled={isSaving || isLoading}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

