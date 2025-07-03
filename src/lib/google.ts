// src/lib/google.ts

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID!;
const SCOPES = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/documents",
].join(" ");

declare global {
  interface Window {
    google: any;
  }
}

/**
 * Requests Google OAuth access token with required scopes.
 * Uses Google Identity Services token client.
 */
export async function getGoogleOAuthAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
      return reject("Google Identity Services SDK not loaded");
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse: any) => {
        if (tokenResponse.error) {
          reject(tokenResponse.error);
        } else {
          resolve(tokenResponse.access_token);
        }
      },
    });

    tokenClient.requestAccessToken();
  });
}

/**
 * Uploads a .docx Blob to Drive & converts it to a Google Doc.
 * Returns the new fileId.
 */
export async function uploadAndConvertDocx(blob: Blob, filename: string): Promise<string> {
  const accessToken = await getGoogleOAuthAccessToken();

  const metadata = {
    name: filename,
    mimeType: "application/vnd.google-apps.document",
  };

  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("file", blob);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&convert=true",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Drive upload failed: ${errorText}`);
  }

  const data = await res.json();
  return data.id as string;
}

/**
 * Exports a Google Doc back to .docx.
 * Returns a Blob.
 */
export async function exportAsDocx(fileId: string): Promise<Blob> {
  const accessToken = await getGoogleOAuthAccessToken();

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/vnd.openxmlformats-officedocument.wordprocessingml.document`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Export failed");
  }

  return res.blob();
}
