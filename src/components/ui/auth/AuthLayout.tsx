import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  footerLinkToSignup?: string;
  loginExtraFooterText?: string;
  loginExtraFooterLink?: string;
}

export default function AuthLayout({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
  loginExtraFooterText,
  loginExtraFooterLink,
  footerLinkToSignup,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-accent dark:bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md rounded-xl border border-border bg-card ">
        <CardHeader className="space-y-5 px-6 pt-8 sm:px-8">
          <img
            aria-hidden
            src="/assets/images/logo-light-theme.svg"
            alt="Bookmark manager Logo"
            className="h-8 w-fit dark:hidden"
          />

          <img
            aria-hidden
            src="/assets/images/logo-dark-theme.svg"
            alt="Bookmark manager Logo"
            className="hidden h-8 w-fit dark:block"
          />

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8 sm:px-8">
          {children}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footerText}{" "}
            <Link
              to={footerLinkTo}
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              {footerLinkText}
            </Link>
          </p>

          {loginExtraFooterText && loginExtraFooterLink && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {loginExtraFooterText}{" "}
              <Link
                to={footerLinkToSignup || "#"}
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                {loginExtraFooterLink}
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
