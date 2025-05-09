import { redirect } from "next/navigation";

/**
 * Root page component that handles redirection based on authentication status
 * If user is authenticated, redirects to dashboard
 * If user is not authenticated, redirects to login
 */
export default function RootPage() {
  // TODO: Implement proper authentication check
  // For now, we'll just redirect to login
  redirect("/login");
}
