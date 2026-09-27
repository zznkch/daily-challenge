import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { EditProfileForm } from "@/components/auth/edit-profile-form";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { DeleteAccountSection } from "@/components/auth/delete-account-section";

export default async function EditProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
      <div>
        <Link
          href={`/u/${user.username}`}
          className="text-xs text-foreground-faint hover:text-foreground-muted"
        >
          ← Back to your profile
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-foreground">
          Edit profile
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile details</CardTitle>
        </CardHeader>
        <EditProfileForm user={user} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <ChangePasswordForm />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
        </CardHeader>
        <DeleteAccountSection />
      </Card>
    </div>
  );
}
