import React from "react";
import { cn } from "../../utils/cn";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "../../hooks/useSidebar";
import type { DashboardLayoutProps } from "../../types/dashboard";

/**
 * Main dashboard layout component with responsive grid structure
 * Provides sticky header and sidebar positioning
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const {
    isCollapsed,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={toggleSidebar}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={closeMobileMenu}
      />

      {/* Main content area */}
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          // Adjust margin based on sidebar state - account for mobile menu button
          "ml-0 lg:ml-64 w-full",
          isCollapsed && "lg:ml-20",
        )}
      >
        {/* Header */}
        <Header
          title="Dashboard"
          onSidebarToggle={toggleMobileMenu}
          user={{
            name: "John Doe",
            email: "john.doe@example.com",
            // avatar: undefined // Will show initials fallback
          }}
          onLogout={() => {
            console.log("User logged out");
            // Logout logic will be implemented when authentication is added
          }}
        />

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="mx-auto ">{children}</div>
        </main>
      </div>
    </div>
  );
};
