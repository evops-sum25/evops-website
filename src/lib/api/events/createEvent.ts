"use server";
import getApi from "@/lib/api/api";
import { redirect } from "next/navigation";

async function pushImage(
  api: any,
  eventId: string,
  imageFile: File,
): Promise<string> {
  const route = new URL(`v1/events/${eventId}/images`, api.url);

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(route, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to upload image: ${response.status} ${response.statusText}`,
    );
  }

  const result = await response.json();
  return result.image_id;
}

// Separate server action for uploading images
export async function uploadEventImage(eventId: string, imageFile: File) {
  const api = getApi();

  try {
    console.log("Uploading image for event:", eventId);
    console.log("Image file size:", imageFile.size);
    console.log("Image file type:", imageFile.type);

    const imageId = await pushImage(api, eventId, imageFile);
    console.log("Image uploaded successfully with ID:", imageId);
    return { success: true, imageId };
  } catch (error) {
    console.error("Error uploading image: ", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function createEvent(formData: FormData) {
  const api = getApi();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const imageFile = formData.get("imageFile") as File | null;

  const tagIds = formData.getAll("tagIds") as string[];
  const withAttendance = formData.get("withAttendance") === "on";
  const authorId = "0197f144-c00b-72d3-b382-0b04f862b208";

  try {
    // Step 1: Create the event first
    console.log("Creating event...");
    const event = await api.eventService.create({
      form: {
        authorId,
        title,
        description,
        tagIds,
        withAttendance,
      },
    });
    console.log("Event created successfully with ID:", event.eventId);

    // Step 2: If there's an image file, upload it asynchronously
    if (imageFile) {
      // Upload image in background without waiting
      uploadEventImage(event.eventId, imageFile).catch((error) => {
        console.error("Background image upload failed:", error);
      });
    }
  } catch (e) {
    console.error("Error creating event: ", e);
    throw e;
  }

  const lng = (formData.get("lng") as string) || "en";
  redirect(`/${lng}/events`);
}
