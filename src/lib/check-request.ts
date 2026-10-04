import { businessTypes, heardFrom } from "@/content/site";

export type CheckRequest = {
  businessName: string;
  website: string;
  location: string;
  businessType: string;
  email: string;
  question?: string;
  heardFrom?: string;
};

export type FieldErrors = Partial<Record<keyof CheckRequest, string>>;

const limits = { short: 120, long: 600 };

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function normalizeWebsite(raw: string): string | null {
  if (!raw) return null;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes(".") || url.hostname.length < 4) return null;
    return url.toString();
  } catch {
    return null;
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateCheckRequest(
  input: Record<string, unknown>,
): { ok: true; value: CheckRequest } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const businessName = str(input.businessName);
  const websiteRaw = str(input.website);
  const location = str(input.location);
  const businessType = str(input.businessType);
  const email = str(input.email).toLowerCase();
  const question = str(input.question);
  const heard = str(input.heardFrom);

  if (!businessName) errors.businessName = "Enter your business name.";
  else if (businessName.length > limits.short) errors.businessName = "Use 120 characters or fewer.";

  const website = normalizeWebsite(websiteRaw);
  if (!websiteRaw) errors.website = "Enter your website so we can check what AI says against it.";
  else if (!website) errors.website = "Enter a web address like yourbusiness.com.";

  if (!location) errors.location = "Enter the city or area you serve.";
  else if (location.length > limits.short) errors.location = "Use 120 characters or fewer.";

  if (!businessType) errors.businessType = "Choose the closest type of business.";
  else if (!businessTypes.includes(businessType)) errors.businessType = "Choose an option from the list.";

  if (!email) errors.email = "Enter the email address for your report.";
  else if (!emailPattern.test(email) || email.length > 254) errors.email = "Enter a valid email address.";

  if (question.length > limits.long) errors.question = "Use 600 characters or fewer.";
  if (heard && !heardFrom.includes(heard)) errors.heardFrom = "Choose an option from the list.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      businessName,
      website: website!,
      location,
      businessType,
      email,
      question: question || undefined,
      heardFrom: heard || undefined,
    },
  };
}
