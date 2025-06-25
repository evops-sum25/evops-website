"use server";

import getApi from "@/lib/functions/api";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Tag {
  id: string;
  name: string;
  aliases: string[];
}

async function createEvent(formData: FormData) {
  "use server";
  const api = getApi();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrls = (formData.get("imageUrls") as string)?.split(",").map(s => s.trim()).filter(Boolean) ?? [];
  const tagIds = formData.getAll("tagIds") as string[];
  const withAttendance = formData.get("withAttendance") === "on";
  const authorId = "demo-user-id"; // TODO: заменить на реальный user id из сессии

  try {
    await api.eventService.create({
      form: {
        authorId,
        imageUrls,
        title,
        description,
        tagIds,
        withAttendance,
      },
    });
    redirect("/events");
  } catch (e) {
    redirect("/events/create?error=1");
  }
}

export default async function CreateEventPage() {
  const api = getApi();
  const response = await api.tagService.list({});
  const tags: Tag[] = response.tags ?? [];

  return (
    <>
      <nav>
        <Link href="../" className="btn btn-ghost btn-circle">
          <ChevronLeft />
        </Link>
      </nav>
      <main className="main-layout w-full justify-center p-4">
        <form
          className="flex w-full max-w-2xl flex-col gap-4"
          action={createEvent}
          method="POST"
        >
          <fieldset className="fieldset flex flex-col gap-4">
            <legend className="fieldset-legend text-lg">Create Event</legend>
            {/* Success and error messages will be handled via server response/redirect */}
            <input
              className="input input-bordered"
              type="text"
              name="title"
              placeholder="Title"
              required
            />
            <textarea
              className="textarea textarea-bordered"
              name="description"
              placeholder="Description"
              required
            />
            <div>
              <label className="mb-2 block">Images</label>
              <input
                className="input input-bordered flex-1 mb-2"
                type="url"
                name="imageUrls"
                placeholder="Image URL (comma separated for multiple)"
              />
            </div>
            <div>
              <label className="mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="btn btn-sm btn-outline">
                    <input
                      type="checkbox"
                      name="tagIds"
                      value={tag.id}
                      className="mr-2"
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox"
                name="withAttendance"
              />
              With attendance registration
            </label>
            <button
              className="btn btn-primary"
              type="submit"
            >
              Create Event
            </button>
          </fieldset>
        </form>
      </main>
    </>
  );
}
