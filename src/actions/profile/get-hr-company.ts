"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getHrCompanyName() {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        hr: {
          select: {
            companyName: true,
          },
        },
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // If user is an employee, return HR's company name
    if (user.role === "EMPLOYEE" && user.hr) {
      const companyName = user.hr.companyName || user.companyName || "";
      console.log("Employee - HR company name:", companyName);
      return { companyName };
    }

    // If user is HR, return their own company name
    if (user.role === "HR") {
      const companyName = user.companyName || "";
      console.log("HR - Company name:", companyName);
      return { companyName };
    }

    const companyName = user.companyName || "";
    console.log("Default - Company name:", companyName);
    return { companyName };
  } catch (error) {
    console.error("Error fetching HR company name:", error);
    return { error: "Failed to fetch company name" };
  }
}

