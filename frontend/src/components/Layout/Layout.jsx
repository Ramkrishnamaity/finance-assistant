import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/authSlice";
import {
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  Tag,
  BarChart3,
  Menu,
  X,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useSidebar } from "../../hooks/useSidebar";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { cn } from "../../lib/utils";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/expenses", label: "Expenses", icon: TrendingDown },
    { path: "/incomes", label: "Incomes", icon: TrendingUp },
    { path: "/categories", label: "Categories", icon: Tag },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="fixed top-0 right-0 left-0 z-40 bg-card border-b border-border shadow-sm transition-all duration-300"
        style={{
          marginLeft: isCollapsed ? "64px" : "256px",
        }}
      >
        <div className="flex items-center justify-between px-6 h-[72px]">
          {/* Left: Collapse Button (Desktop only) */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? (
              <PanelLeft size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Right: Theme Toggle & Profile */}
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg py-3 px-4 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {user?.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar text-sidebar-foreground shadow-lg transform transition-all duration-300 z-[60] border-r border-sidebar-border",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          "w-64",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Website Heading */}
          <div
            className={cn(
              "px-6 h-[72px] border-b border-sidebar-border flex items-center justify-center",
              isCollapsed && "lg:px-3",
            )}
          >
            {!isCollapsed ? (
              <h1 className="text-xl font-bold text-sidebar-foreground">
                Finance Assistance
              </h1>
            ) : (
              <h1 className="text-lg font-bold text-sidebar-foreground">
                FA
              </h1>
            )}
          </div>

          {/* Menu Items */}
          <nav className={cn("flex-1 p-4 space-y-2", isCollapsed && "lg:p-2")}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center rounded-lg transition-all duration-200",
                    "hover:bg-sidebar-accent",
                    active &&
                      "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                    !active && "text-sidebar-foreground",
                    isCollapsed
                      ? "lg:justify-center lg:p-3"
                      : "space-x-3 px-4 py-3",
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div
            className={cn(
              "px-4 py-3 border-t border-sidebar-border",
              isCollapsed && "lg:px-2 lg:py-3",
            )}
          >
            <button
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200",
                isCollapsed
                  ? "lg:justify-center lg:p-3"
                  : "space-x-3 px-4 py-3",
              )}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut size={20} className="flex-shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[55] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen pt-20 transition-all duration-300",
          isCollapsed ? "lg:ml-16" : "lg:ml-64",
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
