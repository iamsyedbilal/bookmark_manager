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
    <div className="min-h-screen bg-[#EEF3F1] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader className="space-y-5 px-6 pt-8 sm:px-8">
          <img
            aria-hidden
            src="/assets/images/logo-light-theme.svg"
            alt="Bookmark manager Logo"
            className="h-8 w-fit"
          />

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </CardTitle>

            <CardDescription className="text-[14px]  text-[#4C5C59]">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8 sm:px-8">
          {children}

          <p className="mt-6 text-center text-sm text-gray-500">
            {footerText}{" "}
            <Link
              to={footerLinkTo}
              className="font-medium text-gray-900 hover:underline"
            >
              {footerLinkText}
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-gray-500">
            {loginExtraFooterText}{" "}
            <Link
              to={footerLinkToSignup}
              className="font-medium text-gray-900 hover:underline"
            >
              {loginExtraFooterLink}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
