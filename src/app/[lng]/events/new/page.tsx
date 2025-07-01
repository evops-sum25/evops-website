import { getT } from "@/app/i18n";
import BackButton from "@/components/shared/BackButton";
import getApi from "@/lib/functions/api";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

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
  const imageUrls =
    (formData.get("imageUrls") as string)
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  const tagIds = formData.getAll("tagIds") as string[];
  const withAttendance = formData.get("withAttendance") === "on";
  const authorId = "0197c736-fe69-7302-aad6-a181e016089c";

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
  } catch (e) {
    alert(e);
    throw e;
  }
  const lng = (formData.get("lng") as string) || "en";
  redirect(`/${lng}/events`);
}

export default async function CreateEventPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const api = getApi();
  const response = await api.tagService.list({});
  const tags: Tag[] = response.tags ?? [];
  const { t } = await getT("common", { keyPrefix: "event-create" });

  return (
    <>
      <nav>
        <BackButton />
      </nav>
      <main className="main-layout w-full justify-center p-4">
        <form
          className="flex w-full max-w-2xl flex-col items-center gap-8"
          action={createEvent}
        >
          <input type="hidden" name="lng" value={lng} />
          <fieldset className="fieldset flex w-96 flex-col items-center gap-6">
            <legend className="fieldset-legend text-lg">{t("title")}</legend>
            {/* Success and error messages will be handled via server response/redirect */}
            <input
              className="input input-bordered"
              type="text"
              name="title"
              placeholder={t("placeholderTitle")}
              required
            />
            <textarea
              className="textarea textarea-bordered"
              name="description"
              placeholder={t("placeholderDesc")}
              required
            />
            <div>
              <label className="mb-2 block text-center text-base">
                {t("labelImage")}
              </label>
              <input
                className="input input-bordered mb-2 flex-1"
                type="url"
                name="imageUrls"
                placeholder={t("placeholderImageUrls")}
              />
            </div>
            <div>
              <label className="mb-2 block text-base">{t("labelTags")}</label>
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
            <label className="flex items-center gap-2 text-base">
              <input
                type="checkbox"
                className="checkbox"
                name="withAttendance"
              />
              {t("labelAttendance")}
            </label>
            <button className="btn btn-primary" type="submit">
              {t("button")}
            </button>
          </fieldset>
        </form>
      </main>
    </>
  );
}
